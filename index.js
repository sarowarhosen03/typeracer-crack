import puppeteer from "puppeteer";
 
(async function () {

    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    page.setDefaultTimeout(0)

    await page.goto('https://play.typeracer.com/', {
        waitUntil: 'networkidle0'
    });
    await page.waitForSelector('#gwt-uid-1 > a')
    await page.click('#gwt-uid-1 > a');
    await page.waitForSelector('#gwt-uid-20 > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td > div > div > span:nth-child(3)')

    let toType = await page.$$eval('#gwt-uid-20 > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td > div > div > span', (element) => element.map((el) => el.textContent).join(''));
    console.log(toType);
    await page.waitForSelector('.txtInput');
    setTimeout(() => {

        startTyping(page);
    }, 11500);
    async function startTyping(page) {

        page.keyboard.type(toType, { delay: 60 }); // Types slower, like a user


    }


}())
