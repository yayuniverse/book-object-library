const addBookBtn = document.querySelector("button");
const titleField = document.querySelector("#title");
const authorField = document.querySelector("#author");
const publishedField = document.querySelector("#year-published");
const readField = document.querySelector("#read");
const bookShelf = document.querySelector(".bookshelf");
const checkmark = `<svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.30688 30.3671L13.5646 39.3426C14.9189 40.5278 16.9854 40.3556 18.125 38.9628L44.6933 6.49036"
              stroke="#F5F5F5"
              stroke-width="6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>`;

const bookLibrary = [];

function Book(title, author, published, read) {
  this.title = title;
  this.author = author;
  this.published = published;
  this.read = read;
}

Book.prototype.toggleReadState = function () {
  this.read = !this.read;
};

function createBookObject() {
  const newBook = new Book(
    titleField.value,
    authorField.value,
    publishedField.value,
    readField.checked
  );

  bookLibrary.push(newBook);
}

function updateHTML() {
  const book = document.createElement("div");
  book.classList.add("book");
  bookShelf.appendChild(book);

  const bookReadStatus = document.createElement("p");
  bookReadStatus.classList.add("read-tag");
  bookReadStatus.innerHTML = checkmark;
  book.appendChild(bookReadStatus);

  book.innerHTML += `<svg class="delete-btn" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.89844 12.8575H43.1013" stroke="black" stroke-width="3.43" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M9.67383 12.8575H38.326V41.5096C38.326 42.3539 37.9904 43.1638 37.3935 43.7607C36.7966 44.3577 35.9867 44.6932 35.1424 44.6932H12.8574C12.0131 44.6932 11.2033 44.3577 10.6063 43.7607C10.0092 43.1638 9.67383 42.3539 9.67383 41.5096V12.8575Z" stroke="black" stroke-width="3.43" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M16.041 12.8575V11.2657C16.041 9.15488 16.8795 7.13048 18.3721 5.63789C19.8647 4.14531 21.8891 3.30679 23.9999 3.30679C26.1108 3.30679 28.1352 4.14531 29.6278 5.63789C31.1204 7.13048 31.9589 9.15488 31.9589 11.2657V12.8575" stroke="black" stroke-width="3.43" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M19.2246 22.4129V35.1521" stroke="black" stroke-width="3.43" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M28.7754 22.4129V35.1521" stroke="black" stroke-width="3.43" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>`;

  const bookTitle = document.createElement("h4");
  book.appendChild(bookTitle);

  const bookAuthor = document.createElement("p");
  bookAuthor.classList.add("subtitle");
  book.appendChild(bookAuthor);

  const bookPublished = document.createElement("p");
  bookPublished.classList.add("subtitle");
  book.appendChild(bookPublished);
}

function updateLibrary() {
  bookShelf.replaceChildren();

  for (const item of bookLibrary) {
    updateHTML();
    const bookElement = bookShelf.lastElementChild;
    console.log(bookElement);
    bookElement.querySelector("h4").textContent = item.title;
    bookElement.querySelectorAll("p")[1].textContent = item.author;
    bookElement.querySelectorAll("p")[2].textContent = item.published;
    bookElement.querySelector(".delete-btn").dataset.title = item.title;
    bookElement.querySelector(".delete-btn").dataset.author = item.author;
    bookElement.querySelector(".delete-btn").dataset.published = item.published;
    if (item.read === true) {
      bookElement.querySelector(".read-tag").innerHTML = checkmark;
      bookElement.querySelector(".read-tag").innerHTML += `Read`;
    } else {
      bookElement.querySelector(".read-tag").textContent = "Unread";
    }
  }
}

function emptyFormFields() {
  titleField.value = "";
  authorField.value = "";
  publishedField.value = "";
  readField.checked = false;
}

function deleteBook(e) {
  const deleteBtn = e.target.closest(".delete-btn");

  for (const item of bookLibrary) {
    if (
      deleteBtn.dataset.title === item.title &&
      deleteBtn.dataset.author === item.author &&
      deleteBtn.dataset.published === item.published
    ) {
      bookLibrary.splice(bookLibrary.indexOf(item), 1);
    }
  }
}

addBookBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (!titleField.value || !authorField.value || !publishedField.value) {
    alert("Please fill out all fields");
    return;
  }

  createBookObject();
  emptyFormFields();
  updateLibrary();
});

bookShelf.addEventListener("click", (e) => {
  if (e.target.closest(".delete-btn")) {
    deleteBook(e);
  }
  updateLibrary();
  console.log(e.target);
});
