import { Selector } from 'testcafe';

const config = require("../config/settings");

fixture `Premium registration and apply`
    .page(config.settings.app_url);


//then create a test and place your code there
test('Should register email address for a premium application', async t => {
    await t

        .expect(Selector('#content > h1').innerText).eql('Get your document legalised')
        .click('#start')

        .expect(Selector('.heading-xlarge').innerText).eql('Choose a service')
        .click('#premium-service')

        .expect(Selector('.heading-xlarge').innerText).eql('Have you already got an online account for legalisation?')
        .click('#radio-no')
        .click('#continue-button')

        .expect(Selector('.heading-xlarge').innerText).eql('Create an account')
        .typeText('#email', 'cmcgandy@gmail.com')
        .typeText('#confirm_email', 'cmcgandy@gmail.com')
        .typeText('#password','KainostestCBL02')
        .typeText('#confirm_password','KainostestCBL02')
        .click('#radio-indent-2')
        .click('#all_info_correct')
        .click('#register-form > button')

});
