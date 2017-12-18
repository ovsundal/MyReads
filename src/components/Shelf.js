import React, {Component} from 'react';
import * as BooksAPI from '../BooksAPI';
import Book from "./Book";

class Shelf extends Component {

    constructor(props) {
        super(props);
    }

    // changeShelf = (book, shelf) => (BooksAPI.update(book, shelf));

    render() {
        return(
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.shelfName}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.books.map((item) =>
                            // how would i uniquely identify each book with a "key" prop?
                            <Book
                                book = {item}
                            />
                        )}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Shelf;