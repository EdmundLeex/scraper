var LOGIN_PAGE = "https://www.cbinsights.com/login.php";
var jQueryLib = "https://code.jquery.com/jquery-2.1.4.min.js";
var EMAIL = "kaimin.hu@themarketx.com";
var PASSWORD = "xiaoK0&@@";

var casper = require('casper').create();

casper.start(LOGIN_PAGE, function() {
  this.fill('form.login-form', {
    'email': EMAIL,
    'pass': PASSWORD
  }, true);
});

casper.then(function() {
    this.echo(this.getTitle());
});

casper.run();