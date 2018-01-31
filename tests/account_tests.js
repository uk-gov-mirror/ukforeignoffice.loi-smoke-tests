import { Selector } from 'testcafe';

const config = require("../config/settings");

fixture `Account tests`
    .page(config.settings.app_url);


//then create a test and place your code there
test('Should sign-in and change some personal details', async t =>
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
        .click('#content > div:nth-child(3) > div > table > tbody > tr:nth-child(1) > td.summary-table-cell-link > a')
        .click('#first-name')
        .typeText('#first-name','Test', { replace: true })
        .click('#change-details > button')
        .expect(Selector('tr:nth-child(1) > td.summary-table-cell-content').innerText).eql('Test')

        //delete address
        .click('#Addresses-Link')
        .click('#content > div.column-two-thirds > div > table > tbody > tr > td > a.delete-address.button-delete.button.address-button')
        .expect(Selector('#content > div.column-two-thirds > div.alert.alert--success > p').innerText).contains('Address successfully deleted')

        //Add new address
        .click('#Addresses-Link')
        .click('#content > div.column-two-thirds > a')
        .click('#is-uk > div:nth-child(1) > fieldset > label:nth-child(2)')
        .click('#is-uk > div:nth-child(2) > button')
        .typeText('#find-postcode','bt71nt', { replace: true })
        .click('#find-address')
        .click('#address-list-box')
        .click('#address-list-box > option:nth-child(3)')
        .click('#NextBtn')

        //edit and add addresses
        .click('#Addresses-Link')
        .click('.review-personal-details > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > a:nth-child(4)')
        .click('#telephone')
        .typeText('#telephone','07835424298', { replace: true })
        .click('.button')
        .expect(Selector('.review-personal-details > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1)').innerText).contains('07835424298')



});