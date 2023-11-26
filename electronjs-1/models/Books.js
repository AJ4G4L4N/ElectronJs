const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;

console.log("here")

class Books {
  dbName;
  client;

  constructor(uri, dbName) {
    this.uri = uri;
    this.dbName = dbName;
    this.client = new MongoClient(this.uri);
  }
  
  #getCollection = async () => {
    await this.client.connect();
    const db = this.client.db(this.dbName);
    const Books = db.collection("Books");
    return Books;
  };

  getBooks = async () => {
    console.log(`Books.js > getBooks`);

    const Books = await this.#getCollection();
    let res = await Books.find({}).toArray();

    res = res.map((book) => {
      return {
        id: book._id.toHexString(),
        name: book.name,
        author: book.author,
        price: book.price,
      };
    });
    console.log(res);
    return res;
  };

  addBook = async (book) => {
    console.log(`Employee.js > addEmployee: ${book}`);

    const Books = await this.#getCollection();
    return await Books.insertOne(book);
  };

  updateBook = async (id, book) => {
    console.log(`Employee.js > updateEmployee: ${book}`);
 
    const Books = await this.#getCollection();
    return await Books.updateOne({ _id: new ObjectId(id) }, { $set: book });
  };

  deleteBook = async (id) => {
    console.log(`Employee.js > deleteEmployee: ${id}`);

    const Books = await this.#getCollection();
    const res = await Books.deleteOne({ _id: new ObjectId(id) });
    return res.deletedCount > 0;
  };
}

module.exports = Books;