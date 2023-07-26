const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');
const WebSocket = require('ws');
const dotenv = require('dotenv').config()


const wss = new WebSocket.Server({ port: 8080 });
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
    chatId = ctx.update.message.chat.id;

    ctx.reply('Welcome');

    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ chatId: chatId }));
        }
    });
});


wss.on('connection', (ws) => {
    console.log('Новое соединение установлено');


    ws.on('close', () => {
        console.log('Соединение закрыто');
    });
});


module.exports ={
    bot,
}