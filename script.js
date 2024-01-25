const mainButton = document.getElementsByClassName("main-btn")[0];
function login(){
    window.location.href= "homepage.html#addBookForm"
}

let SignoutBtn = document.getElementById('signoutbutton');
let Signout = () =>{
if (sessionStorage.getItem("user-creds")) {
  sessionStorage.removeItem("user-creds");
  sessionStorage.removeItem("user-info");
  alert("Sign Out Successfully!");
} else {
  alert("You are not currently logged in.");
}
}


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, onChildAdded,  } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const appSettings = {
  databaseURL: "https://login-auth-206f9-default-rtdb.firebaseio.com"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const booksInDB = ref(database, "list");

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('addBookForm');
  const bookList = document.getElementById('bookList');

  // Function to render a book item
  function renderBook(book) {
    const listItem = document.createElement('li');
    listItem.className = 'bookCard';
    listItem.innerHTML = `
      <img class="bookImage" src="${book.imageUrl}" alt="${book.name}"><br>
      <strong>${book.name}</strong><br>
      by ${book.author}<br>
      Price: ${book.price}<br>
      Category: ${book.category}
    `;
    bookList.appendChild(listItem);
  }

  onChildAdded(booksInDB, (snapshot) => {
    const book = snapshot.val();
    renderBook(book);
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const bookName = document.getElementById('bookName').value;
    const bookPrice = document.getElementById('bookPrice').value;
    const bookAuthor = document.getElementById('bookAuthor').value;
    const bookImageUrl = document.getElementById('bookImageUrl').value;
    const bookCategory = document.getElementById('bookCategory').value;

    // Validate input
    if (!bookName || !bookPrice || !bookAuthor || !bookImageUrl || !bookCategory) {
      alert('Please fill in all fields');
      return;
    }

    push(booksInDB, {
      name: bookName,
      price: bookPrice,
      author: bookAuthor,
      imageUrl: bookImageUrl,
      category: bookCategory,
    })
    .then(() => {
      console.log('Book added successfully');

      // Clear the form fields
      form.reset();
    })
    .catch((error) => {
      console.error('Error adding book: ', error);
    });
  });
});

SignoutBtn.addEventListener('click', Signout);
mainButton.addEventListener("click", login);





