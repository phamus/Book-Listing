//book class
class BOOK{
  constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

//ui class
class UI{
    addBookToList(book){
      const list = document.getElementById("book-list");

      //create a tr
      const row  = document.createElement('tr');
      row.innerHTML = 
      `<td>${book.title} </td>
      <td>${book.author} </td>
      <td>${book.isbn} </td>
      <td><a href ='#' class='delete'>x</a></td>
      `
    
      list.appendChild(row)
    }

    //show alert
    alertMessage(message,className){
      //create the div
      const div = document.createElement('div');

      // add class to div
      div.className = `alert ${className}`;

      //append textnode
      div.appendChild(document.createTextNode(message));

      //get parent
      const container  = document.querySelector(".container");

      const form = document.getElementById('book-form');
      container.insertBefore(div, form);

      //timeout
      setTimeout(function(){
        document.querySelector('.alert').remove();
      },3000);
    }

    //clear fields
    clearFields(){
      document.getElementById('title').value = ``;
      document.getElementById('author').value = ``;
      document.getElementById('isbn').value = ``;
    }

    //delete list item
    deleteBook(target){
      if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
      }
    }
}

//local storage class
class storage{
  static getBooks(){
    let books;
    if(localStorage.getItem('books') === null){
      books = [];
    }else{
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;

  }
  static displayBooks(){
    const books = storage.getBooks();

    books.forEach(function(book){
      const ui = new UI();

      ui.addBookToList(book)
    })

  }
  static addBook(book){
    const books  = storage.getBooks();

    books.push(book);

    localStorage.setItem('books',JSON.stringify(books));

  }

  static removeBook(isbn) {
    const books = storage.getBooks();

    books.forEach(function(book, index){
     if(book.isbn === isbn) {
      books.splice(index, 1);
     }
    });

    localStorage.setItem('books', JSON.stringify(books));

  }
}

//display book from storage onload
document.addEventListener('DOMContentLoaded',storage.displayBooks);


//ui Element
document.getElementById("book-form").addEventListener('submit', function(e){
  
  //getting form values
  const title  = document.getElementById('title').value;
  const author  = document.getElementById('author').value;
  const isbn  = document.getElementById('isbn').value;

  //instantiating the book 
  const book = new BOOK(title,author,isbn)

  //instantiate the ui
  const ui = new UI();

  //validate the input
  if(title === '' || author === '' || isbn === ''){
    ui.alertMessage('please fill in all fields', 'error');
  }else{
    //adding book to list
    ui.addBookToList(book);

    //add to local storage
    storage.addBook(book);

    //show success alert
    ui.alertMessage('Book Added !', 'success')
    //clear fields
    ui.clearFields();
  }
  e.preventDefault();
})

// event listener for delete
document.getElementById('book-list').addEventListener('click',function(e){

  const ui = new UI();
  ui.deleteBook(e.target);

  //show remove message
  ui.alertMessage('Book Deleted!!', 'success');

  //remove from storage
  storage.removeBook(e.target.parentElement.previousElementSibling.textContent);

  e.preventDefault();
})


