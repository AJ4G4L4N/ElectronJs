// THE PRELOAD FILE
const { contextBridge, ipcRenderer } = require("electron");

const Books = require("../../models/Books.js");

// ENV VARIABLES
const globals = {
//   URI: "mongodb://localhost:27017",
  URI: "mongodb+srv://admin:admin@cluster0.sj4w9bb.mongodb.net/?retryWrites=true&w=majority",
  DB_NAME: "bookstore",
};

// BOOKS DATBASE MODEL
const books = new Books(globals.URI, globals.DB_NAME);
let gotBookCallback;
let gotBookUpdatedCallback;
let gotDeletedResultCallback;

// FUNCTION TO GET BOOKS
let getBooks = () => {
  console.log(`mainPreload > getEmployees`);

  books.getBooks().then((res) => {
    gotBookCallback(res);
  });
};

let gotBooks = (callback) => {
  gotBookCallback = callback;
};

// FUNCITON TO SAVE BOOKS
let saveBook = (book) => {
  console.log(`mainPreload > book: ${book}`);
  return books.addBook(book);
};

// FUNCTION TO DELETE BOOKS
let deleteBook = (id) => {
  console.log(`mainPreload > Delete : ${id}`);

  books.deleteBook(id).then((res) => {
    gotDeletedResultCallback(res);
  });
};

let gotDeletedResult = (callback) => {
  gotDeletedResultCallback = callback;
};

// FUNCITON TO UPDATE BOOKS
let updateBook = (id, emp) => {
  console.log(`mainPreload > upDateEmployee : ${id}`);

  const book = {
    name: emp.name,
    author: emp.author,
    price: emp.price,
  };

  books.updateBook(id, book).then((res) => {
    gotBookUpdatedCallback(res);
  });
};

let gotBookUpdatedResult = (callback) => {
  gotBookUpdatedCallback = callback;
};

// EXPOSING THE API TO THE MAIN WORLD
contextBridge.exposeInMainWorld("api", {
  getBooks,
  gotBooks,
  saveBook,
  updateBook,
  gotBookUpdatedResult,
  gotDeletedResult,
  deleteBook,
});
