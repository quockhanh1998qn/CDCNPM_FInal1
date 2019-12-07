'use strict'
const puppeteer = require('puppeteer');
const pdf2base64 = require('pdf-to-base64');
const fs = require('fs-extra');
const hbs = require('handlebars');
const path = require('path');
const moment = require('moment');
const compile = async function(data) {
    const filePath = path.join(process.cwd(), 'views', 'invoice.hbs');
    const html = await fs.readFile(filePath, 'utf-8');
    return hbs.compile(html)(data);
};

// hbs.registerHelper('dateFormat', (value, format) => {
//     return moment(value).format(format);
// })
module.exports = {
    post: (req, res) => {
        const data = {
            total: req.body.total,
            items: req.body.items,
            date: req.body.date,
            nameStaff: req.body.nameStaff,
        };
        let buffer;
        (async () => {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            const content = await compile(data);
            await page.setContent(content);
            await page.emulateMedia('screen');
            buffer = await page.pdf({
                path: 'assets/invoice.pdf', 
                format: 'A4',
                printBackground: true,
            });
            await pdf2base64("assets/invoice.pdf").then(
                (response) => {
                    res.json(response);
                }
            ).catch((err) => {
                console.log(err);
            });
            await browser.close()
        })()

    },
}