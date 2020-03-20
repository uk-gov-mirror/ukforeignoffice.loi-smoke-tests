# encoding: utf-8

require 'spec_helper'
require 'rubygems'
require 'capybara'
require 'capybara/dsl'


shared_examples_for "standard happy path" do

  it "confirms app is functioning correctly" do
    visit '/select-service'
	  
	# choose-documents-or-skip
	page.should have_content('Check if documents can be legalised')
	click_on 'skip this check'

	# your-basic-details
	page.should have_content('Your details')
	fill_in('first_name', :with => 'Joe')
	fill_in('last_name', :with => 'Bloggs')
	fill_in('telephone', :with => '07777777777')
	choose('No')
    click_on 'Continue'

    # your-main-address-details
    page.should have_content('Return address details')
    choose('Yes')
    click_on 'Continue'

    # your-main-address-uk
    page.should have_content('Return address details')
    click_on 'Enter address manually'

    # your-main-address-manual
    page.should have_content('Return address details')
    fill_in('house_name', :with => '4-6')
    fill_in('street', :with => 'Upper Crescent')
    fill_in('town', :with => 'Belfast')
    fill_in('postcode', :with => 'BT71NT')
    click_on 'Continue'

    # alternative-address
    page.should have_content('Return address if we can’t legalise your documents')
    choose('radio-yes')
    click_on 'Continue'

    # how-many-documents
    page.should have_content('Number of documents')
    fill_in('documentCount', :with => '1')
    click_on 'Continue'

    # postage-send-options
    page.should have_content('Sending us your documents')
    choose('send_0')
    click_on 'Continue'

    # postage-return-options
    page.should have_content('Returning your documents')
    choose('return_0')
    click_on 'Continue'

    # additional-information
    page.should have_content('Additional information')
    choose('No')
    click_on 'Continue'

    # review-summary
    page.should have_content('Check your answers before paying for your application')
    click_on 'Continue'

    # declaration
    page.should have_content('Declaration')
    check('I agree')
    click_on 'Confirm application details & pay'

    # submit-payment
    page.should have_content('Pay for your application')
    click_on 'Pay on Barclaycard SmartPay'

    # barclaycard
    page.should have_content('Step 1: Please select your payment method')

  end

end

describe "standard service happy path", :type => :feature do
  context "with js", :js => true do
    it_should_behave_like "standard happy path"
  end
end
