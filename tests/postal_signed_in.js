import { Selector } from 'testcafe';

const config = require("../config/settings");

fixture `Premium signed in application`
    .page(config.settings.app_url);


//then create a test and place your code there
test('Should complete premium signed in applications', async t =>
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

        .expect(Selector('.heading-xlarge').innerText).eql('Choose a service')
        .click('#standard-service')

        .expect(Selector('.heading-xlarge').innerText).eql('Check if documents can be legalised')
        .click('#skip_check')

        .expect(Selector('.heading-xlarge').innerText).eql('Your details')
        .click('#radio-yes')
        .click('#NextBtn')

        .expect(Selector('.heading-xlarge').innerText).eql('Return address details')
        .click('#savedAddressID-80')
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

        .expect(Selector('.heading-xlarge').innerText).eql('Pay for your application')
        .click('#content > div.container > div.intro.column-two-thirds > form > div > button')

        .expect(Selector('.heading-xlarge').innerText).eql('Pay for your application')
        .click('#ocDetails\\5b \\27 8314767221795809_cvc\\27 \\5d')
        .typeText('#ocDetails\\5b \\27 8314767221795809_cvc\\27 \\5d', '737')

        .expect(Selector('.heading-xlarge').innerText).eql('Pay for your application')
        .click('#\\38 314767221795809_div > div.pmOcPay > input[type="submit"]')

        .expect(Selector('.heading-xlarge').innerText).eql('Pay for your application')
        .click('#mainSubmit')

        .expect(Selector('#content > div:nth-child(5) > h2').innerText).eql('What to do next')
        .click('#print-button')

        .expect(Selector('.heading-large').innerText).eql('Application cover sheet')
        .expect(Selector('#bold-details > td:nth-child(1)').innerText).eql('Test McTesty')


});







