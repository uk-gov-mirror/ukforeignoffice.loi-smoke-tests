const puppeteer = require('puppeteer')
const settings = require('../../config/settings')

test('Standard journey is successful', async () => {
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
        await page.waitForSelector('#standard-service')
        await page.click('#standard-service')

        //choose documents page
        await page.waitForSelector('#check_documents')
        await page.click('#check_documents')

        //doc checker page
        await page.waitForSelector('#document-search-top-searches > div > a:nth-child(2)')
        await page.click('#document-search-top-searches > div > a:nth-child(2)')
        await page.waitForSelector('#add_221')
        await page.click('#add_221')
        await page.waitForSelector('#NextBtn')
        await page.click('#NextBtn')

        //confirm docs page
        await page.waitForSelector('#docid_221_1')
        await page.click('#docid_221_1')
        await page.waitForSelector('#NextBtn')
        await page.click('#NextBtn')

        //eligible page
        await page.waitForSelector('#docid_221 > fieldset > ul:nth-child(3) > li:nth-child(2)')
        const text = await page.$eval('#docid_221 > fieldset > ul:nth-child(3) > li:nth-child(2)', e => e.innerHTML)
        await expect(text).toBe('an official of the British Council (only original certificates; please check with your local British Council first as this service is not available at all locations)')

        await browser.close()

    } catch (error){
        throw new Error(error)
    } finally {
        await browser.close();
    }
}, settings.testTimeout)