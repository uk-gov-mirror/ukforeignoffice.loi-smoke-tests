# encoding: utf-8

require 'spec_helper'
require 'rubygems'
require 'capybara'
require 'capybara/dsl'


shared_examples_for "eligibility checker paths" do

  it "confirms eligibility checker is functioning correctly - standard journey" do
    visit '/select-service'

    # select-service
    page.should have_content('Choose a service')
    page.should have_content('Standard service')
    page.should have_content('Premium service')
    click_on 'Start a standard application'

	# choose-documents-or-skip
	page.should have_content('Check if documents can be legalised')
	click_on 'Check your documents'

	# select-documents
	page.should have_content('Select all your documents')
	click_on 'degree certificate'
	click_on 'Select'
	click_on 'Continue'

	# confirm-documents
    page.should have_content('Confirm your document format')
    choose('Your original degree certificate or transcript (UK)')
    click_on 'Continue'

    # check-documents-eligible
    page.should have_content('Confirm your document is certified')
    choose('Yes')
    click_on 'Continue'

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
    click_on 'MasterCard'
    fill_in('card.cardNumber', :with => '5555555555554444')
    fill_in('card.cardHolderName', :with => 'Mr Test')
    select('08', :from => 'card.expiryMonth')
    select('2018', :from => 'card.expiryYear')
    fill_in('card.cvcCode', :with => '737')
    click_on 'Continue'
    click_on 'Pay'

    # submit-application
    page.should have_content('Total amount: £30.00')

  end

  it "confirms eligibility checker is functioning correctly - premium journey" do
      visit '/select-service'

      # select-service
      page.should have_content('Choose a service')
      page.should have_content('Standard service')
      page.should have_content('Premium service')
      click_on 'Start a premium application'

      # user-check
      page.should have_content('Have you already got an online account for legalisation?')
      choose('Yes')
      click_on 'Continue'

      # sign-in
      page.should have_content('Sign in')
      fill_in('email', :with => ENV['TEST_USERNAME'])
      fill_in('password', :with => ENV['TEST_PASSWORD'])
      click_on 'Sign in'

      # select-service
      page.should have_content('Choose a service')
      page.should have_content('Standard service')
      page.should have_content('Premium service')
      click_on 'Start a premium application'


      # bunsiness-document-quantity
      page.should have_content('Your documents')
      click_on 'Check if your documents can be legalised'

      # select-documents
      page.should have_content('Select all your documents')
      click_on 'degree certificate'
      click_on 'Select'
      click_on 'Continue'

      # confirm-documents
      page.should have_content('Confirm your document format')
      choose('Your original degree certificate or transcript (UK)')
      click_on 'Continue'

      # check-documents-eligible
      page.should have_content('Confirm your document is certified')
      choose('Yes')
      click_on 'Continue'

      # bunsiness-document-quantity
      page.should have_content('Your documents')
      click_on 'Continue'

      # business-additional-information
      page.should have_content('Additional information')
      click_on 'Continue'

      # submit-payment
      page.should have_content('Pay for your application')
      click_on 'Pay on Barclaycard SmartPay'

      # barclaycard
      page.should have_content('Step 1: Please select your payment method')
      click_on 'MasterCard'
      fill_in('card.cardNumber', :with => '5555555555554444')
      fill_in('card.cardHolderName', :with => 'Mr Test')
      select('08', :from => 'card.expiryMonth')
      select('2018', :from => 'card.expiryYear')
      fill_in('card.cvcCode', :with => '737')
      click_on 'Continue'
      click_on 'Pay'

      # submit-application
      page.should have_content('Total amount: £75.00')

    end

  it "confirms eligibility checker is functioning correctly - dropoff journey" do
          visit '/select-service'

      # select-service
      page.should have_content('Choose a service')
      page.should have_content('Standard service')
      page.should have_content('Premium service')
      click_on 'Sign in'

      # sign-in
      page.should have_content('Sign in')
      fill_in('email', :with => ENV['TEST_USERNAME'])
      fill_in('password', :with => ENV['TEST_PASSWORD'])
      click_on 'Sign in'

      # select-service
      page.should have_content('Choose a service')
      page.should have_content('Standard service')
      page.should have_content('Premium service')
      click_on 'Start a business drop-off application'


      # bunsiness-document-quantity
      page.should have_content('Your documents')
      click_on 'Check if your documents can be legalised'

      # select-documents
      page.should have_content('Select all your documents')
      click_on 'degree certificate'
      click_on 'Select'
      click_on 'Continue'

      # confirm-documents
      page.should have_content('Confirm your document format')
      choose('Your original degree certificate or transcript (UK)')
      click_on 'Continue'

      # check-documents-eligible
      page.should have_content('Confirm your document is certified')
      choose('Yes')
      click_on 'Continue'

      # bunsiness-document-quantity
      page.should have_content('Your documents')
      click_on 'Continue'

      # business-additional-information
      page.should have_content('Additional information')
      click_on 'Continue'

      # submit-payment
      page.should have_content('Pay for your application')
      click_on 'Pay on Barclaycard SmartPay'

      # barclaycard
      page.should have_content('Step 1: Please select your payment method')
      click_on 'MasterCard'
      fill_in('card.cardNumber', :with => '5555555555554444')
      fill_in('card.cardHolderName', :with => 'Mr Test')
      select('08', :from => 'card.expiryMonth')
      select('2018', :from => 'card.expiryYear')
      fill_in('card.cvcCode', :with => '737')
      click_on 'Continue'
      click_on 'Pay'

      # submit-application
      page.should have_content('Total amount: £30.00')

      end
end

describe "eligibility checker paths", :type => :feature do
  context "with js", :js => true do
    it_should_behave_like "eligibility checker paths"
  end
end
