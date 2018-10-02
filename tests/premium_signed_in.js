import { Selector } from 'testcafe';

const config = require("../config/settings");

fixture `Premium signed in application`
    .page(config.settings.app_url)
    .httpAuth({
        username: config.settings.basic_auth_username,
        password: config.settings.basic_auth_password
    });


//then create a test and place your code there
test('Should complete premium signed in applications', async t => {
    await t

        .expect(Selector('#content > h1').innerText).eql('Get your document legalised')
        .click('#start')

        .expect(Selector('.heading-xlarge').innerText).eql('Choose a service')
        .click('#premium-service')

        .expect(Selector('.heading-xlarge').innerText).eql('Have you already got an online account for legalisation?')
        .click('#radio-yes')
        .click('#continue-button')

        .expect(Selector('.heading-xlarge').innerText).eql('Sign in')
        .typeText('#email', config.settings.existing_account_username)
        .typeText('#password', config.settings.existing_account_password)
        .click('#sign-in-button')

        .expect(Selector('.heading-xlarge').innerText).eql('Choose a service')
        .click('#premium-service')

        .expect(Selector('.heading-xlarge').innerText).eql('Your documents')
        .click('#documentCount')
        .typeText('#documentCount', '1')
        .click('#NextBtn')

        .expect(Selector('.heading-xlarge').innerText).eql('Additional information')
        .click('#NextBtn')

        .expect(Selector('.heading-xlarge').innerText).eql('Pay for your application')
        .click('#content > div.container > div.intro.column-two-thirds > form > div > button')

        .expect(Selector('#content > h1').innerText).eql('Pay for your application')
        .click('#paymentMethods > li:nth-child(3) > input')

        .expect(Selector('#stageheader').innerText).eql('Step 2: Enter your Payment Details')
        .typeText('#card\\2e cardNumber','5555555555554444')
        .typeText('#card\\2e cardHolderName','Mr Test')
        .click('#card\\2e expiryMonth')
        .click('#card\\2e expiryMonth > option:nth-child(11)')
        .click('#card\\2e expiryYear')
        .click('#card\\2e expiryYear > option:nth-child(4)')
        .typeText('#card\\2e cvcCode','737')
        .click('#mainSubmit')

        .expect(Selector('#stageheader').innerText).eql('Step 3: Please review and complete your payment')
        .expect(Selector('#pmcontent > table > tbody > tr:nth-child(3) > td.b').innerText).contains('You are paying GBP 75.00 with')
        .click('#mainSubmit')

        .expect(Selector('#content').innerText).contains('Print')
        .click('#print-button')

        .expect(Selector('#content').innerText).contains('Application cover sheet')
        .expect(Selector('#content').innerText).contains('75.00')
        .expect(Selector('#content').innerText).contains('Premium')
        .expect(Selector('#content').innerText).contains('None given')
        .expect(Selector('#content').innerText).contains('A-A-')



});

