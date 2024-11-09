const addBookBtn = document.querySelector("button");
const titleField = document.querySelector("#title");
const authorField = document.querySelector("#author");
const publishedField = document.querySelector("#year-published");
const readField = document.querySelector("#read");

const bookLibrary = [];

function Book(title, author, published, read) {
  this.title = title;
  this.author = author;
  this.published = published;
  this.read = read;
}

addBookBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const newBook = new Book(
    titleField.value,
    authorField.value,
    publishedField.value,
    readField.checked
  );

  console.log(newBook);
  bookLibrary.push(newBook);

  titleField.value = "";
  authorField.value = "";
  publishedField.value = "";
  readField.checked = false;
});
