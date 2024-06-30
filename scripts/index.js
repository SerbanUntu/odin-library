const gridDOM = document.querySelector('.grid')
const newBookButtonDOM = document.querySelector('.new-book')
const dialogDOM = document.querySelector('dialog')
const formDOM = document.querySelector('form')
const submitFormButtonDOM = document.querySelector('.submit-form')
const inputNameDOM = document.querySelector('input.book-name')
const inputAuthorDOM = document.querySelector('input.book-author')
const inputPagesDOM = document.querySelector('input.book-pages')

const library = []

function Book(title, author, pages, read) {
	this.title = title
	this.author = author
	this.pages = pages
	this.read = read
}

function addBook(title, author, pages, read) {
	let newBook = new Book(title, author, pages, read)
	library.push(newBook)
	const newCardDOM = document.createElement('div')
	newCardDOM.innerHTML = `
      <img class="cover-img" src="./images/book.png" alt="Book cover art placeholder">
      <div class="card-content">
        <h2 class="title-text" title="Title: ${title}">${title}</h2>
        <p class="author-text" title="Author: ${author}">
					by <span class="underline">${author}</span>
				</p>
        <p class="pages-text" title="Number of pages: ${pages}">
					<span class="number-of-pages">${pages}</span> pages
				</p>
        <div class="read-section">
          <div class="read-icon"></div>
          <p class="read-status" data-read="${read}">You have not read this book yet</p>
        </div>
        <div class="buttons">
          <button class="delete-book" type="button">Delete</button>
          <button class="read-book" type="button">Read</button>
        </div>
      </div>
    `
	newCardDOM.classList.add('card')
	newCardDOM.dataset.index = library.length - 1
	gridDOM.insertBefore(newCardDOM, newBookButtonDOM)
	const deleteBookButtonDOM = newCardDOM.querySelector('.delete-book')
	const readBookButtonDOM = newCardDOM.querySelector('.read-book')
	const readStatusDOM = newCardDOM.querySelector('.read-status')

	deleteBookButtonDOM.addEventListener('click', () => {
		let index = newCardDOM.dataset.index
		library.splice(index, 1)
		newCardDOM.remove()
	})

	readBookButtonDOM.addEventListener('click', () => {
		let index = newCardDOM.dataset.index
		library[index].read = !library[index].read
		readStatusDOM.textContent = library[index].read
			? 'You have read this book'
			: 'You have not read this book yet'
		readStatusDOM.dataset.read = readStatusDOM.dataset.read === 'false' ? 'true' : 'false'
		readBookButtonDOM.textContent = library[index].read ? 'Unread' : 'Read'
	})
}

function validateName() {
	inputNameDOM.setCustomValidity('')
	if (!inputNameDOM.checkValidity()) {
		inputNameDOM.classList.add('invalid')
		if (inputNameDOM.validity.valueMissing) {
			inputNameDOM.setCustomValidity('The book name must be specified')
		} else if (inputNameDOM.validity.tooLong) {
			inputNameDOM.setCustomValidity(
				`The book name is too long.
				The limit is ${inputNameDOM.maxLength} characters.
				You entered ${inputNameDOM.value.length}`,
			)
		}
	} else {
		inputNameDOM.classList.remove('invalid')
		inputNameDOM.setCustomValidity('')
	}
}

function validateAuthor() {
	inputAuthorDOM.setCustomValidity('')
	if (!inputAuthorDOM.checkValidity()) {
		inputAuthorDOM.classList.add('invalid')
		if (inputAuthorDOM.validity.valueMissing) {
			inputAuthorDOM.setCustomValidity('The author of the book must be specified')
		} else if (inputAuthorDOM.validity.tooLong) {
			inputAuthorDOM.setCustomValidity(
				`The author name is too long.
				The limit is ${inputAuthorDOM.maxLength} characters.
				You entered ${inputAuthorDOM.value.length}`,
			)
		}
	} else {
		inputAuthorDOM.classList.remove('invalid')
		inputAuthorDOM.setCustomValidity('')
	}
}

function validatePages() {
	inputPagesDOM.setCustomValidity('')
	if (!inputPagesDOM.checkValidity()) {
		inputPagesDOM.classList.add('invalid')
		if (inputPagesDOM.validity.valueMissing) {
			inputPagesDOM.setCustomValidity('The number of pages must be specified')
		} else if (inputPagesDOM.validity.rangeUnderflow) {
			inputPagesDOM.setCustomValidity(
				'The number of pages cannot be zero or negative. Please enter a positive integer',
			)
		} else if (inputPagesDOM.validity.rangeOverflow) {
			inputPagesDOM.setCustomValidity(
				'The number of pages cannot exceed 99999 (5 digits). Please enter a smaller number',
			)
		}
	} else {
		inputPagesDOM.classList.remove('invalid')
		inputPagesDOM.setCustomValidity('')
	}
}

function validate() {
	validateName()
	validateAuthor()
	validatePages()
}

newBookButtonDOM.addEventListener('click', e => {
	e.preventDefault()
	formDOM.reset()
	dialogDOM.showModal()
})

formDOM.addEventListener('submit', e => {
	e.preventDefault()
	addBook(inputNameDOM.value, inputAuthorDOM.value, Number(inputPagesDOM.value), false)
	dialogDOM.close()
	formDOM.reset()
})

submitFormButtonDOM.addEventListener('click', () => {
	validate()
})

inputNameDOM.addEventListener('input', e => {
	e.preventDefault()
	validateName()
})

inputAuthorDOM.addEventListener('input', e => {
	e.preventDefault()
	validateAuthor()
})

inputPagesDOM.addEventListener('input', e => {
	e.preventDefault()
	validatePages()
})
