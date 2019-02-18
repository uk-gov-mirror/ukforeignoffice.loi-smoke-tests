import { Selector } from 'testcafe';

const config = require("../config/settings");

fixture `Happy path test`
    .page(config.settings.app_url)
    .httpAuth({
        username: config.settings.basic_auth_username,
        password: config.settings.basic_auth_password
    });

 
//then create a test and place your code there
test('Should complete the happy path', async t => {
    await t

        .expect(Selector('#content > h1').innerText).eql('Get your document legalised')
        .click('#start')

        .expect(Selector('.heading-xlarge').innerText).eql('Choose a service')
        .click('#standard-service')

        .expect(Selector('.heading-xlarge').innerText).eql('Check if documents can be legalised')
        .click('#skip_check')

        .expect(Selector('.heading-xlarge').innerText).eql('Your details')
        .typeText('#first-name', 'Testy')
        .typeText('#last-name', 'McTest')
        .typeText('#phone','01234567890')
        .click('#email-question > fieldset > label:nth-child(3)')
        .click('#NextBtn')

        .expect(Selector('.heading-xlarge').innerText).eql('Return address details')
        .click('#is-uk > div:nth-child(1) > fieldset > label:nth-child(2)')
        .click('#is-uk > div:nth-child(2) > button')
        .click('#address-manual')
        .typeText('#organisation', 'Kainos')
        .typeText('#house_name', '4-6')
        .typeText('#street', 'Upper Crescent')
        .typeText('#town', 'Belfast')
        .typeText('#county', 'Antrim')
        .typeText('#postcode', 'BT71NT')
        .click('#NextBtn')

        .expect(Selector('.heading-xlarge').innerText).eql('Return address if we can’t legalise your documents')
        .click('#is-same > div:nth-child(1) > fieldset > label:nth-child(2)')
        .click('#is-same > div:nth-child(2) > button')

        .expect(Selector('.heading-xlarge').innerText).eql('Number of documents')
        .typeText('#documentCount', '1')
        .click('#NextBtn')

        .expect(Selector('.heading-xlarge').innerText).eql('Sending us your documents')
        .click('#legend_postage_available > fieldset > label:nth-child(2)')
        .click('#NextBtn')

        .expect(Selector('.heading-xlarge').innerText).eql('Returning your documents')
        .click('#legend_postage_available > fieldset > div.column-two-thirds > label:nth-child(1)')
        .click('#NextBtn')

        .expect(Selector('.heading-xlarge').innerText).eql('About your documents')
        .click('#about-docs > div:nth-child(1) > fieldset > label:nth-child(2)')
        .click('#NextBtn')

        .expect(Selector('.heading-xlarge').innerText).eql('About your application')
        .click('#residency > div:nth-child(1) > fieldset > label:nth-child(2)')
        .click('#NextBtn')

        .expect(Selector('.heading-xlarge').innerText).eql('Additional information')
        .click('#additional_info > div:nth-child(2) > fieldset > label:nth-child(3)')
        .click('#NextBtn')

        .expect(Selector('#content > div.form-group > h1').innerText).eql('Check your answers before paying for your application')
        .click('#content > a')

        .expect(Selector('.heading-xlarge').innerText).eql('Declaration')
        .click('#content > form > div > div:nth-child(4) > fieldset > label')
        .click('#content > form > div > div:nth-child(5) > button')

        .expect(Selector('.heading-xlarge').innerText).eql('Pay for your application')
        .click('#content > div.container > div.intro.column-two-thirds > form > div > button')

        .expect(Selector('#content > h1').innerText).eql('Pay for your application')
});
