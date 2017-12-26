import React from 'react';
import Book from "./Book";

function Shelf(props) {

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.shelfName}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {props.books.map((item) =>
                        <li key={item.id}>
                            <Book
                                changeShelf={props.changeShelf}
                                book={item}
                            />
                        </li>
                    )}
                </ol>
            </div>
        </div>
    )
}

export default Shelf;