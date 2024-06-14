const gridDOM = document.querySelector('.grid');
const newBookButtonDOM = document.querySelector('.new-book');
const dialogDOM = document.querySelector('dialog');
const formDOM = document.querySelector('form');
const submitFormButtonDOM = document.querySelector('.submit-form');
const inputNameDOM = document.querySelector('input.book-name');
const inputAuthorDOM = document.querySelector('input.book-author');
const inputPagesDOM = document.querySelector('input.book-pages');

const library = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBook(title, author, pages, read) {
  let newBook = new Book(title, author, pages, read);
  library.push(newBook);
  const newCardDOM = document.createElement('div');
  newCardDOM.innerHTML =
    `
      <img class="cover-img" src="./images/book.png" alt="Book cover art placeholder">
      <div class="card-content">
        <h2 class="title-text" title="Title: ${title}">${title}</h2>
        <p class="author-text" title="Author: ${author}">by <span class="underline">${author}</span></p>
        <p class="pages-text" title="Number of pages: ${pages}"><span class="number-of-pages">${pages}</span> pages</p>
        <div class="read-section">
          <div class="read-icon"></div>
          <p class="read-status" data-read="${read}">You have not read this book yet</p>
        </div>
        <div class="buttons">
          <button class="delete-book" type="button">Delete</button>
          <button class="read-book" type="button">Read</button>
        </div>
      </div>
    `;
  newCardDOM.classList.add('card');
  newCardDOM.dataset.index = library.length - 1;
  gridDOM.insertBefore(newCardDOM, newBookButtonDOM);
  const deleteBookButtonDOM = newCardDOM.querySelector('.delete-book');
  const readBookButtonDOM = newCardDOM.querySelector('.read-book');
  const readStatusDOM = newCardDOM.querySelector('.read-status');

  deleteBookButtonDOM.addEventListener('click', () => {
    let index = newCardDOM.dataset.index;
    library.splice(index, 1);
    newCardDOM.remove();
  });

  readBookButtonDOM.addEventListener('click', () => {
    let index = newCardDOM.dataset.index;
    library[index].read = !library[index].read;
    readStatusDOM.textContent = library[index].read ? 'You have read this book' : 'You have not read this book yet';
    readStatusDOM.dataset.read = readStatusDOM.dataset.read === 'false' ? 'true' : 'false';
    readBookButtonDOM.textContent = library[index].read ? 'Unread' : 'Read';
  });
}

newBookButtonDOM.addEventListener('click', (e) => {
  e.preventDefault();
  formDOM.reset();
  dialogDOM.showModal();
});

submitFormButtonDOM.addEventListener('click', (e) => {
  if(formDOM.checkValidity()) {
    e.preventDefault();
    addBook(inputNameDOM.value, inputAuthorDOM.value, +inputPagesDOM.value, false);
    dialogDOM.close();
  }
});