import { Selector } from 'testcafe';

const config = require("../config/settings");

fixture `Postal signed in application`
    .page(config.settings.app_url)
    .httpAuth({
        username: config.settings.basic_auth_username,
        password: config.settings.basic_auth_password
    });


//then create a test and place your code there
test('Should complete postal signed in applications', async t =>
{
    await
    t

        .expect(Selector('#content > h1').innerText).eql('Get your document legalised')
        .click('#start')

        .expect(Selector('.heading-xlarge').innerText).eql('Choose a service')
        .click('#sign-in-link')

        .expect(Selector('.heading-xlarge').innerText).eql('Sign in')
        .typeText('#email', config.settings.existing_account_username)
        .typeText('#password', config.settings.existing_account_password)
        .click('#sign-in-button')

        .expect(Selector('.heading-xlarge').innerText).eql('Choose a service')
        .click('#standard-service')

        .expect(Selector('.heading-xlarge').innerText).eql('Check if documents can be legalised')
        .click('#skip_check')

        .expect(Selector('.heading-xlarge').innerText).eql('Your details')
        .click('#radio-yes')
        .click('#NextBtn')

        .expect(Selector('.heading-xlarge').innerText).eql('Return address details')
        .click('#savedAddressDetailsForm > fieldset > label:nth-child(2)')
        .click('#savedAddressDetailsForm > div > input')

        .expect(Selector('.heading-xlarge').innerText).eql('Return address if we can’t legalise your documents')
        .click('#radio-yes')
        .click('#is-same > div:nth-child(2) > button')

        .expect(Selector('.heading-xlarge').innerText).eql('Number of documents')
        .typeText('#documentCount', '1')
        .click('#NextBtn')

        .expect(Selector('.heading-xlarge').innerText).eql('Sending us your documents')
        .click('#send_1')
        .click('#NextBtn')

        .expect(Selector('.heading-xlarge').innerText).eql('Returning your documents')
        .click('#return_0')
        .click('#NextBtn')

        .expect(Selector('.heading-xlarge').innerText).eql('Additional information')
        .click('#NextBtn')

        .expect(Selector('#content > div.form-group > h1').innerText).eql('Check your answers before paying for your application')
        .click('#content > a')

        .expect(Selector('.heading-xlarge').innerText).eql('Pay for your application')
        .click('#content > div.container > div.intro.column-two-thirds > form > div > button')

        .expect(Selector('#content > h1').innerText).eql('Pay for your application')
        .click('#paymentMethods > li:nth-child(3) > input')

        .expect(Selector('#stageheader').innerText).eql('Step 2: Enter your Payment Details')
        .typeText('#card\\2e cardNumber','5555555555554444')
        .typeText('#card\\2e cardHolderName','Mr Test')
        .click('#card\\2e expiryMonth')
        .click('#card\\2e expiryMonth > option:nth-child(9)')
        .click('#card\\2e expiryYear')
        .click('#card\\2e expiryYear > option:nth-child(2)')
        .typeText('#card\\2e cvcCode','737')
        .click('#mainSubmit')

        .expect(Selector('#stageheader').innerText).eql('Step 3: Please review and complete your payment')
        .click('#mainSubmit')

        .expect(Selector('#content').innerText).contains('Print')
        .click('#print-button')

        .expect(Selector('#content').innerText).contains('Application cover sheet')
        .expect(Selector('#content').innerText).contains('Standard')
        .expect(Selector('#content').innerText).contains('None given')
        .expect(Selector('#content').innerText).contains('A-C-')
        .expect(Selector('#content').innerText).contains('Kainos Software Ltd')
        .expect(Selector('#content').innerText).contains('Same as successful address')

});







