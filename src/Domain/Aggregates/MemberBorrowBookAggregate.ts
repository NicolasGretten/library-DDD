import BookEntity from "../Entities/BookEntity";
import MemberEntity from "../Entities/MemberEntity";
import BookRepository from "src/Persistence/Repository/BookRepository";

export default class MemberBorrowBookAggregate {
    borrowBook(book: BookEntity, member: MemberEntity): BookEntity {
        if (book.borrowedBy !== null) {
            throw new Error("Le livre est déjà emprunté.");
        }

        book.borrowedBy = member;
        book.borrowedDate = new Date();
        book.returnDate = this.addDays(new Date(), 15);

        new BookRepository().update(book);

        return book;
    }

    returnBook(book: BookEntity): BookEntity {
        if (book.borrowedBy === null) {
            throw new Error("Le livre n'est pas emprunté.");
        }

        book.borrowedDate = null;
        book.returnDate = null;
        book.borrowedBy = null

        new BookRepository().update(book);

        return book;
    }

    findAll(): BookEntity[] {
        return new BookRepository().findAll()
    }

    getBorrowedBooks(): BookEntity[] {
        return new BookRepository().findAllWithParams('borrowedBy')
    }

    create(book: BookEntity): BookEntity {
        return new BookRepository().create(book);
    }

    addDays(date: Date, days: number): Date {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
}