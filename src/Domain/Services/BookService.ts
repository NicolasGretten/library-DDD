import BookEntity from "../Entities/BookEntity";
import MemberEntity from "../Entities/MemberEntity";
import MemberBorrowBookAggregate from "../Aggregates/MemberBorrowBookAggregate";
import EventBus from "src/Domain/Events/EventBus";
import BookBorrowedEvent from "src/Domain/Events/BookBorrowedEvent";

export default class BookService {
    private aggregate: MemberBorrowBookAggregate;
    private eventBus: EventBus;

    constructor(eventBus: EventBus) {
        this.eventBus = eventBus;
        this.aggregate = new MemberBorrowBookAggregate();
    }

    borrowBook(book: BookEntity, member: MemberEntity): BookEntity {
        const bookBorrowedEvent = new BookBorrowedEvent("BookBorrowedEvent", book, member);
        this.eventBus.publish(bookBorrowedEvent);
        return this.aggregate.borrowBook(book, member)
    }

    returnBook(book: BookEntity): BookEntity {
        return this.aggregate.returnBook(book);
    }

    getBorrowedBooks(): BookEntity[] {
        return this.aggregate.getBorrowedBooks();
    }

    findAll(): BookEntity[] {
        return this.aggregate.findAll();
    }

    create(book: BookEntity): BookEntity{
        book.borrowedBy = null;
        book.returnDate = null;
        book.borrowedDate = null
        return this.aggregate.create(book);
    }
}