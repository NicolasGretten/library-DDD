import ICommand from "src/Application/ICommand";
import IEventHandler from "src/Application/IEventHandler";
import BookEntity from "src/Domain/Entities/BookEntity";
import MemberEntity from "src/Domain/Entities/MemberEntity";
import LibraryService from "src/Domain/Services/LibraryService";
import { v4 as uuid } from 'uuid';
import BookRepository from "src/Persistence/BookRepository";

export default class HttpController implements ICommand{
    private libraryService: LibraryService;
    private bookDB: BookRepository;

    constructor(libraryService: LibraryService) {
        this.libraryService = libraryService;
        this.bookDB = new BookRepository();
    }

    borrowABook(bookId: string, memberId: string){

        const book: BookEntity = this.bookDB.findOneById(bookId)
        const member: MemberEntity = {
            "id": uuid(),
            "firstName": "test",
            "lastName": "test",
        };

        return this.libraryService.borrowBook(book, member);
    }
    listAllBook(){
        return "All book"
    }

    listAllBorrowedBook(){
        return "All Borrowed book"
    }

    returnABook(bookId: string){
        return "Return a book"
    }

    listAllMembers(){
        return "All members"
    }
}