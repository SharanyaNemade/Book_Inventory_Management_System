import { useState, useEffect } from "react";
import BookTable from "../components/BookTable";
import BookForm from "../components/BookForm";
import { getBooks, addBook, updateBook, deleteBook as deleteBookAPI } from "../services/BookService";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editBook, setEditBook] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch books from API on component mount
  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      setLoading(true);
      const response = await getBooks();
      setBooks(response.data || []);
    } catch (error) {
      console.error("Error loading books:", error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const saveBook = async (book) => {
    try {
      if (book.id) {
        // EDIT - remove id from the book object before sending
        const { id, ...bookData } = book;
        await updateBook(id, bookData);
      } else {
        // CREATE - don't send id, let server generate it
        const { id, ...bookData } = book;
        await addBook(bookData);
      }
      await loadBooks(); // Reload books from API
      setShowForm(false);
      setEditBook(null);
    } catch (error) {
      console.error("Error saving book:", error);
      const errorMessage = error.response?.data?.message || error.message || "Unknown error";
      alert(`Failed to save book: ${errorMessage}. Please check if the API server is running on http://localhost:3000`);
    }
  };

  const deleteBook = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await deleteBookAPI(id);
        await loadBooks(); // Reload books from API
      } catch (error) {
        console.error("Error deleting book:", error);
        alert("Failed to delete book. Please try again.");
      }
    }
  };

  return (
    <div className="container mt-4" style={{ minHeight: "100vh" }}>
      <h2 className="mb-4">Book Inventory</h2>

      <button
        className="btn btn-primary mb-3"
        onClick={() => {
          setEditBook(null);
          setShowForm(true);
        }}
      >
        Add Book
      </button>

      {showForm && (
        <BookForm
          book={editBook}
          onSubmit={saveBook}
          onCancel={() => {
            setShowForm(false);
            setEditBook(null);
          }}
        />
      )}

      {loading ? (
        <div className="text-center mt-4">
          <p>Loading books...</p>
        </div>
      ) : (
        <BookTable
          books={books}
          onDelete={deleteBook}
          onEdit={(book) => {
            setEditBook(book);
            setShowForm(true);
          }}
        />
      )}
    </div>
  );
}
