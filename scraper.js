var LOGIN_PAGE = "https://www.cbinsights.com/login.php";
var UBER_PAGE = "https://www.cbinsights.com/c-4111adec4311b7124dba579e9ba7636a?term=uber";
var jQueryLib = "https://code.jquery.com/jquery-2.1.4.min.js";
var EMAIL = "kaimin.hu@themarketx.com";
var PASSWORD = "xiaoK0&@@";

var casper = require('casper').create();
var utils = require('utils');
// casper.start(UBER_PAGE, function () {
//   this.echo(this.getTitle());
//   if (this.getTitle().match(/Log in/i) {
//     this.fill('form.login-form', {
//       'email': EMAIL,
//       'pass': PASSWORD
//     }, true);
//   } else {
//     return;
//   }
// })

// casper.thenOpen(LOGIN_PAGE, function() {
//   this.
// });

casper.start("file:///Users/user/Nitrous/supersonic-moustache-92/coding_challenges/web_scrapper/finance.html", function () {
  var financing_timeline_selector = 'div[id="financing_timeline"] svg';
  var fund_yr_selector = financing_timeline_selector + ' g[class="x axis show hide-domain"] g text';
  var fund_amt_selector = financing_timeline_selector + ' g[class="bubble-group"] text';

  var fund_yr_info = this.getElementsInfo(fund_yr_selector);
  var fund_amt_info = this.getElementsInfo(fund_amt_selector);

  var fund_data = [];
  var current_fund_yr = null;
  var csv = "";
  for (var i = 0; i < fund_yr_info.length; i++) {
    if (fund_yr_info[i].text) {
      current_fund_yr = fund_yr_info[i].text;
    }
    csv += (current_fund_yr
        + ","
        + fund_amt_info[i].text
        + "\n");
  }

  var fs = require("fs");
  fs.write("data.csv", csv);
});

casper.run();