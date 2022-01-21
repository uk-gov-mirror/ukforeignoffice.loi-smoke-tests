const puppeteer = require('puppeteer')
const settings = require('../../config/settings')

test('Courier prices are correct (europe)', async () => {
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

        //important-info page
        await page.waitForSelector('#NextBtn')
        await page.click('#NextBtn')

        //your-basic-details
        await page.waitForSelector('#NextBtn')
        await page.type('#first_name', 'Hugh')
        await page.type('#last_name', 'Blow')
        await page.type('#telephone', '02087123987')
        await page.type('#mobileNo', '07754812309')
        await page.type('#email', 'test@email.com')
        await page.type('#confirm_email', 'test@email.com')
        await page.click('#NextBtn')

        //your-main-address-details
        await page.waitForSelector('#radio-no')
        await page.click('#radio-no')
        await page.click('#is-uk > div:nth-child(2) > button')

        //international-main-address
        await page.waitForSelector('#NextBtn')
        await page.type('#house_name','The White House')
        await page.type('#street', '1600 Pennsylvania Avenue NW')
        await page.type('#town', 'Washington DC')
        await page.select('#country','Andorra')
        await page.click('#NextBtn')

        //alternative-address
        await page.waitForSelector('#is-same > div:nth-child(2) > button')
        await page.click('#radio-yes')
        await page.click('#is-same > div:nth-child(2) > button')

        //how-many-documents
        await page.waitForSelector('#NextBtn')
        await page.type('#documentCount','1')
        await page.click('#NextBtn')

        //postage-send-options
        await page.waitForSelector('#NextBtn')
        await page.click('#legend_postage_available > div > div:nth-child(2) > label')
        await page.click('#NextBtn')

        //postage-return-options
        await page.waitForSelector('#legend_postage_available > div > p.text')
        const resultText = await page.$eval('#legend_postage_available > div > p.text', e => e.innerHTML)
        await expect(resultText).toContain('17.50')

        await browser.close()

    } catch (error){
        throw new Error(error)
    } finally {
        await browser.close();
    }
}, settings.testTimeout)