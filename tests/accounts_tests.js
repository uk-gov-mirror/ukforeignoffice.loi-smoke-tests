import { Selector } from 'testcafe';

const config = require("../config/settings");

fixture `Should complete the accounts settings test`
    .page(config.settings.app_url);


//then create a test and place your code there
test('Document eligibility checker test', async t =>
{
    await
    t

        .expect(Selector('#content > h1').innerText).eql('Get your document legalised')
        .click('#start')

        .expect(Selector('.heading-xlarge').innerText).eql('Choose a service')
        .click('#sign-in-link')

        .expect(Selector('.heading-xlarge').innerText).eql('Sign in')
        .typeText('#email', config.settings.test_username)
        .typeText('#password', config.settings.test_password)
        .click('#sign-in-button')

        //access account settings
        .click('#Account-Link')
        .expect(Selector('.heading-xlarge').innerText).eql('Personal details')

        //edit contact details (first name)
        .click('#content > div:nth-child(3) > div > table > tbody > tr:nth-child(1) > td.summary-table-cell-link > a')
        .click('#first-name')
        .typeText('#first-name','Testy', { replace: true })
        .click('#change-details > button')
        .expect(Selector('tr:nth-child(1) > td.summary-table-cell-content').innerText).eql('Testy')

        //change back to original
        .click('#first-name')
        .typeText('#first-name','Test', { replace: true })
        .click('#change-details > button')

        //edit and add addresses
        .click('#Addresses-Link')
        .click('#content > div.column-two-thirds > a')
        .click('#radio-yes')
        .click('#is-uk > div:nth-child(2) > button')

        .click('#doc_search_field')
        .typeText('#find-postcode','bt71nt')
        .click('#find-address')

    //Register as non-business and should not see premium option when signed in



    // upgrade to business, then check you can see premium option








});