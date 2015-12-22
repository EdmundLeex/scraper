var LOGIN_PAGE = "https://www.cbinsights.com/login.php";
var UBER_PAGE = "https://www.cbinsights.com/c-4111adec4311b7124dba579e9ba7636a?term=uber";
var jQueryLib = "https://code.jquery.com/jquery-2.1.4.min.js";

var casper = require('casper').create();
var utils = require('utils');
var fs = require("fs");

function extractNewsToCSV() {
  this.echo("Extracting news data");
  var titles = [];
  var articleUrls = [];
  var articles = [];
  var currentLink = 0;
  var numberOfLinks = 0;
  var csv = "";
  var casper = this;

  function grabArticle() {
    try{
      casper.open(articleUrls[currentLink]).then(function () {
        casper.echo(casper.getTitle());

        csv += '"' + titles[currentLink] + '"';
        csv += ',';
        csv += articleUrls[currentLink];
        csv += ',';

        var paragraphs = casper.getElementsInfo('p');
        var article = "";

        for (var i = 0; i < paragraphs.length; i++) {
          article += paragraphs[i].text;
        }

        csv += '"' + article + '"';
        csv += "\n";
      });
      this.then(buildCSV);
    }catch(e){
      console.log(e);
    }
  }

  function buildCSV() {
    this.echo("Writing to file");

    fs.write("news.csv", csv);
    csv = "";
    currentLink++;
    this.then(selectLink);
  }

  function capture() {
    var newsDashSelector = 'div[class="dash-news"] a';
    var newsInfo = casper.getElementsInfo(newsDashSelector);

    for (var i = 0; i < newsInfo.length; i++) {
      titles.push('"' + newsInfo[i].text + '"');
      articleUrls.push(newsInfo[i].attributes.href);
    }

    numberOfLinks = titles.length;

    casper.then(selectLink);
  }

  function selectLink() {
    if (currentLink < numberOfLinks) {
      this.then(grabArticle);
    }
  }

  capture();
}

function extractFundingToCSV() {
  this.echo("Extracting funding data");

  var financing_timeline_selector = 'div[id="financing_timeline"] svg';
  var fund_yr_selector = financing_timeline_selector + ' g[class="x axis show hide-domain"] g text';
  var fund_amt_selector = financing_timeline_selector + ' g[class="bubble-group"] text';

  var fund_yr_info = this.getElementsInfo(fund_yr_selector);
  var fund_amt_info = this.getElementsInfo(fund_amt_selector);

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

  this.echo("Writing to file");
  fs.write("funding.csv", csv);
}

casper.start(UBER_PAGE, function () {
  if (this.getTitle().match(/Log in/i)) {
    this.echo("Logging in");

    this.fill('form.login-form', {
      'email': EMAIL,
      'pass': PASSWORD
    }, true);
  } else {
    this.echo("Already logged in");
    return;
  }
});

casper.thenOpen(UBER_PAGE, extractFundingToCSV);
casper.then(extractNewsToCSV);

casper.run();