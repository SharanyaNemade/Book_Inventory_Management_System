import { useNavigate } from "react-router-dom";

export default function BookTable({ books, onDelete, onEdit }) {
  const navigate = useNavigate();

  if (books.length === 0) {
    return (
      <div className="alert alert-info">
        No books found. Click "Add Book" to add your first book.
      </div>
    );
  }

  return (
    <div style={{ maxHeight: "70vh", overflowY: "auto", overflowX: "auto" }}>
      <table className="table table-bordered table-striped table-hover">
        <thead className="table-dark" style={{ position: "sticky", top: 0, zIndex: 1 }}>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Email</th>
            <th>Age</th>
            <th>Publisher</th>
            <th>Published Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td
                style={{ cursor: "pointer", color: "#007bff", textDecoration: "underline" }}
                onClick={() => navigate(`/book/${book.id}`)}
                title="Click to view details"
              >
                {book.title || "N/A"}
              </td>
              <td>{book.author || "N/A"}</td>
              <td>{book.email || "N/A"}</td>
              <td>{book.age || "N/A"}</td>
              <td>{book.publisher || "N/A"}</td>
              <td>{book.publishedDate || "N/A"}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => onEdit(book)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onDelete(book.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
