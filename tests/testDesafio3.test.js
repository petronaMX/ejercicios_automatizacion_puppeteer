const puppeteer = require('puppeteer');
const expect = require('chai').expect;

describe('Test para validar carrito de compras', () => {
    let  browser, page;
    before(async () => {
        browser = await puppeteer.launch({ headless: false });
        page = await browser.newPage();
        await page.goto('https://es.logos.com/ofertas-del-mes');
    });

    after(async () => {await browser.close();});

    it('Agrega artículo a carrito, va a carrito y valida el monto del artículo', async () => {
        let parentElement = ".promo_container .promo_section:nth-child(1)";
        let priceItem;
        let priceItemCart;
        await page.waitForSelector(".promo_container");
        await page.evaluate(() => {
         window.scrollTo(0,150);
        });
        priceItem = await page.$eval(`${parentElement} .product__price`, (element)=>{
            return element.textContent.split('$')[1];
        });
        await page.click(`${parentElement} .add-to-mini-cart-button-container button`);
        await page.click('.sc-kdBSHD.gtUjXQ', {delay: 1000});
        await page.waitForSelector('.cart-totals-container',{delay: 2000});
        priceItemCart = await page.$eval('.balance .currency .js-balance-due-usd-amount', (element)=> element.textContent.split('$')[1]);
        expect(priceItem).to.be.equals(priceItemCart);
    });
    
});