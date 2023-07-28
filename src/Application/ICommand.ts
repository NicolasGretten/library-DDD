export default interface ICommand{
    borrowABook(bookId: string, memberId: string);
    listAllBook();
    listAllBorrowedBook();
    returnABook(bookId: string);
    listAllMembers();
}