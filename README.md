# Odin Library
## About
This webpage allows you to store information about books in a library. It features:
- A minimalist design that works on mobile
- Data about a book's title, author, number of pages and whether the user has read the book or not.
- A grid of cards to display the books in the library.
- Controls for changing the status of books and for removing books.
- The user can see the full title and author of book items when hovering over their position (the `title` attribute was used).
- The form for adding books features HTML form validation.
## What I learned
The icon displaying the status of whether the book has been read or not changes using only CSS:
```css
.read-icon:has(~ .read-status[data-read="true"]) {
  background-image: url('../images/read.svg');
}

.read-icon:has(~ .read-status[data-read="false"]) {
  background-image: url('../images/not-read.svg');
}
```
Actions on specific cards are handled by referencing each card's index in the global `library` array, stored in each card's dataset, as seen here:
```js
deleteBookButtonDOM.addEventListener('click', () => {
  let index = newCardDOM.dataset.index;
  library.splice(index, 1);
  newCardDOM.remove();
});
```
This code ensures form validation messages still appear but prevents the page from being refreshed, by only calling the `e.preventDefault();` instruction when the form is valid.
```js
submitFormButtonDOM.addEventListener('click', (e) => {
  if(formDOM.checkValidity()) {
    e.preventDefault();
    addBook(inputNameDOM.value, inputAuthorDOM.value, +inputPagesDOM.value, false);
    dialogDOM.close();
  }
});
```