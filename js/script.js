//Get UI Element
let form = document.querySelector('#book-form');
let booklist = document.querySelector('#book-list');



//Book class
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//UI Class
class UI {
    static addToBooklist(book) {
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href='#' class="delete">X</a></td>`;
        booklist.appendChild(row);
        //console.log(row);
    }
    static clearField() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
    static showAlert(message, className) {
        let div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        //console.log(div);
        let container = document.querySelector('.container');
        container.insertBefore(div, form);
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }
    static deleteFromBook(target){
        if(target.hasAttribute('href'))
        {
            target.parentElement.parentElement.remove();

            Store.removeBook(target.parentElement.previousElementSibling.textContent.trim());

            UI.showAlert('Book Deleted!', 'success');
        }
    }
}

//Store class
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') == null){
            books=[];
        }else{
            books=JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book){
        let books = Store.getBooks();
        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static displayBook(){
        let books = this.getBooks();

        books.forEach(book => {
            UI.addToBooklist(book);
        });
    }

    static removeBook(isbn){
        let books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.isbn === isbn)
            {
                books.splice(index, 1);
            }
        })

        localStorage.setItem('books', JSON.stringify(books));
    }
}
//Add event listener
form.addEventListener('submit', newBook);
booklist.addEventListener('click', removeBook);
document.addEventListener('DOMContentLoaded', Store.displayBook());


//Define function
function newBook(e) {
    let title = document.querySelector('#title').value,
        author = document.querySelector('#author').value,
        isbn = document.querySelector('#isbn').value;

    let book = new Book(title, author, isbn);

    if (title == '' || author == '' || isbn == '') {
        UI.showAlert('Please fill up all field!!', 'error');
    } else {
        UI.addToBooklist(book);
        UI.clearField();
        UI.showAlert('Book Added Successfully!!', 'success');
    }
    //console.log(book);
    Store.addBook(book);

    e.preventDefault();
}

function removeBook(e) {
    UI.deleteFromBook(e.target);
    //console.log('button working');
    e.preventDefault();
}
