import BookEntity from "../Entities/BookEntity";
import MemberEntity from "../Entities/MemberEntity";
import BookBorrowedEvent from "src/Domain/Events/BookBorrowedEvent";
import EventBus from "src/Domain/Events/EventBus";

export default class MemberBorrowBookAggregate {
    private books: BookEntity[];
    constructor() {
        this.books = [];
    }

    borrowBook(book: BookEntity, member: MemberEntity): BookEntity {
        // Vérifier si le livre est déjà emprunté
        if (book.borrowedBy !== null) {
            throw new Error("Le livre est déjà emprunté.");
        }

        const borrowedDate = new Date();
        const returnDate = this.addDays(new Date(), 15);

        // Marquer le livre comme emprunté
        book.borrowedBy = member;
        book.borrowedDate = borrowedDate;
        book.returnDate = returnDate;

        // Ajouter le livre à la liste des livres empruntés dans l'agrégat
        return book;
    }

    returnBook(book: BookEntity): void {
        // Vérifier si le livre est emprunté
        if (book.borrowedBy === null) {
            throw new Error("Le livre n'est pas emprunté.");
        }

        // Marquer le livre comme non emprunté
        book.borrowedDate = null;
        book.returnDate = null;

        // Retirer le livre de la liste des livres empruntés dans l'agrégat
        this.books = this.books.filter((b) => b !== book);
    }

    getBorrowedBooks(): BookEntity[] {
        // Renvoyer la liste des livres empruntés dans l'agrégat
        return this.books;
    }

    addDays(date: Date, days: number): Date {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
}