import React, {Component} from 'react';

class Book extends Component {

    constructor(props) {
        super(props);
        this.book = this.props.book;
    }

    render() {
        return(

            <div className="book" key={this.book.id}>
                <div className="book-top">
                    <div className="book-cover"
                         style={{width: 128, height: 193, backgroundImage: `url(${this.book.imageLinks.smallThumbnail}`}}>
                        <div className="book-shelf-changer">
                            <select value={this.book.shelf} onChange={(event) => {
                                this.props.changeShelf(this.book, event.target.value);
                            }}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="book-title">{`${this.book.title}`}</div>
                <div className="book-authors">{`${this.book.authors}`}</div>
            </div>
        )
    }
}

export default Book;