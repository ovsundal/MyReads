import React from 'react';

function Book(props) {

    return (
        <div className="book" key={props.book.id}>
            <div className="book-top">
                <div className="book-cover"
                     style={{width: 128, height: 193, backgroundImage: `url(${props.book.imageLinks.smallThumbnail}`}}>
                    <div className="book-shelf-changer">
                        <select value={props.book.shelf} onChange={(event) => {
                            props.changeShelf(props.book, event.target.value);
                            props.refreshBookList();
                        }}>
                            <option value="none" disabled>Move to...</option>
                            <option value="none">None</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="book-title">{`${props.book.title}`}</div>
            <div className="book-authors">{`${props.book.authors}`}</div>
        </div>
    )
}

export default Book;