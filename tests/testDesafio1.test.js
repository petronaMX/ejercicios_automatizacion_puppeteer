const puppeteer = require('puppeteer');
const url = 'https://mx.ebay.com/';
const selectorPageTecnologia = 'div>h1::-p-text(Entra en el mundo de la tecnología)';

describe('Test para los desafios', () => {
    it('Desafio 1 con texto', async () => {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(url);
        await page.locator('div>ul>li>a::-p-text(Tecnología)').click();
        await page.waitForSelector(selectorPageTecnologia);
        await browser.close();
    });
    it('Desafio 2 con css', async () => {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(url);
        await page.locator('.page-grid-container.hp-grid-container .vl-flyout-nav__container .vl-flyout-nav__js-tab:nth-child(3)> a').click();
        await page.waitForSelector(selectorPageTecnologia);
        await browser.close();
    });
    it('Desafio 3 con Xpath', async () => {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(url);
        await page.locator('::-p-xpath(//*[@id="vl-flyout-nav"]/ul/li[3]/a)').click();
        await page.waitForSelector('div>h1::-p-text(Entra en el mundo de la tecnología)');
        await browser.close();
    });
});