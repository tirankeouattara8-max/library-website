// Initial book data
let books = [
  { title: "JavaScript Basics", author: "John Doe", category: "IT", copies: 3 },
  { title: "Business Strategy", author: "Jane Smith", category: "Business", copies: 5 },
  { title: "Physics Fundamentals", author: "Albert Newton", category: "Science", copies: 2 },
  { title: "Modern Art", author: "Emily Rose", category: "Arts", copies: 4 },
  { title: "Web Development", author: "Mark Lee", category: "IT", copies: 6 },
  { title: "Economics 101", author: "David Kim", category: "Business", copies: 1 }
];

const bookList = document.getElementById("bookList");
const searchBox = document.getElementById("searchBox");
const categoryFilter = document.getElementById("categoryFilter");
const addBookForm = document.getElementById("addBookForm");
const errorMsg = document.getElementById("errorMsg");

// Render books
function renderBooks() {
  bookList.innerHTML = "";
  let searchTerm = searchBox.value.toLowerCase();
  let category = categoryFilter.value;

  books.forEach((book, index) => {
    if (
      book.title.toLowerCase().includes(searchTerm) &&
      (category === "all" || book.category === category)
    ) {
      const card = document.createElement("div");
      card.className = "book-card";
      card.innerHTML = `
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Category:</strong> ${book.category}</p>
        <p><strong>Copies:</strong> ${book.copies > 0 ? book.copies : "Out of stock"}</p>
        <button ${book.copies === 0 ? "disabled" : ""} onclick="borrowBook(${index})">
          ${book.copies === 0 ? "Unavailable" : "Borrow"}
        </button>
      `;
      bookList.appendChild(card);
    }
  });
}

// Borrow book
function borrowBook(index) {
  if (books[index].copies > 0) {
    books[index].copies--;
    renderBooks();
  }
}

// Add book
addBookForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const category = document.getElementById("category").value;
  const copies = parseInt(document.getElementById("copies").value);

  if (!title || !author || isNaN(copies) || copies < 0) {
    errorMsg.textContent = "Please fill all fields correctly.";
    return;
  }

  books.push({ title, author, category, copies });
  addBookForm.reset();
  errorMsg.textContent = "";
  renderBooks();
});

// Event listeners
searchBox.addEventListener("input", renderBooks);
categoryFilter.addEventListener("change", renderBooks);

// Initial render
renderBooks();