import React from 'react';
import './App.css';
import SearchBar from "./components/SearchBar";
import {Link, Route} from 'react-router-dom';
import * as BooksAPI from "./BooksAPI";
import Shelf from "./components/Shelf";


class BooksApp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            books: []
        };
    }

    //on initial load, add all books from API and filter them to their respective shelf
    componentDidMount() {
        this.refreshBookList();
    }

    refreshBookList = () => {
        BooksAPI.getAll().then((books) => {
            this.setState({books})
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
            <div className="app">
                {/*render searchbar component if route is /search*/}
                <Route path="/search" render={() => (
                    <SearchBar
                        //pass books as props to search bar
                        refreshBookList={this.refreshBookList}
                        books={this.state.books}
                        changeShelf={this.changeShelf}
                    />
                )}/>
                {/*render shelf components if route is /*/}
                <Route exact path="/" render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                <Shelf
                                    refreshBookList={this.refreshBookList}
                                    changeShelf={this.changeShelf}
                                    books={this.state.books.filter((book) => {
                                        return book.shelf === "currentlyReading";
                                    })}
                                    shelfName="Currently Reading"
                                />
                                <Shelf
                                    changeShelf={this.changeShelf}
                                    books={this.state.books.filter((book) => {
                                        return book.shelf === "wantToRead";
                                    })}
                                    shelfName="Want To Read"
                                />
                                <Shelf
                                    changeShelf={this.changeShelf}
                                    books={this.state.books.filter((book) => {
                                        return book.shelf === "read";
                                    })}
                                    shelfName="Read"
                                />
                            </div>
                        </div>
                        <div className="open-search">
                        <Link to="/search">Find a book</Link>
                        </div>
                    </div>
                )}/>
            </div>
        )
    }
}

export default BooksApp
