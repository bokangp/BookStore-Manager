//Book class /Constructor
class Book {
    constructor(author, email, title, publisher, pdate, isbn) {
        this.author = author,
            this.email = email,
            this.title = title,
            this.publisher = publisher,
            this.pdate = pdate,
            this.isbn = isbn;
    }
}

//User Interface constructor
class UI {
    constructor() { }
    //method to add the book to the table
    addBook(book) {
        const table = document.querySelector('.book-list');
        //create a table row (tr)
        const row = document.createElement('tr');
        //insert the columns
        row.innerHTML = `
        <td>${book.author}</td>
        <td>${book.email}</td>
        <td>${book.title}</td>
        <td>${book.publisher}</td>
        <td>${book.pdate}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class = "del">&times</a></td>
    `;
        table.appendChild(row);
    }
    //Method for the alerts
    Toasts(msg, className) {
        //create a div
        const div = document.createElement('div');
        //add a class to the div
        div.className = `alert ${className}`;
        //add text
        div.appendChild(document.createTextNode(msg));
        //get the parent
        const container = document.querySelector('.container');
        //get form
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        //set timeout function
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }
    //Method to clear the fields
    clearFields() {
        document.querySelector('#author').Value = '';
        document.querySelector('#email').Value = '';
        document.querySelector('#title').Value = '';
        document.querySelector('#publisher').Value = '';
        document.querySelector('#pdate').Value = '';
        document.querySelector('#isbn').Value = '';
    }
    //delete the book from table
    deleteBook(target) {
        if (target.className === 'del') {
            target.parentElement.parentElement.remove();
        }

    }
}


//Inheritance

;
//Local storage contructor / class
class Store {
    constructor() {
        Object.create(UI.prototype);
     }
    //Method to get the books from the localstorage
    getBooks() {
        let books;
        //check if we have any books stored in the localStorage
        if (localStorage.getItem('books') === null)
            books = [];

        else
            books = JSON.parse(localStorage.getItem('books'));
        return books;
    }
    //Method to add books
    addBook(book) {
        const books = this.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    //get the books from the localStorage and print them in the table
    Data() {
        const books = this.getBooks();
        books.forEach(function (book) {
            let ui = new UI();
            ui.addBook(book);
        });
    }
    //Method to remove  the book from the localStorage
    removeBook(id) {
        const books = this.getBooks();
        books.forEach((book, index) => {
            if (book.isbn === id) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}


let s = new Store();
s.Data();
//Event listeners
const form = document.querySelector('#book-form');
form.addEventListener('submit',(e)=>{
    //get the values from the form input
    const author = document.querySelector('#author').value;
    const email = document.querySelector('#email').value;
    const title = document.querySelector('#title').value;
    const publisher = document.querySelector('#publisher').value;
    const pdate = document.querySelector('#pdate').value;
    const isbn = document.querySelector('#isbn').value;


    //create an object of the book constructor / class
    const book = new Book(author, email, title, publisher, pdate, isbn);
    // console.log(book);
    //create an object of the user interface & LocalStorage
    const ui = new UI();
    const ls = new Store;
    if(author === '' || email === '' || title === '' || publisher === '' || isbn ===''){
        ui.Toasts('Please fill in all the required fields', 'alert-danger')
    }else{
        ui.addBook(book);
        ls.addBook(book);
        ui.Toasts('Book saved successfully', 'alert-success');
        ui.clearFields();
    }
    

    e.preventDefault();
})

//Event listener for the table
document.querySelector('.book-list').addEventListener('click', (e)=>{
    const ui = new UI();
    const ls = new Store();
    ui.deleteBook(e.target);
    ls.removeBook(e.target.parentElement.previousElementSibling.textContent);
    ui.Toasts('book has been deleted', 'alert-info');
    e.preventDefault()
})