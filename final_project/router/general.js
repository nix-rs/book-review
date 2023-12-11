const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    if(username && password) {
        if(!isValid(username)) {
            users.push({
                "username": username,
                "password": password 
            });
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exist!"});
        }
    }

    return res.status(404).json({message: "Unable to register User."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    const key = Object.keys(books);
    for (let v = 0; v < key.length; v++) {
        if (books[key[v]]['author'] === author) {
            return res.send(books[v]);
        } else {
            return res.send("Unable to Find the Book author");
        }
    }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    const key = Object.keys(books);
    for (let v = 0; v < key.length; v++) {
        if (books[v]['title'] === title) {
            return res.send(books[v]);
        } else {
            return res.send("Unable to Find the Book title");
        }
    }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const review = req.params.isbn;
    res.send(books[review]['reviews'])
});

module.exports.general = public_users;

