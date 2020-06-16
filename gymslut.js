const puppeteer = require('puppeteer');

const getDateString = () => {
    const date = new Date()
    date.setDate(date.getDate() + 6)
    return date.toLocaleDateString().replace(/\//g, '-')
}

(async () => {
    const userName = 'a.taylor.lynch@gmail.com'
    const password = 'Barney 123'
    const url = 'https://member.clubware.com.au/Goodlifecarnegie/TimeTable'
    const query = '?calendarDate='
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()
    await page.goto(url, {waitUntil: 'load', timeout: 0})
    await page.waitForSelector('#loginLink')
    await page.click('#loginLink')
    await page.waitForSelector('#Email')
    await page.focus('#Email')
    await page.keyboard.type(userName)
    await page.focus('#Password')
    await page.keyboard.type(password)
    await page.waitForSelector('#loginForm > form > div:nth-child(11) > div > div > input')
    await page.click('#loginForm > form > div:nth-child(11) > div > div > input')
    const exactDateURL = url + query + getDateString()
    await page.goto(exactDateURL, {waitUntil: 'load', timeout: 0})
})()

