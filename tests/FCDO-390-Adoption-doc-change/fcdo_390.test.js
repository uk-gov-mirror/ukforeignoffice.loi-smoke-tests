const puppeteer = require('puppeteer')
const settings = require('../../config/settings')

test('Doc checker adoption doc wording change', async () => {
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
        await page.waitForSelector('#doc_search_field')
        await page.type('#doc_search_field', 'Adoption document')
        await page.click('#doc_search_button')
        await page.waitForSelector('#add_261')
        await page.click('#add_261')
        await page.waitForSelector('#NextBtn')
        await page.click('#NextBtn')

        //confirm docs page
        await page.waitForSelector('#NextBtn')
        const text = await page.$eval('#adoption_document-div > div > div:nth-child(3) > label', e => e.innerHTML)
        await expect(text).toContain('Your original UK adoption certificate or certified copy from either the General Register Office (GRO) or local register office')

        await browser.close()

    } catch (error){
        throw new Error(error)
    } finally {
        await browser.close();
    }
}, settings.testTimeout)