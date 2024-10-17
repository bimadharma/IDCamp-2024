const bookForm = document.getElementById('bookForm');
const incompleteBookList = document.getElementById('incompleteBookList');
const completeBookList = document.getElementById('completeBookList');

// Function to generate unique ID using timestamp
const generateId = () => new Date().getTime();

// Function to save books to localStorage
const saveBooks = (books) => {
    localStorage.setItem('books', JSON.stringify(books));
};

// Function to load books from localStorage
const loadBooks = () => {
    const books = localStorage.getItem('books');
    return books ? JSON.parse(books) : [];
};

// Function to display books
const displayBooks = () => {
    const books = loadBooks();
    incompleteBookList.innerHTML = '';
    completeBookList.innerHTML = '';

    books.forEach((book) => {
        const bookElement = createBookElement(book);
        if (book.isComplete) {
            completeBookList.append(bookElement);
        } else {
            incompleteBookList.append(bookElement);
        }
    });
};

// Function to create a book element
const createBookElement = (book) => {
    const bookItem = document.createElement('div');
    bookItem.setAttribute('data-bookid', book.id);
    bookItem.setAttribute('data-testid', 'bookItem');

    const completeButtonText = book.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca';

    bookItem.innerHTML = `
        <h3 data-testid="bookItemTitle">${book.title}</h3>
        <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
        <p data-testid="bookItemYear">Tahun: ${book.year}</p>
        <div>
            <button class="complete-button" data-testid="bookItemIsCompleteButton">${completeButtonText}</button>
            <button class="delete-button" data-testid="bookItemDeleteButton">Hapus Buku</button>
            <button class="edit-button" data-testid="bookItemEditButton">Edit Buku</button>
        </div>
    `;

    // Event listeners for buttons
    bookItem.querySelector('.complete-button').addEventListener('click', () => {
        if (book.isComplete) {
            moveToIncomplete(book.id);
        } else {
            moveToComplete(book.id);
        }
    });
    bookItem.querySelector('.delete-button').addEventListener('click', () => deleteBook(book.id));
    bookItem.querySelector('.edit-button').addEventListener('click', () => editBook(book.id));

    return bookItem;
};

// Function to add a new book
bookForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('bookFormTitle').value;
    const author = document.getElementById('bookFormAuthor').value;
    const year = parseInt(document.getElementById('bookFormYear').value);
    const isComplete = document.getElementById('bookFormIsComplete').checked;

    const newBook = {
        id: generateId(),
        title,
        author,
        year,
        isComplete,
    };

    const books = loadBooks();
    books.push(newBook);
    saveBooks(books);
    displayBooks();

    // Clear form fields
    bookForm.reset();
});

// Function to move a book to "Selesai dibaca"
const moveToComplete = (id) => {
    const books = loadBooks();
    const bookIndex = books.findIndex((book) => book.id === id);

    if (bookIndex > -1) {
        books[bookIndex].isComplete = true;
        saveBooks(books);
        displayBooks();
    }
};

// Function to move a book back to "Belum selesai dibaca"
const moveToIncomplete = (id) => {
    const books = loadBooks();
    const bookIndex = books.findIndex((book) => book.id === id);

    if (bookIndex > -1) {
        books[bookIndex].isComplete = false;
        saveBooks(books);
        displayBooks();
    }
};

// Function to delete a book
const deleteBook = (id) => {
    const books = loadBooks();
    const filteredBooks = books.filter((book) => book.id !== id);
    saveBooks(filteredBooks);
    displayBooks();
};

// Function to edit a book
const editBook = (id) => {
    const books = loadBooks();
    const book = books.find((book) => book.id === id);

    if (book) {
        // Populate the form with existing book data
        document.getElementById('bookFormTitle').value = book.title;
        document.getElementById('bookFormAuthor').value = book.author;
        document.getElementById('bookFormYear').value = book.year;
        document.getElementById('bookFormIsComplete').checked = book.isComplete;

        // Remove the book from the list before editing
        deleteBook(id);
    }
};

// Function to search for a book by title
const searchBooks = (title) => {
    const books = loadBooks();
    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(title.toLowerCase())
    );

    incompleteBookList.innerHTML = '';
    completeBookList.innerHTML = '';

    filteredBooks.forEach((book) => {
        const bookElement = createBookElement(book);
        if (book.isComplete) {
            completeBookList.append(bookElement);
        } else {
            incompleteBookList.append(bookElement);
        }
    });
};

// Event listener for the search form
document.getElementById('searchBook').addEventListener('submit', (event) => {
    event.preventDefault();
    const searchTitle = document.getElementById('searchBookTitle').value;
    searchBooks(searchTitle);

    // Clear the search input after submitting
    document.getElementById('searchBookTitle').value = '';
});


// Initial load of books
displayBooks();
