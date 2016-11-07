require 'capybara/rspec'
require 'capybara-screenshot'
require 'capybara-screenshot/rspec'
require 'capybara/poltergeist'
require 'capybara/mechanize'


RSpec.configure do |config|
  config.treat_symbols_as_metadata_keys_with_true_values = true
  config.run_all_when_everything_filtered = true
  config.filter_run :focus
#  config.order = 'random'
  config.before(:each) do  
    environmentToTest = ENV['TEST_URL']
    testUsername = ENV['TEST_USER']
    testPassword = ENV['TEST_PASS']
    if has_js
      switch_platform(environmentToTest, testUsername, testPassword)
    else
      switch_platform(environmentToTest, nil, nil)
      page.driver.browser.agent.add_auth(environmentToTest, testUsername, testPassword)
    end  
  end
end

Capybara.configure do |config|
  config.run_server = false
  config.app = 'app_4_mechanize'
  config.default_driver = :mechanize 
  config.javascript_driver = :poltergeist 
  config.default_wait_time = 30
end

def has_js 
  return Capybara.current_driver == Capybara.javascript_driver
end

def switch_platform(platform, user, pass)
	page.driver.browser.js_errors = false
  if (platform.nil? || platform.empty?)
    fail("TEST_URL not set, cannot run tests")
  end
  if (!user.nil? && !user.empty? && !pass.nil? && !pass.empty?)
    platform = platform.gsub(/:\/\//, "://#{user}:#{pass}@")
  end
  platform = platform.sub(/(\/)+$/,'') #Strip trailing /
  Capybara.app_host = "#{platform}"
end

# Public: Wait while the predicate defined by block 
# is not satisfied by repeatedly
# calling the block until it returns true.
#
# Useful to wait for external systems to do something.
# Like launching daemons in integration tests. Which 
# you're not actually doing right? >_<
#
# timeout        - Integer specifying how many seconds
#                  to wait for.
# retry_interval - Interval in seconds between
#                  calling block while it's
#                - returning false.
# block          - A block which returns true or false.
#                  It should only return true when
#                  there no need to wait any more.
#
# Returns false if timeout reached before block returned
# true, otherwise it returns true.

def wait_until(timeout = 30, retry_interval = 0.1, &block)
  start = Time.now
  while (result = !block.call)
    break if (Time.now - start).to_i >= timeout
    sleep(retry_interval)
  end
  !result
end

def on_page(url, &block)
  wait_until do
    current_path.include? url
  end
  current_path.should have_content(url)
  block.call
end

