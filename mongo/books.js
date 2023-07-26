const BookModel = require('../models/book.js');

const addBook = async (date) => {
    const checkBook = await BookModel.find({ id: date.product.id });
    if (checkBook.length === 0) {
        console.log('New book')
        const book = await new BookModel(date.product);
        await book.save();
        return BookModel.find();
    } else {
        console.log('Correct book')
        await updateBook(date.product);
        return BookModel.find();
    }
}

const getAllBooks = async () => {
    console.log('getAllBooks')
    return BookModel.find();
}

const getBook = async (id) => {
    console.log('getBook')
    const book = await BookModel.findOne({ _id: `${id}` });
    return book;
}

const deleteBook = async (id) => {
    console.log('deleteBook ' + id);
    await BookModel.deleteOne({ id: `${id}` });
    return BookModel.find();
}

const updateBook = async (book) => {
    console.log('updateBook' + book.id)
    await BookModel.updateOne(
        { id: `${book.id}` },
        {
            $set: {
                url: book.url,
                name: book.name,
                description: book.description,
                price: book.price,
                imageUrls: book.imageUrls
            }
        });
}

module.exports = {
    addBook,
    getAllBooks,
    getBook,
    deleteBook,
    updateBook
}