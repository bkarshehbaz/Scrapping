const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const fs = require("fs");
const { json } = require("express");
const writeStream = fs.createWriteStream("Vaps.csv");

//Write headers
writeStream.write(
  `Title,Color,SKU,Price,Stock,Image,Description, Product Url \n`
);
(async () => {
  options = {
    width: "1400",
    height: "1600",
  };
  const browser = await puppeteer.launch({
    headless: true, // The browser is visible
    ignoreHTTPSErrors: true,
    args: [`--window-size=${options.width},${options.height}`], // new option
  });
  const page = await browser.newPage();

  await page.goto(
    "https://www.foreca.com/105199233/Loysville-Perry-County-PA",

    {
      waitUntil: "load",
      // Remove the timeout
      timeout: 0,
    }
  );
  await page.setViewport({
    width: 1400,
    height: 1600,
  });

  await autoScroll(page);
  await page.screenshot({
    path: "weather.png",
    fullPage: true,
  });

  await autoScroll(page);




  
})();

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      var totalHeight = 0;
      var distance = 100;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 200);
    });
  });
}
