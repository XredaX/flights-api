"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// npx tsc
// npm run start
const express_1 = __importDefault(require("express"));
const puppeteer_extra_1 = __importDefault(require("puppeteer-extra"));
const puppeteer_extra_plugin_stealth_1 = __importDefault(require("puppeteer-extra-plugin-stealth"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const date_fns_1 = require("date-fns");
const puppeteer_1 = require("puppeteer");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
puppeteer_extra_1.default.use((0, puppeteer_extra_plugin_stealth_1.default)());
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
const airportCodes = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, 'airport_codes.json'), 'utf8'));
function validateDate(dateStr) {
    try {
        const dateObj = (0, date_fns_1.parse)(dateStr, 'yyyy-MM-dd', new Date());
        if (isNaN(dateObj.getTime()))
            throw new Error('Invalid date');
        return dateStr;
    }
    catch (error) {
        return null;
    }
}
let browser;
async function initializeBrowser() {
    browser = await puppeteer_extra_1.default.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--disable-gpu',
            '--no-zygote',
            '--single-process'
        ],
        executablePath: process.env.NODE_ENV === 'production'
            ? process.env.PUPPETEER_EXECUTABLE_PATH
            : (0, puppeteer_1.executablePath)()
    });
}
app.get('/flights', async (req, res) => {
    try {
        const fromName = req.query.from;
        const toName = req.query.to;
        const date = req.query.date;
        if (!fromName || !toName || !date) {
            return res.status(400).json({
                error: 'Please provide all three parameters: from, to, and date.'
            });
        }
        const from = airportCodes[fromName.charAt(0).toUpperCase() + fromName.slice(1).toLowerCase()];
        const to = airportCodes[toName.charAt(0).toUpperCase() + toName.slice(1).toLowerCase()];
        if (!from || !to) {
            return res.status(400).json({
                error: 'Airport name not found in database.'
            });
        }
        const formattedDate = validateDate(date);
        if (!formattedDate) {
            return res.status(400).json({
                error: 'Invalid date format. Please use yyyy-mm-dd format.'
            });
        }
        const url = `https://www.kayak.com/flights/${from}-${to}/${formattedDate}?sort=price_a`;
        const page = await browser.newPage();
        await page.setRequestInterception(true);
        page.on('request', (request) => {
            const resourceType = request.resourceType();
            if (['image', 'stylesheet', 'font'].includes(resourceType)) {
                request.abort();
            }
            else {
                request.continue();
            }
        });
        await page.goto(url, { waitUntil: 'networkidle2' });
        await page.waitForSelector('.nrc6-inner');
        const flights = await page.$$eval('.nrc6-inner', (flightElements) => {
            return flightElements
                .map((flight) => {
                const airlineElement = flight.querySelector('img');
                const airlineName = airlineElement ? airlineElement.getAttribute('alt') : null;
                const times = flight.querySelectorAll('.vmXl');
                const timeText = times.length > 0 ? times[0].textContent?.replace('\u2013', '-').replace('\n+1', ' (+1)') : null;
                const priceElement = flight.querySelector('.f8F1-price-text');
                const price = priceElement ? priceElement.textContent : null;
                if (airlineName && timeText && price) {
                    return {
                        airline: airlineName,
                        departure_time: timeText,
                        price: price
                    };
                }
                return null;
            })
                .filter((flight) => flight !== null);
        });
        // await page.close();
        res.json({ flights });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unknown error occurred.' });
        }
    }
});
app.listen(PORT, async () => {
    await initializeBrowser();
    console.log(`Server is running on http://localhost:${PORT}`);
});
process.on('exit', async () => {
    if (browser) {
        await browser.close();
    }
});
