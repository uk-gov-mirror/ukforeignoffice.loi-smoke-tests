const puppeteer = require('puppeteer')
const settings = require('../../config/settings')

test('Privacy Policy test is successful', async () => {
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

        //Verify email addresses are correct version
        await page.goto(settings.url + '/privacy-policy')
        const contactEmail1 = await page.$eval('.column-two-thirds > p:nth-child(4) > a:nth-child(8)', e => e.innerHTML)
        expect(contactEmail1).toBe('Legalisation@fcdo.gov.uk')

        await page.goto(settings.url + '/privacy-policy')
        const contactEmail2 = await page.$eval('.column-two-thirds > p:nth-child(36) > a:nth-child(1)', e => e.innerHTML)
        expect(contactEmail2).toBe('Legalisation@fcdo.gov.uk')

        //Go to cookies page
        await page.waitForSelector('.footer-meta-inner > ul:nth-child(1) > li:nth-child(4) > a:nth-child(1)')
        await page.click('.footer-meta-inner > ul:nth-child(1) > li:nth-child(4) > a:nth-child(1)')

        //Find out more about cookies
        await page.waitForSelector('.column-two-thirds > p:nth-child(22) > a:nth-child(1)')
        await page.click('.column-two-thirds > p:nth-child(22) > a:nth-child(1)')

        //Verify GOV UK Pay Cookie link works
        await page.waitForSelector('.column-two-thirds > ul:nth-child(16) > li:nth-child(1) > span:nth-child(1)')
        await page.click('.column-two-thirds > ul:nth-child(16) > li:nth-child(1) > span:nth-child(1)')
        
        // const govUKPayCookieLink = await page.$x('/html/body/main/div[3]/ul/li/span/a')
        
        // const govUKPayHeader = await page.$eval('.govuk-header__product-name', e => e.innerHTML);
        // expect(govUKPayHeader).toBe('Pay');

        await browser.close()

    } catch (error){
        throw new Error(error)
    } finally {
        await browser.close();
    }
}, settings.testTimeout)