import "../../styles/authors.css";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card,} from "reactstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ReactPaginate from "react-paginate";
import "react-toastify/dist/ReactToastify.css";
import CardAuthor from "../../components/CardAuthor";
import { useNavigate } from "react-router-dom";
import { AuthorService } from "../../services/AuthorService";
import Toast from "../../helpers/Toast";

export default function Authors() {
    const [updateData, setUpdateData] = useState(true);
    const [search, setSearch] = useState("");
    const [pageCount, setPageCount] = useState(1);
    const [sort, setSort] = useState("");
    const sortOptions = ["Name", "Country"];
    const [forcePage, setForcePage] = useState(0);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize] = useState(6);
    const [authors, setAuthors] = useState([]);
    const authorService = new AuthorService();

    const handlePageClick = async (data: any) => {
        let current = data.selected + 1;
            setCurrentPage(current);
            setForcePage(data.selected);
        };

    const loadAuthors = async () => {
        var response = await authorService.GetAll(
            currentPage, 
            pageSize, 
            search, 
            sort
            );
        if (response.success !== true) {
            Toast.Show("error", "Author not loaded!");
            return;
        }

        if (response.items == null) {
            Toast.Show("error", "Not found!");
            return;
        }
        setAuthors(response.items);
        setPageCount(response.totalPages);
        setUpdateData(true);
    };

    useEffect(() => {
        if (updateData) {
            loadAuthors();
            setUpdateData(false);
        }
    }, [updateData]);


    return (
        <div className="Author-container">
            <h1> Book Catalog</h1>
      <header></header>
      <button
        type="button"
        className="App__add-book text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-4 py-2.5 text-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        onClick={() => navigate(`/newAuthor`)}
      >
        Add Author +
      </button>

      <div className="App__sort">
        <label htmlFor="sort"></label>

        <select
          id="sort"
          value={sort}
          onChange={(e) => (
            setSort(e.target.value), setCurrentPage(0), setForcePage(0)
          )}
        >
          {sortOptions.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <form className="flex items-center App__search">
        <div className="relative w-80">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="search"
            value={search}
            onChange={(e) => (
              setSearch(e.target.value), setCurrentPage(0), setForcePage(0)
            )}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
          />
        </div>
        <button
          type="submit"
          className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </form>

      <div className="bg-white ">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className=" App__book-list grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {authors.map(
              (author: {
                id: number;
                name: string;
                country: string;
                authorTitle: [];
              }) => (
                <Col key={author.id} width="50px">
                    <Card
                    border="primary"
                    bg="light"
                    className="text-center"
                    style={{ width: "27rem" }}>
                        <CardAuthor
                        isBook={false}
                        name={author.name}
                        country={author.country}
                        authorTitle={author.authorTitle == null? 
                            "none" : author.authorTitle.join(", ")}
                            />
                            <Row>
                                <Col/>
                                <Button
                                style={{ width: "100px", height: "35px", backgroundColor: "blue" }}
                                onClick={() => ( navigate(`/editAuthor/${author.id}`))}>
                                    Details
                                    </Button>
                                    <br /><br />
                                <Col/>
                            </Row>
                        </Card>
                </Col>
             ))}
          </div>
        </div>
        <ReactPaginate
          previousLabel={"<-previous"}
          nextLabel={"next ->"}
          breakLabel={"..."}
          forcePage={forcePage}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
}