import { Selector } from 'testcafe';

const config = require("../config/settings");

fixture `Document eligibility checker tests`
    .page(config.settings.app_url)
    .httpAuth({
        username: config.settings.basic_auth_username,
        password: config.settings.basic_auth_password
    });



test('Should show autocomplete options', async t =>
{
    await
    t

        .expect(Selector('#content > h1').innerText).eql('Get your document legalised')
        .click('#start')

        .expect(Selector('.heading-xlarge').innerText).eql('Choose a service')
        .click('#standard-service')

        .expect(Selector('.heading-xlarge').innerText).eql('Check if documents can be legalised')
        .click('#check_documents')

        //Check category synonyms
        .expect(Selector('.heading-xlarge').innerText).eql('Select all your documents')
        .click('#doc_search_field')
        .typeText('#doc_search_field','id')
        .expect(Selector('#doc-seach-typeahead > span > div').innerText).contains('Affidavit')
        .expect(Selector('#doc-seach-typeahead > span > div').innerText).contains('Bank statement')

});

test('Should show synonyms e.g. Health, ID, Personal, Legal, Marriage', async t =>
{
    await
    t

        .expect(Selector('#content > h1').innerText).eql('Get your document legalised')
        .click('#start')

        .expect(Selector('.heading-xlarge').innerText).eql('Choose a service')
        .click('#standard-service')

        .expect(Selector('.heading-xlarge').innerText).eql('Check if documents can be legalised')
        .click('#check_documents')

        //Check category synonyms
        .expect(Selector('.heading-xlarge').innerText).eql('Select all your documents')
        .click('#doc_search_field')
        .typeText('#doc_search_field','id')
        .click('#doc_search_button')
        .expect(Selector('tr:nth-child(7) > td:nth-child(1)').innerText).eql('Driving licence')
        .expect(Selector('tr:nth-child(8) > td:nth-child(1)').innerText).eql('Fingerprints document')
        .expect(Selector('tr:nth-child(11) > td:nth-child(1)').innerText).eql('Passport')
        .expect(Selector('tr:nth-child(12) > td:nth-child(1)').innerText).eql('Utility bill')

        .click('#doc_search_field')
        .typeText('#doc_search_field','health', { replace: true })
        .click('#doc_search_button')
        .expect(Selector('tr:nth-child(3) > td:nth-child(1)').innerText).eql('Fit note')
        .expect(Selector('tr:nth-child(4) > td:nth-child(1)').innerText).eql('Medical report')
        .expect(Selector('tr:nth-child(5) > td:nth-child(1)').innerText).eql('Medical test results')
        .expect(Selector('tr:nth-child(6) > td:nth-child(1)').innerText).eql('Sick note')

        .click('#doc_search_field')
        .typeText('#doc_search_field','personal', { replace: true })
        .click('#doc_search_button')
        .expect(Selector('tr:nth-child(4) > td:nth-child(1)').innerText).eql('Baptism certificate')
        .expect(Selector('tr:nth-child(5) > td:nth-child(1)').innerText).eql('Birth certificate (UK)')
        .expect(Selector('tr:nth-child(8) > td:nth-child(1)').innerText).eql('Change of name deed')
        .expect(Selector('tr:nth-child(15) > td:nth-child(1)').innerText).eql('Letter from an employer')

        .click('#doc_search_field')
        .typeText('#doc_search_field','legal', { replace: true })
        .click('#doc_search_button')
        .expect(Selector('tr:nth-child(3) > td:nth-child(1)').innerText).eql('Certificate of freesale')
        .expect(Selector('tr:nth-child(7) > td:nth-child(1)').innerText).eql('Court document')
        .expect(Selector('tr:nth-child(8) > td:nth-child(1)').innerText).eql('Court of Bankruptcy document')
        .expect(Selector('tr:nth-child(16) > td:nth-child(1)').innerText).eql('High Court of Justice document')

        .click('#doc_search_field')
        .typeText('#doc_search_field','marriage', { replace: true })
        .click('#doc_search_button')
        .expect(Selector('tr:nth-child(1) > td:nth-child(1)').innerText).eql('Certificate of no impediment')
        .expect(Selector('tr:nth-child(2) > td:nth-child(1)').innerText).eql('Civil partnership certificate')
        .expect(Selector('tr:nth-child(4) > td:nth-child(1)').innerText).eql('Decree absolute')
        .expect(Selector('tr:nth-child(7) > td:nth-child(1)').innerText).eql('Marriage certificate, UK, issued by the General Register Office (GRO)')

});


test('Should check that companies house doc has correct certification options', async t =>
{
    await
    t
        .expect(Selector('#content > h1').innerText).eql('Get your document legalised')
        .click('#start')

        .expect(Selector('.heading-xlarge').innerText).eql('Choose a service')
        .click('#standard-service')

        .expect(Selector('.heading-xlarge').innerText).eql('Check if documents can be legalised')
        .click('#check_documents')

        //Select document
        .expect(Selector('.heading-xlarge').innerText).eql('Select all your documents')
        .click('#doc_search_field')
        .typeText('#doc_search_field','companies house document')
        .click('#doc_search_button')
        .click('#add_209')
        .click('#NextBtn')
        .expect(Selector('.heading-xlarge').innerText).eql('Confirm your document format')

    //original certificate check
        .click('#docid_209_1')
        .click('#NextBtn')
        .expect(Selector('.heading-xlarge').innerText).eql('Your details')
        .click('#content > div.inner_header.no-user-signed-in > a')

    //check logic for needs certification
        .click('#docid_209_2')
        .click('#NextBtn')
        .expect(Selector('.heading-xlarge').innerText).eql('Confirm your document is certified')
        .click('#content > div.inner_header.no-user-signed-in > a')
        .click('#docid_209_3')
        .click('#NextBtn')
        .expect(Selector('.heading-xlarge').innerText).eql('Confirm your document is certified')
        .click('#content > div.inner_header.no-user-signed-in > a')
        .click('#docid_209_4')
        .click('#NextBtn')
        .expect(Selector('.heading-xlarge').innerText).eql('Confirm your document is certified')
        .click('#content > div.inner_header.no-user-signed-in > a')

});

test('Should not allow you to proceed without certification', async t =>
{
    await
    t

        .expect(Selector('#content > h1').innerText).eql('Get your document legalised')
        .click('#start')

        .expect(Selector('.heading-xlarge').innerText).eql('Choose a service')
        .click('#standard-service')

        .expect(Selector('.heading-xlarge').innerText).eql('Check if documents can be legalised')
        .click('#check_documents')

        //Select document
        .expect(Selector('.heading-xlarge').innerText).eql('Select all your documents')
        .click('#doc_search_field')
        .typeText('#doc_search_field','companies house document')
        .click('#doc_search_button')
        .click('#add_209')
        .click('#NextBtn')
        .click('#docid_209_2')
        .click('#NextBtn')
        .expect(Selector('#content').innerText).contains('Confirm your document is certified')
        .click('#\\32 09-no')
        .click('#NextBtn')
        .expect(Selector('#content').innerText).contains('you need to get the following document certified:')
        .expect(Selector('#content').innerText).contains('Once you have certified all your documents, come back to this site and resubmit your application to get them legalised.')


});

test('Should update document counts', async t =>
{
    await
    t

        .expect(Selector('#content > h1').innerText).eql('Get your document legalised')
        .click('#start')

        .expect(Selector('.heading-xlarge').innerText).eql('Choose a service')
        .click('#standard-service')

        .expect(Selector('.heading-xlarge').innerText).eql('Check if documents can be legalised')
        .click('#check_documents')

        //Select document
        .expect(Selector('.heading-xlarge').innerText).eql('Select all your documents')
        .click('#doc_search_field')
        .typeText('#doc_search_field','companies house document')
        .click('#doc_search_button')
        .click('#add_209')
        .expect(Selector('#selected-count-table1').innerText).contains('(1)')
        .click('#doc_search_field')
        .typeText('#doc_search_field', 'driving licence', { replace: true })
        .click('#doc_search_button')
        .click('#add_227')
        .expect(Selector('#selected-count-table1').innerText).contains('(2)')
        .click('#doc_search_field')
        .typeText('#doc_search_field', 'High Court of Justice document', { replace: true })
        .click('#doc_search_button')
        .click('#add_235')
        .expect(Selector('#selected-count-table1').innerText).contains('(3)')
        .click('#remove_link_235')
        .expect(Selector('#selected-count-table1').innerText).contains('(2)')

});

test('Should show the zero results section when no search results are returned', async t =>
{
    await
    t

        .expect(Selector('#content > h1').innerText).eql('Get your document legalised')
        .click('#start')

        .expect(Selector('.heading-xlarge').innerText).eql('Choose a service')
        .click('#standard-service')

        .expect(Selector('.heading-xlarge').innerText).eql('Check if documents can be legalised')
        .click('#check_documents')

        //Select document
        .expect(Selector('.heading-xlarge').innerText).eql('Select all your documents')
        .click('#doc_search_field')
        .typeText('#doc_search_field','hello')
        .click('#doc_search_button')
        .expect(Selector('#content > div.filtering > div > p:nth-child(1) > span').innerText).contains('0 results found')

});

test('Should be able to click the A to Z of documents', async t =>
{
    await
    t

        .expect(Selector('#content > h1').innerText).eql('Get your document legalised')
        .click('#start')

        .expect(Selector('.heading-xlarge').innerText).eql('Choose a service')
        .click('#standard-service')

        .expect(Selector('.heading-xlarge').innerText).eql('Check if documents can be legalised')
        .click('#check_documents')

        //Select document
        .expect(Selector('.heading-xlarge').innerText).eql('Select all your documents')
        .click('#doc_search_field')
        .typeText('#doc_search_field','hello')
        .click('#doc_search_button')
        .expect(Selector('#content > div.filtering > div > p:nth-child(1) > span').innerText).contains('0 results found')
        .click('#az-list-link')
        .expect(Selector('#content').innerText).contains('Select all your documents')

});







