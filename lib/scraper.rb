require 'mechanize'
require 'dotenv'
Dotenv.load

mechanize = Mechanize.new

page = mechanize.get('https://www.cbinsights.com/login.php')

page.form.email = ENV['email']
page.form.pass = ENV['pass']

page = page.submit

puts page.at('#top-story h2').text.strip