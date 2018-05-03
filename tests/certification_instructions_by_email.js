import { Selector } from 'testcafe';
import { ClientFunction } from 'testcafe';

const config = require("../config/settings");

fixture `Postal not signed in`
    .page(config.settings.app_url)
    .httpAuth({
        username: config.settings.basic_auth_username,
        password: config.settings.basic_auth_password
    });


//then create a test and place your code there
test('Should complete postal not signed in applications', async t => {
    await t

        .expect(Selector('#content > h1').innerText).eql('Get your document legalised')
        .click('#start')

        .expect(Selector('.heading-xlarge').innerText).eql('Choose a service')
        .click('#standard-service')

        .expect(Selector('.heading-xlarge').innerText).eql('Check if documents can be legalised')
        .click('#check_documents')

        .expect(Selector('.heading-xlarge').innerText).eql('Select all your documents')
        .click('#document-search-top-searches > div > a:nth-child(2)')
        .click('#add_221')
        .click('#NextBtn')

        .expect(Selector('.heading-xlarge').innerText).eql('Confirm your document format')
        .click('#degree-certificate-uk-div > fieldset > fieldset > div > label:nth-child(5)')
        .click('#NextBtn')

        .expect(Selector('.heading-xlarge').innerText).eql('Confirm your document is certified')
        .click('#docid_221 > fieldset > fieldset > div > label:nth-child(3)')
        .click('#NextBtn')

        .expect(Selector('.heading-xlarge').innerText).eql('Get your document certified')
        .typeText('#email','test@email.com', { replace: true })
        .click('#email-this-page')

        .expect(Selector('#content > div.column-two-thirds > div.form-group.column-two-thirds > div > div > p').innerText).contains('Email sent to test@email.com')
});