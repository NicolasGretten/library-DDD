import BookEntity from "../Entities/BookEntity";
import MemberEntity from "../Entities/MemberEntity";
import MemberBorrowBookAggregate from "../Aggregates/MemberBorrowBookAggregate";
import EventBus from "src/Domain/Events/EventBus";
import BookBorrowedEvent from "src/Domain/Events/BookBorrowedEvent";

export default class LibraryService {
    private memberBorrowBookAggregate: MemberBorrowBookAggregate;

    private eventBus: EventBus;

    constructor(eventBus: EventBus) {
        this.eventBus = eventBus;
        this.memberBorrowBookAggregate = new MemberBorrowBookAggregate();
    }

    borrowBook(book: BookEntity, member: MemberEntity): BookEntity {
        const bookBorrowedEvent = new BookBorrowedEvent("BookBorrowedEvent", book, member);
        this.eventBus.publish(bookBorrowedEvent);
        return this.memberBorrowBookAggregate.borrowBook(book, member)
    }

    returnBook(book: BookEntity): void {
        this.memberBorrowBookAggregate.returnBook(book);
        // Ici, vous pouvez effectuer des opérations supplémentaires liées au retour de livres si nécessaire.
    }

    getBorrowedBooks(): BookEntity[] {
        return this.memberBorrowBookAggregate.getBorrowedBooks();
    }
}