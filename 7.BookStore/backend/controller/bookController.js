// controller/bookController.js
import Book from "../model/book.js"; // Ensure correct path and extension

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching books:", error); // Detailed logging
    res.status(500).json({ message: error.message }); // Use 500 for server errors
  }
};
