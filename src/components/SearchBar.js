import React, {Component} from 'react';
import * as BooksAPI from '../BooksAPI';
import {Link} from 'react-router-dom';
import { Debounce } from 'react-throttle';
import Book from "./Book";

/**
 * Component for book searching input field
 */
class SearchBar extends Component {

    state = {
        query: '',
        books: []
    };

    //on initial load, add all books from API to state.books
    componentDidMount() {
        BooksAPI.getAll().then((books) =>
            this.setState({ books }))
    }

    // changeShelf = (book, shelf) => {
    //     BooksAPI.update(book, shelf);
    // };


    updateQuery = (query) => {
        this.setState({query});
        console.log(query);
        //if user updates query, do a search with query and max returned results.
        if(query) {
            BooksAPI.search(query, 20).then((books) => {
                console.log(books);
                //only change state if books are actually found
                if(books.length > 0) {

                    const booksInShelf = this.state.books;

                    //if queried book exists in shelf, replace queried book with shelf book
                    for(let i = 0; i < books.length; i++) {
                        let index = booksInShelf.indexOf(books[i]);

                        if(index) {
                            books[i] = booksInShelf[index];
                        }
                    }
                    this.setState({books})
                }
            })
        } else {
            // If input string is empty, show no books
            this.setState({books: []})
        }
    };

    render() {
        //get array from state
        const showingBooks = this.state.books;

        return(

            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        to="/"
                        className="close-search"
                    >Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*prevent too many api calls using Debounce*/}
                        <Debounce time="400" handler="onChange">
                            <input
                                type="text"
                                placeholder="Search by title or author"
                                value={this.state.value}
                                onChange={(event) => this.updateQuery(event.target.value)}
                            />
                        </Debounce>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {showingBooks.map((item) => (
                        <li key={item.id}>
                            <Book
                                book = {item}
                            />
                        </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBar;