import React, {Component} from 'react';
import * as BooksAPI from '../BooksAPI';
import {Link} from 'react-router-dom';
import {Debounce} from 'react-throttle';
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
        this.setState({books: this.props.books});
    }

    updateQuery = (query) => {
        if (query) {
            //if user updates query, do a search with query and max returned results.
            BooksAPI.search(query, 20).then((books) => {




                //if books are returned, merge duplicate books already in shelf into query
                if (books.length > 0) {

                    //assign books existing in shelfs into hashtable
                    let hashTable = {};
                    this.state.books.forEach(book => hashTable[book.id] = book.shelf);

                    //if queried books already exist in hashtable, update shelf status. If not, set shelf to none
                    books.forEach((newBook) => newBook.shelf = hashTable[newBook.id] || 'None');

                    this.setState({books});

                    //if empty query, clear array
                } else {
                    this.setState({books: []});
                }
            });
        }
    };

    render() {
        //get array from state
        const showingBooks = this.state.books;
        return (

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
                                    changeShelf={this.props.changeShelf}
                                    book={item}
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