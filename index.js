import puppeteer from "puppeteer";
const DELAY = 30; //type delay in ms 
const MATCH_DEALY_BEFORE_START = 12000; //WAIT delay in ms 
const WAIT_AFTER_COMPLETE = 20000; //WAIT delay in ms 
const TARGET_TO_TYPE_EL = "#gwt-uid-20 > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td > div > div > span";//WHERE THE TEXT TO TYPE IS LOCATED
(async function () {

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: {
            width: 756, height: 1080,
            deviceScaleFactor: 1
        }
    });
    const page = await browser.newPage();
    page.setDefaultTimeout(0)
    await page.goto('https://play.typeracer.com/', {
        waitUntil: 'networkidle0'
    });
    await page.waitForSelector('#gwt-uid-1 > a')
    await page.click('#gwt-uid-1 > a');
    await page.waitForSelector(TARGET_TO_TYPE_EL)
    let toType = await page.$$eval(TARGET_TO_TYPE_EL, (element) => element.map((el) => el.textContent).join(''));
    console.log(toType);
    const targetBox = await page.waitForSelector('.txtInput');
    await targetBox.scrollIntoView();

    await sleep(MATCH_DEALY_BEFORE_START)
    await page.keyboard.type(toType, { delay: DELAY }); // Types slower, like a user
    await sleep(WAIT_AFTER_COMPLETE)
    await browser.close();
    await process.exit(0);
}())

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}