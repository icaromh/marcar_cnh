import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';

dotenv.config()

const { 
    TELEGRAM_BOT_TOKEN, 
    TELEGRAM_CHAT_ID 
} = process.env;

async function notify(message) {
    const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false });
    
    await bot.sendPhoto(TELEGRAM_CHAT_ID, './image.png', {
        caption: message,
        parse_mode: "HTML"
    })
}

export default notify