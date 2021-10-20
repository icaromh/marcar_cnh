import dotenv from 'dotenv';
dotenv.config()

const { GOV_USER, GOV_PASSWORD, GOV_PROCESS_ID } = process.env

// const LOGIN_URL = "https://ec-lisboa.itamaraty.gov.br/login"
const PROCESS_URL = `https://ec-lisboa.itamaraty.gov.br/process?id=${GOV_PROCESS_ID}`

async function isLoggedIn(page) {
    await page.waitForSelector('h2.title');

    const title = await page.evaluate(() => {
        return document.querySelector('h2.title').innerText
    })
    return title === "Agendamento"
}

/**
 * Check on the page for the alert-primary element.
 * This element shows a message "Não há horário disponíveis[...]"
 * meaning the schedule is not available at the moment.
 */
async function checkAvailability(page) {
    await page.waitForSelector('.alert.alert-info');
    const availability = await page.evaluate(() => {
        const alertEl = document.querySelector('.alert.alert-primary')
        if (alertEl) return false
        return true;
    })

    return availability
}

async function login(page) {
    await page.goto(PROCESS_URL, {
        waitUntil: "networkidle2",
    });

    const isUserLoggedIn = await isLoggedIn(page);

    if (isUserLoggedIn) return;

    await page.waitForSelector("form");
    await page.type("#email-input", GOV_USER);
    await page.waitForTimeout(200);

    await page.type("#pass-input", GOV_PASSWORD);
    await page.waitForTimeout(200);

    await page.click("[type='submit']");

    await page.waitForTimeout(3000);

    await page.goto(PROCESS_URL, {
        waitUntil: "networkidle2",
    });
}

export default {
    login,
    checkAvailability
}