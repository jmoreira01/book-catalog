import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import { BookService } from "../../services/BookService";
import { BookCreateDTO } from "../../models/books/BookCreateDTO";
import { BookDTO } from "../../models/books/BookDTO";
import { useNavigate } from "react-router-dom";
import Toast from "../../helpers/Toast";
import "../../styles/books/bookCreate.css";
import Input from "../../components/Input";
import Button from "react-bootstrap/Button";

export default function BookCreate() {
  const [book, setBook] = useState<BookDTO>({} as BookDTO);
  const navigate = useNavigate();
  const bookService = new BookService();
  const back = () => navigate(-1);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const newBook = async () => {
    const createBook: BookCreateDTO = {
      id: book.id,
      isbn: book.isbn,
      title: book.title,
      authorId: book.authorId,
      price: book.price,
    };
    console.log(createBook);

    const response = await bookService.Create(createBook);
    if (!response.success) {
      Toast.Show("error", response.message);
      return;
    }

    Toast.Show("success", response.message);
    back();
  };

  return (
    <Row className="newBookContainer">
      <Col />
      <Col className="border">
        <br />
        <h2>Add New Book</h2>
        <div className="form-group">
          <Input isBook={true} onChange={handleChange} />
          <Button variant="outline-success" onClick={newBook}>
            Add
          </Button>{" "}
          <Button variant="outline-danger" onClick={back}>
            Go Back
          </Button>{" "}
        </div>
      </Col>
      <Col />
    </Row>
  );
}
