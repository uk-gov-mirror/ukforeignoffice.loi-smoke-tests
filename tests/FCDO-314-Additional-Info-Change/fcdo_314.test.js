const puppeteer = require('puppeteer')
const settings = require('../../config/settings')

test('Additional payments confirmation page is successful', async () => {
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

        //additional-payments page
        await page.goto(settings.url + '/additional-payments')
        const additionalPaymentsTitle = await page.$eval('#content > h1', e => e.innerHTML)
        expect(additionalPaymentsTitle).toBe('Make an additional payment for legalisation')
        await page.type('#cost', '10')
        await page.type('#email', 'test@test.com')
        await page.waitForSelector('#NextBtn')
        await page.click('#NextBtn')

        //submit-additional-payment - prepare to pay
        await page.waitForSelector('#content > div.container > div > form > div > button')
        await page.click('#content > div.container > div > form > div > button')
        

        //gov-pay-page-1 - card_details
        await page.waitForSelector('#submit-card-details')
        await page.waitForSelector('#email')
        await page.evaluate( () => document.getElementById("amount").value = "£10.00")
        await page.type('#card-no', '4444333322221111')
        await page.type('#expiry-month', '03')
        await page.type('#expiry-year', '30')
        await page.type('#cvc', '111')
        await page.type('#cardholder-name', 'MR TEST')
        await page.type('#address-line-1', '4-6 Upper Crescent')
        await page.type('#address-city', 'Belfast')
        await page.type('#address-postcode', 'BT71NT')
        await page.click('#submit-card-details')

        //gov-pay-page-2
        await page.waitForSelector('#confirm')
        await page.click('#confirm')

        //additional-payment-confirmation
        await page.waitForSelector('.govuk-box-highlight > h1:nth-child(1)');
        const paymentConfirmationTitle = await page.$eval('.govuk-box-highlight > h1:nth-child(1)', e => e.innerHTML)
        expect(paymentConfirmationTitle).toBe('Payment complete')
        await page.waitForSelector('#review-personal-details > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(1)')
        await page.click('.intro > p:nth-child(8) > a:nth-child(1)')

        //additional-payments page
        await page.waitForSelector('#content > h1');
        const additionalPaymentsTitle2 = await page.$eval('#content > h1', e => e.innerHTML)
        expect(additionalPaymentsTitle2).toBe('Make an additional payment for legalisation')

        await browser.close()

    } catch (error){
        throw new Error(error)
    } finally {
        await browser.close();
    }
}, settings.testTimeout)