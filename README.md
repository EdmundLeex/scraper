# Web Scraper
This scraper uses Casperjs and Phantomjs.

## Preliminary
Please install Phantomjs 1.x and Casperjs ~> 1.1
`npm install -g phantomjs`
`npm install -g casperjs`

or simply run `npm install`

## Scraping
Go to terminal, and navigate to root. Run `casperjs lib/scraper.js`.

The script will automatically login and scrape content from Uber page.

Funding data and news data are written to two separate CSV files —- `funding.csv` and `news.csv`

## Issues
- Only tested with static page with CBInsight contents. Not tested with actual scraping due to
out of log in.
- buildCSV could be extracted to one function
- Node module not natively supported by Phantomjs
- Due to previous issue, secrets are currently exposed (can use dotenv according to some post)
