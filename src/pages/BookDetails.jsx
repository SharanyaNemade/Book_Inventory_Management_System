import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBookById } from "../services/BookService";

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const response = await getBookById(id);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book:", error);
        setBook(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBook();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container mt-4">
        <p>Loading book details...</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container mt-4">
        <p>Book not found!</p>
        <button className="btn btn-secondary mt-2" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4" style={{ minHeight: "100vh" }}>
      <h2 className="mb-4">Book Details</h2>
      <div className="card p-4" style={{ maxHeight: "80vh", overflowY: "auto" }}>
        <div className="mb-3">
          <strong>Title:</strong> {book.title}
        </div>
        <div className="mb-3">
          <strong>Author:</strong> {book.author}
        </div>
        <div className="mb-3">
          <strong>Email:</strong> {book.email || "N/A"}
        </div>
        <div className="mb-3">
          <strong>Age:</strong> {book.age || "N/A"}
        </div>
        <div className="mb-3">
          <strong>Publisher:</strong> {book.publisher || "N/A"}
        </div>
        <div className="mb-3">
          <strong>Published Date:</strong> {book.publishedDate || "N/A"}
        </div>
        <div className="mb-3">
          <strong>Overview:</strong>
          <p className="mt-2" style={{ whiteSpace: "pre-wrap" }}>
            {book.description || "N/A"}
          </p>
        </div>
        <button className="btn btn-secondary mt-3" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
}
