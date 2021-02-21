//Get UI Element
let form = document.querySelector('#book-form');



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
    addToBooklist(book) {
        let list = document.querySelector('#book-list');
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href='#' class="delete">X</a></td>`;
        list.appendChild(row);
        //console.log(row);
    }

    clearField() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
    showAlert(message, className) {
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
}

//Add event listener
form.addEventListener('submit', newBook);

//Define function
function newBook(e) {
    let title = document.querySelector('#title').value,
        author = document.querySelector('#author').value,
        isbn = document.querySelector('#isbn').value;

    let book = new Book(title, author, isbn);
    let ui = new UI(book);

    if (title == '' || author == '' || isbn == '') {
        ui.showAlert('Please fill up all field!!', 'error');
    } else {
        ui.addToBooklist(book);
        ui.clearField();
        ui.showAlert('Book Added Successfully!!', 'success');
    }
    //console.log(book);
    e.preventDefault();
}
