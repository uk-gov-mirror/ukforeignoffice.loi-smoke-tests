import { Selector } from 'testcafe';

const config = require("../config/settings");

fixture `Happy path test`
    .page(config.settings.app_url)
 
//then create a test and place your code there
test('Should complete the happy path', async t => {
    await t

        .expect(Selector('#content > header > div > h1').innerText).eql('Get your document legalised')
        .click('#get-started > a')

        .expect(Selector('#content > div:nth-child(3) > h2').innerText).eql('Legalisation services during coronavirus')

        .expect(Selector('#content > div.open-legalisation-letter > p.logo > a').innerText).eql('Download letter for legalisation during coronavirus.')

        .expect(Selector('#content > div:nth-child(5) > h2').innerText).eql('Exceptional circumstances only')

});
