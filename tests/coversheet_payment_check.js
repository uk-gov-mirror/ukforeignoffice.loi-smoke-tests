import { Selector } from 'testcafe';

const config = require("../config/settings");

fixture `Coversheet payment check`
    .page(config.settings.app_url)
    .httpAuth({
        username: config.settings.basic_auth_username,
        password: config.settings.basic_auth_password
    });


//then create a test and place your code there
test('Should complete a standard applications ensuring that the user paid ', async t => {
    await t

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

        .navigateTo(config.settings.app_url + '/print-cover-sheet')
        .expect(Selector('.heading-xlarge').innerText).eql('This page cannot be found')


});

