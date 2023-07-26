const express = require('express');
const path = require("path");
const {bot} = require("./bot");
const app = express();
const publicPath = path.join(__dirname, 'public');
const jsonParser = express.json();
const fs = require('fs');
const { connection } = require('./mongo/mongo.js');
const { addBook, getAllBooks, getBook, deleteBook } = require('./mongo/books.js');
const { addComment, getAllComments, getComment, deleteComment } = require('./mongo/comments.js');
const { addReting, getAllRetings, getReting, deleteReting } = require('./mongo/retings.js');

bot.launch();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

function loadingEffect() {
    const frames = ['- Loading.', '\\ Loading.', '| Loading.', '/ Loading.', '- Loading..', '\\ Loading..', '| Loading..', '/ Loading..', '- Loading...', '\\ Loading...', '| Loading...', '/ Loading...', '- Loading....', '\\ Loading....', '| Loading....', '/ Loading....'];
    let currentFrame = 0;

    function updateFrame() {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(frames[currentFrame]);

        currentFrame++;
        if (currentFrame === frames.length) {
            currentFrame = 0;
        }
    }

    const intervalId = setInterval(updateFrame, 100);

    setTimeout(() => {
        clearInterval(intervalId);
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write('Server is running on port 3000\n');
    }, 3000);
    app.listen(3000, () => {

    });
    connection();
}

loadingEffect();

app.use(express.static('public'))


app.use(express.json());
app.post('/cart/checkout', (req, res) => {

    const {order, chatId, contactInfo} = req.body;
    bot.telegram.sendMessage(chatId, 'New order');

    setTimeout(() => {
        bot.telegram.sendMessage(chatId, (Object.entries(contactInfo).map(([key, value]) => {
            return `${key} : ${value}`
        }).join('\n')));
    }, 50)

    setTimeout(() => {
        bot.telegram.sendMessage(chatId, order.reduce((accum, item) => {
            return accum + `name: ${item.name} - quantity: ${item.quantity} \n ------------------------- \n`
        },''));
    }, 100)


    const productListHTML = order.map((product) => {
        return `<li>${product.name} - Quantity: ${product.quantity}</li>`;
    }).join('');



    const responseHTML = `<ul>${productListHTML}</ul>`;
    res.status(200).json({
        message: 'Your order has been successfully received',
    });

})

app.post('/add-book', jsonParser, async (req, res) => {
    const result = await addBook(req.body);
    res.json(result);
})

app.post('/get-book', jsonParser, async (req, res) => {
    const { id } = req.body;
    const result = await getBook(id);
    res.json(result);
});

app.post('/delete-book', jsonParser, async (req, res) => {
    const { id } = req.body;
    deleteComment(id);
    deleteReting(id);
    const result = await deleteBook(id);
    res.json(result);
});

app.get('/active-page', (req, res) => {
    const { id } = req.query;
    res.end(id);
});

app.get('/home-page', async (req, res) => {
    const book = await getAllBooks();
    res.json(book);
});

app.get('/get-comment', async (req, res) => {
    const comment = await getAllComments();
    res.json(comment);
});

app.post('/add-comment', jsonParser, async (req, res) => {
    const result = await addComment(req.body);
    res.json(result);
});

app.post('/add-reting', jsonParser, async (req, res) => {
    const result = await addReting(req.body);
    res.json(result);
});

app.get('/get-reting', async (req, res) => {
    const reting = await getAllRetings();
    res.json(reting);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});