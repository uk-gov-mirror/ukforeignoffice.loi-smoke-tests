import { Selector } from 'testcafe';

const config = require("../config/settings");

fixture `Document eligibility checker test`
    .page(config.settings.app_url);


//then create a test and place your code there
test('Document eligibility checker test', async t =>
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


    //check logic for certification
        .click('#doc_search_field')
        .typeText('#doc_search_field','degree', { replace: true })
        .click('#doc_search_button')
        .click('#add_221')
        .click('#NextBtn')

        .expect(Selector('.heading-xlarge').innerText).eql('Confirm your document format')
    //original certificate check
        .click('#docid_221_1')
        .click('#NextBtn')
        .expect(Selector('.heading-xlarge').innerText).eql('Your details')
        .click('#content > div.inner_header.no-user-signed-in > a')

    //check logic for needs certification
        .click('#docid_221_2')
        .click('#NextBtn')
        .expect(Selector('.heading-xlarge').innerText).eql('Confirm your document is certified')

    //check logic, customer has not certified
        .click('#\\32 21-no')
        .click('#NextBtn')
        .expect(Selector('.heading-xlarge').innerText).eql('Get your document certified')

    //add/remove/update documents and numbers
        .click('#content > div.inner_header.no-user-signed-in.noPrint > a')
        .click('#content > div.inner_header.no-user-signed-in > a')
        .click('#content > div.inner_header.no-user-signed-in > a')

    //add
        .click('#doc_search_field')
        .typeText('#doc_search_field','personal', { replace: true })
        .click('#doc_search_button')
        .click('#add_197')
        .expect(Selector('#basket-table > thead > tr > th:nth-child(2)').innerText).eql('Quantity (2)')

    //remove
        .click('#remove_link_197')
        .expect(Selector('#basket-table > thead > tr > th:nth-child(2)').innerText).eql('Quantity (1)')

    //update
        .click('#\\32 21')
        .typeText('#\\32 21','5', { replace: true })
        //.click('#doc_search_button')
        .expect(Selector('#basket-table > thead > tr > th:nth-child(2)').innerText).eql('Quantity (5)')

    //check zero results page category links
        .click('#doc_search_field')
        .typeText('#doc_search_field','0', { replace: true })
        .click('#doc_search_button')
        .expect(Selector('.bold-text').innerText).eql('0 results found')
        .click('#content > div.filtering > div > form > ul > li:nth-child(2) > a:nth-child(1)')
        .expect(Selector('tr:nth-child(1) > td:nth-child(1)').innerText).eql('Bank statement')
        .expect(Selector('tr:nth-child(2) > td:nth-child(1)').innerText).eql('Baptism certificate')
        .expect(Selector('tr:nth-child(3) > td:nth-child(1)').innerText).eql('Birth certificate (UK)')
        .expect(Selector('tr:nth-child(7) > td:nth-child(1)').innerText).eql('Fingerprints document')
        .click('#document-search-back')

    //from zero results page go to A-Z page and check it works
    .click('#az-list-link').expect(Selector('.heading-xlarge').innerText).eql('Select all your documents')


});







