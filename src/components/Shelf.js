import React, {Component} from 'react';
import Book from "./Book";

class Shelf extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.shelfName}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">

                        {this.props.books.map((item) =>
                            <li key={item.id}>
                                <Book
                                    changeShelf = {this.props.changeShelf}
                                    book = {item}
                                />
                            </li>
                        )}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Shelf;