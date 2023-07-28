import EventBus from "src/Domain/Events/EventBus";
import MemberEntity from "src/Domain/Entities/MemberEntity";
import MemberAggregate from "src/Domain/Aggregates/MemberAggregate";

export default class MemberService{
    private aggregate: MemberAggregate;
    private eventBus: EventBus;

    constructor(eventBus: EventBus) {
        this.eventBus = eventBus;
        this.aggregate = new MemberAggregate();
    }

    findAll(): MemberEntity[] {
        return this.aggregate.findAll();
    }

    create(member: MemberEntity){
        return this.aggregate.create(member)
    }
}