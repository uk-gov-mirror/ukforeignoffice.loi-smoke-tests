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
        .click('#document-search-top-searches > div > a:nth-child(3)')
        .click('#add_201')
        .click('#NextBtn')

        .expect(Selector('.heading-xlarge').innerText).eql('Confirm your document format')
        .click('#birth-certificate-div > fieldset > fieldset > div > label')
        .click('#NextBtn')
        .expect(Selector('.heading-xlarge').innerText).eql('Your details')
        .typeText('#first-name', 'Joe')
        .typeText('#last-name', 'Bloggs')
        .typeText('#phone','01234567890')
        .click('#email-question > fieldset > label:nth-child(3)')
        .click('#NextBtn')
        .expect(Selector('.heading-xlarge').innerText).eql('Return address details')
        .click('#is-uk > div:nth-child(1) > fieldset > label:nth-child(2)')
        .click('#is-uk > div:nth-child(2) > button')
        .typeText('#find-postcode','BT71NT')
        .click('#find-address')
        .click('#address-list-box')
        .click('#address-list-box > option:nth-child(3)')
        .click('#NextBtn')

        .expect(Selector('.heading-xlarge').innerText).eql('Return address if we can’t legalise your documents')
        .click('#radio-no')
        .click('#is-same > div:nth-child(2) > button')
        .click('#is-uk > div:nth-child(1) > fieldset > label:nth-child(3)')
        .click('#is-uk > div:nth-child(2) > button')
        .typeText('#organisation', 'Kainos')
        .typeText('#house_name', '31')
        .typeText('#street', 'Stras')
        .typeText('#town', 'Alsfeld')
        .typeText('#postcode', '1012QK')
        .click('#country')
        .click('#country > option:nth-child(2)')
        .click('#NextBtn')


        .expect(Selector('.heading-xlarge').innerText).eql('Number of documents')
        .click('#NextBtn')

        .expect(Selector('.heading-xlarge').innerText).eql('Sending us your documents')
        .click('#legend_postage_available > fieldset > label:nth-child(2)')
        .click('#NextBtn')

        .expect(Selector('.heading-xlarge').innerText).eql('Returning your documents')
        .click('#legend_postage_available > fieldset > div.column-two-thirds > label:nth-child(3)')
        .click('#NextBtn')

        .expect(Selector('.heading-xlarge').innerText).eql('Additional information')
        .click('#additional_info > div:nth-child(2) > fieldset > label:nth-child(3)')
        .click('#NextBtn')

        .expect(Selector('#content > div.form-group > h1').innerText).eql('Check your answers before paying for your application')
        .click('#review-personal-details > tbody > tr:nth-child(3) > td.summary-table-cell-link > a')
        .click('#phone')
        .pressKey('ctrl+a delete')
        .typeText('#phone','9876543210')
        .click('#NextBtn')

        .expect(Selector('#summary-telephone > span').innerText).eql('9876543210')
        .click('#content > a')

        .expect(Selector('.heading-xlarge').innerText).eql('Declaration')
        .click('#content > form > div > div:nth-child(4) > fieldset > label')
        .click('#content > form > div > div:nth-child(5) > button')

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
        .expect(Selector('#pmcontent > table > tbody > tr:nth-child(3) > td.b').innerText).contains('You are paying GBP 30.00 with')
        .click('#mainSubmit')

        .expect(Selector('#content').innerText).contains('Print')

});
