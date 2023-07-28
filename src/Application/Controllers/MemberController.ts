import IMemberCommand from "src/Application/Interfaces/IMemberCommand";
import MemberRepository from "src/Persistence/Repository/MemberRepository";
import MemberService from "src/Domain/Services/MemberService";
import MemberEntity from "src/Domain/Entities/MemberEntity";

export default class MemberController implements IMemberCommand{
    private service: MemberService;
    private memberDB: MemberRepository;

    constructor(memberService: MemberService) {
        this.service = memberService;
        this.memberDB = new MemberRepository();
    }

    listAllMembers(){
        return this.service.findAll();
    }

    create(member: MemberEntity){
        return this.service.create(member)
    }
}