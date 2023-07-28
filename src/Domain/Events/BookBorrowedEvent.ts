import MemberEntity from "src/Domain/Entities/MemberEntity";
import BookEntity from "src/Domain/Entities/BookEntity";
import IEvent from "src/Application/Event/IEvent";

export default class BookBorrowedEvent implements IEvent{
    eventName: string;
    constructor(eventName: string, public readonly book: BookEntity, public readonly member: MemberEntity) {
        this.eventName = eventName;
    }
}
