const puppeteer = require('puppeteer')
const settings = require('../config/settings')

test('Premium journey is successful', async () => {
    let browser = await puppeteer.launch({
        headless: settings.headless,
        defaultViewport: null,
        'args': [
            '--start-maximized'
        ]
    })
    let page = await browser.newPage()
    await page.setRequestInterception(true);

    // this stops scripts from loading e.g. matomo
    page.on('request', (request) => {
        if (['script'].indexOf(request.resourceType()) !== -1) {
            request.abort();
        } else {
            request.continue();
        }
    });

    // Basic Auth
    await page.authenticate({
        'username': settings.basicAuthUsername,
        'password': settings.basicAuthPassword
    });

    try {

        //select-service page
        await page.goto(settings.url + '/select-service')
        const selectServiceTitle = await page.$eval('#content > h1', e => e.innerHTML)
        expect(selectServiceTitle).toBe('Choose a service')
        await page.click('#sign-in-link')

        //sign in page
        await page.waitForSelector('#email')
        await page.type('input[name=email]', settings.accountUsername)
        await page.type('input[name=password]', settings.accountPassword)
        await page.click('#sign-in-button')

        //select-service page again
        await page.waitForSelector('#choose-premium-service')
        await page.click('#choose-premium-service')
        await page.click('#content > div.column-two-thirds > form > button')

        //business-document-quantity
        await page.waitForSelector('#documentCount')
        await page.type('#documentCount', '1')
        await page.click('#NextBtn')

        //important-info page
        await page.waitForSelector('#NextBtn')
        await page.click('#NextBtn')

        ///business-additional-information
        await page.waitForSelector('#customer_ref')
        await page.click('#NextBtn')

        //submit-payment
        await page.waitForSelector('#content > div.container > div.intro.column-two-thirds > form > div > button')
        await page.click('#content > div.container > div.intro.column-two-thirds > form > div > button')

        //gov-pay-page-1
        await page.waitForSelector('#submit-card-details')
        await page.waitForSelector('#email')
        await page.evaluate( () => document.getElementById("email").value = "")
        await page.type('#card-no', '4444333322221111')
        await page.type('#expiry-month', '03')
        await page.type('#expiry-year', '30')
        await page.type('#cvc', '111')
        await page.type('#cardholder-name', 'MR TEST')
        await page.type('#address-line-1', '4-6 Upper Crescent')
        await page.type('#address-city', 'Belfast')
        await page.type('#address-postcode', 'BT71NT')
        await page.type('#email', 'test@email.com')
        await page.click('#submit-card-details')
        await page.waitForSelector('#email-uncorrected')
        await page.click('#email-uncorrected')
        await page.click('#submit-card-details')

        //gov-pay-page-2
        await page.waitForSelector('#confirm')
        await page.click('#confirm')

        //submit-application
        await page.waitForSelector('#content > div:nth-child(4) > div > h1')
        const resultText = await page.$eval('#content > div:nth-child(4) > div > h1', e => e.innerHTML)
        await expect(resultText).toContain('Total amount: £75.00 for 1 document')

        await browser.close()

    } catch (error){
        throw new Error(error)
    } finally {
        await browser.close();
    }
}, settings.testTimeout)