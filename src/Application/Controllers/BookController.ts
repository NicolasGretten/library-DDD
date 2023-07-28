import IBookCommand from "src/Application/Interfaces/IBookCommand";
import BookEntity from "src/Domain/Entities/BookEntity";
import MemberEntity from "src/Domain/Entities/MemberEntity";
import BookService from "src/Domain/Services/BookService";
import BookRepository from "src/Persistence/Repository/BookRepository";
import MemberRepository from "src/Persistence/Repository/MemberRepository";

export default class BookController implements IBookCommand{
    private bookService: BookService;
    private bookDB: BookRepository;
    private memberDB: MemberRepository;

    constructor(bookService: BookService) {
        this.bookService = bookService;
        this.bookDB = new BookRepository();
        this.memberDB = new MemberRepository();
    }

    borrowABook(bookId: string, memberId: string){
        const book: BookEntity = new BookRepository().findOneById(bookId)
        const member: MemberEntity = new MemberRepository().findOneById(memberId)

        return this.bookService.borrowBook(book, member);
    }
    returnABook(bookId: string){
        const book: BookEntity = new BookRepository().findOneById(bookId)

        return this.bookService.returnBook(book);
    }
    getAllBooks(){
        return this.bookService.findAll();
    }

    listAllBorrowedBook(){
        return this.bookService.getBorrowedBooks();
    }

    create(book: BookEntity): BookEntity{
        return this.bookService.create(book)
    }
}