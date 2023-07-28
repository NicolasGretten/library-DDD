import MemberEntity from "src/Domain/Entities/MemberEntity";

export default interface BookEntity{
    id: string;
    title: string;
    author: string;
    borrowedBy?: MemberEntity|null;
    borrowedDate?: Date|null;
    returnDate?: Date|null;
}