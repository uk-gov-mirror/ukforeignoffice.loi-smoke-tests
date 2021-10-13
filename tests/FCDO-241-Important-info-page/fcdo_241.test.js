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
        await page.waitForSelector('#skip_check')
        await page.click('#skip_check')

        //#region verify important info page
        await page.waitForSelector('#content > div.govuk-warning-text > strong')
        var importantText = await page.$eval('#content > div.govuk-warning-text > strong', e => e.innerHTML)
        await expect(importantText).toContain('Please read the following information to prevent potential delays to your application.')

        await page.waitForSelector('#content > div.column-two-thirds > form > div:nth-child(1) > h2')
        var medicalHeading = await page.$eval('#content > div.column-two-thirds > form > div:nth-child(1) > h2', e => e.innerHTML)
        await expect(medicalHeading).toContain('Medical Documents')

        await page.waitForSelector('#content > div.column-two-thirds > form > div:nth-child(1) > p')
        var medicalContent = await page.$eval('#content > div.column-two-thirds > form > div:nth-child(1) > p', e => e.innerHTML)
        await expect(medicalContent).toContain('If you are submitting a document that has been signed by a medical')
        //#endregion

        // Go back and forth to verify backward and forward navigation works
        await page.waitForSelector('.back-to-previous');
        await page.click('.back-to-previous');

        //choose documents page
        await page.waitForSelector('#skip_check')
        await page.click('#skip_check')

        //#region verify important info page
        await page.waitForSelector('#content > div.govuk-warning-text > strong')
        var importantText = await page.$eval('#content > div.govuk-warning-text > strong', e => e.innerHTML)
        await expect(importantText).toContain('Please read the following information to prevent potential delays to your application.')

        await page.waitForSelector('#content > div.column-two-thirds > form > div:nth-child(1) > h2')
        var medicalHeading = await page.$eval('#content > div.column-two-thirds > form > div:nth-child(1) > h2', e => e.innerHTML)
        await expect(medicalHeading).toContain('Medical Documents')

        await page.waitForSelector('#content > div.column-two-thirds > form > div:nth-child(1) > p')
        var medicalContent = await page.$eval('#content > div.column-two-thirds > form > div:nth-child(1) > p', e => e.innerHTML)
        await expect(medicalContent).toContain('If you are submitting a document that has been signed by a medical')
        //#endregion

        await browser.close()

    } catch (error){
        throw new Error(error)
    } finally {
        await browser.close();
    }
}, settings.testTimeout)