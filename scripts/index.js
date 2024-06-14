const gridDOM = document.querySelector('.grid');
const newBookButtonDOM = document.querySelector('.new-book');
const dialogDOM = document.querySelector('dialog');
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
        <h1 class="title-text" title="Title: ${title}">${title}</h1>
        <p class="author-text" title="Author: ${author}">by <span class="underline">${author}</span></p>
        <p class="pages-text"><span class="number-of-pages">${pages}</span> pages</p>
        <p class="read-status">${read ? 'read' : 'not read'}</p>
        <div class="buttons">
          <button class="delete-book">Delete</button>
          <button class="read-book">Read</button>
        </div>
      </div>
    `;
  newCardDOM.classList.add('card');
  newCardDOM.dataset.index = library.length - 1;
  gridDOM.insertBefore(newCardDOM, newBookButtonDOM);
  const deleteBookButtonDOM = newCardDOM.querySelector('.delete-book');
  const readBookButtonDOM = newCardDOM.querySelector('.read-book');
  const readStatus = newCardDOM.querySelector('.read-status');

  deleteBookButtonDOM.addEventListener('click', (e) => {
    e.preventDefault();
    library.splice(newCardDOM.dataset.index, 1);
    newCardDOM.remove();
  });

  readBookButtonDOM.addEventListener('click', (e) => {
    e.preventDefault();
    library[newCardDOM.dataset.index].read = !library[newCardDOM.dataset.index].read;
    readStatus.textContent = library[newCardDOM.dataset.index].read ? 'read' : 'not read';
  })
}

newBookButtonDOM.addEventListener('click', (e) => {
  e.preventDefault();
  inputNameDOM.value = '';
  inputAuthorDOM.value = '';
  inputPagesDOM.value = '';
  dialogDOM.showModal();
});

submitFormButtonDOM.addEventListener('click', (e) => {
  e.preventDefault();
  if(inputNameDOM.value && inputAuthorDOM.value && inputPagesDOM.value && !isNaN(+inputPagesDOM.value) && inputNameDOM.value.length <= 50 && inputAuthorDOM.value.length <= 50 && inputPagesDOM.value.length <= 5) {
    addBook(inputNameDOM.value, inputAuthorDOM.value, +inputPagesDOM.value, false);
    dialogDOM.close();
  }
});