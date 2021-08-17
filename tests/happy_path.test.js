const puppeteer = require('puppeteer')
const settings = require('../config/settings')

test('Happy path is successful', async () => {
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
        await page.click('#standard-service')

        //choose-documents
        await page.waitForSelector('#skip_check')
        await page.click('#skip_check')

        //your-basic-details
        await page.waitForSelector('#NextBtn')
        await page.type('#first_name', 'Hugh')
        await page.type('#last_name', 'Blow')
        await page.type('#telephone', '02087123987')
        await page.type('#mobileNo', '07754812309')
        await page.click('#radio-indent-2')
        await page.click('#NextBtn')

        //your-main-address-details
        await page.waitForSelector('#radio-yes')
        await page.click('#radio-yes')
        await page.click('#is-uk > div:nth-child(2) > button')

        //your-main-address-uk
        await page.waitForSelector('#find-postcode')
        await page.type('#find-postcode', 'BT71NT')
        await page.click('#find-address')
        await page.waitForSelector('#address-list-box')
        await page.click('#address-list-box')
        await page.select('#address-list-box', '0')
        await page.waitForSelector('#NextBtn')
        await page.click('#NextBtn')

        //alternative-address
        await page.waitForSelector('#radio-yes')
        await page.click('#radio-yes')
        await page.click('#is-same > div:nth-child(2) > button')

        //how-many-documents
        await page.waitForSelector('#documentCount')
        await page.type('#documentCount', '1')
        await page.click('#NextBtn')

        //postage-send-options
        await page.waitForSelector('#send_0')
        await page.click('#send_0')
        await page.click('#NextBtn')

        //postage-return-options
        await page.waitForSelector('#return_1')
        await page.click('#return_1')
        await page.click('#NextBtn')

        //additional-information
        await page.waitForSelector('#NextBtn')
        await page.click('#radio-feedback-no')
        await page.click('#NextBtn')

        //review-summary
        await page.waitForSelector('#content > a')
        await page.click('#content > a')

        //declaration
        await page.waitForSelector('#all_info_correct')
        await page.click('#all_info_correct')
        await page.click('#content > form > div > div:nth-child(4) > button')

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
        await expect(resultText).toContain('Total amount: £35.50 for 1 document')

        await browser.close()

    } catch (error){
        throw new Error(error)
    } finally {
        await browser.close();
    }
}, settings.testTimeout)