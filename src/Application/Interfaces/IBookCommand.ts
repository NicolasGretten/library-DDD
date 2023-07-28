import BookEntity from "src/Domain/Entities/BookEntity";

export default interface IBookCommand {
    borrowABook(bookId: string, memberId: string);
    getAllBooks();
    listAllBorrowedBook();
    returnABook(bookId: string);
    create(book: BookEntity)
}