const puppeteer = require('puppeteer')
const settings = require('../config/settings')

test('Drop off journey is successful', async () => {
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
        await page.waitForSelector('#dropoff-service')
        await page.click('#dropoff-service')

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

        //smartpay
        await page.waitForSelector('#paymentMethods > li:nth-child(3) > input')
        await page.click('#paymentMethods > li:nth-child(3) > input')
        await page.waitForSelector('#card\\.cardNumber')
        await page.type('#card\\.cardNumber', '5555555555554444')
        await page.type('#card\\.cardHolderName', 'MR TEST')
        await page.type('#card\\.expiryMonth', '03')
        await page.type('#card\\.expiryYear', '2030')
        await page.type('#card\\.cvcCode', '737')
        await page.click('#mainSubmit')
        await page.waitForSelector('#mainSubmit')
        await page.click('#mainSubmit')

        //submit-application
        await page.waitForSelector('#content > div:nth-child(4) > div > h1')
        const resultText = await page.$eval('#content > div:nth-child(4) > div > h1', e => e.innerHTML)
        await expect(resultText).toContain('Total amount: £30.00 for 1 document')

        await browser.close()

    } catch (error){
        throw new Error(error)
    } finally {
        await browser.close();
    }
}, settings.testTimeout)