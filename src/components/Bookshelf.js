import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import Shelf from '../components/Shelf';

class Bookshelf extends Component {

    constructor(props) {
        super(props);

        this.state= {
            currentlyReading: [],
            wantToRead: [],
            read: []
        };
    }

    //on initial load, add all books from API and filter them to their respective shelf
    componentDidMount() {
        this.refreshBookList();
    }

    refreshBookList = () => {
        BooksAPI.getAll().then((books) => {

            const currentlyReading = books.filter((book) => {
                return book.shelf === "currentlyReading";
            });

            const wantToRead = books.filter((book) => {
                return book.shelf === "wantToRead";
            });

            const read = books.filter((book) => {
                return book.shelf === "read";
            });

            this.setState({currentlyReading});
            this.setState({wantToRead});
            this.setState({read});
        });
    };
    //pass this method to book component
    changeShelf = (book, shelf) => {
        BooksAPI.update(book, shelf);
        book.shelf = shelf;
        this.refreshBookList();
    };

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <Shelf
                            changeShelf = {this.changeShelf}
                            books = {this.state.currentlyReading}
                            shelfName = "Currently Reading"
                        />
                        <Shelf
                            changeShelf = {this.changeShelf}
                            books = {this.state.wantToRead}
                            shelfName = "Want To Read"
                        />
                        <Shelf
                            changeShelf = {this.changeShelf}
                            books = {this.state.read}
                            shelfName = "Read"
                        />
                    </div>
                </div>

                {/*QUESTION FOR REVIEWER i can't get the button to appear? What am i doing wrong?*/}
                <Link
                    to="/search"
                    className="open-search"
                >Find a book</Link>
            </div>
        )
    }
}

export default Bookshelf;
