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

function createBookObject() {
  const newBook = new Book(
    titleField.value,
    authorField.value,
    publishedField.value,
    readField.checked
  );

  console.log(newBook);
  bookLibrary.push(newBook);
}

function updateHTML() {
  const book = document.createElement("div");
  book.classList.add("book");
  bookShelf.appendChild(book);

  const bookTitle = document.createElement("h4");
  book.appendChild(bookTitle);

  const bookAuthor = document.createElement("p");
  bookAuthor.classList.add("subtitle");
  book.appendChild(bookAuthor);

  const bookPublished = document.createElement("p");
  bookPublished.classList.add("subtitle");
  book.appendChild(bookPublished);

  const bookReadStatus = document.createElement("p");
  bookReadStatus.classList.add("read-tag");
  bookReadStatus.innerHTML = checkmark;
  book.appendChild(bookReadStatus);
}

function updateLibrary(bookLibrary) {
  bookShelf.replaceChildren();

  for (const item of bookLibrary) {
    updateHTML();
    const bookElement = bookShelf.lastElementChild;
    bookElement.querySelector("h4").textContent = item.title;
    bookElement.querySelectorAll("p")[0].textContent = item.author;
    bookElement.querySelectorAll("p")[1].textContent = item.published;
    bookElement.querySelector(".read-tag").textContent = "Unread";
  }
}

function emptyFormFields() {
  titleField.value = "";
  authorField.value = "";
  publishedField.value = "";
  readField.checked = false;
}

addBookBtn.addEventListener("click", (event) => {
  event.preventDefault();

  if (!titleField.value || !authorField.value || !publishedField.value) {
    alert("Please fill out all fields");
    return;
  }
  
  createBookObject();
  emptyFormFields();
  updateLibrary(bookLibrary);
});
