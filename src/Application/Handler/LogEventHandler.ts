import BookBorrowedEvent from "../../Domain/Events/BookBorrowedEvent";
import IEventHandler from "./IEventHandler";

export default class LogEventHandler implements IEventHandler<BookBorrowedEvent> {
    handle(event: BookBorrowedEvent): void {
        console.log(`Event Book borrowed - Book: ${event.book.title}, Member: ${event.member.firstName} ${event.member.lastName}`);
    }
}