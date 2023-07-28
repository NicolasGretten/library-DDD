import MemberRepository from "src/Persistence/Repository/MemberRepository";
import MemberEntity from "src/Domain/Entities/MemberEntity";

export default class MemberAggregate{
    findAll(): MemberEntity[] {
        return new MemberRepository().findAll()
    }

    create(member: MemberEntity): MemberEntity{
        return new MemberRepository().create(member)
    }
}