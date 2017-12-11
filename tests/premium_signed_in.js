import { Selector } from 'testcafe';

const config = require("../config/settings");

fixture `Premium signed in application`
    .page(config.settings.app_url);


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


});

