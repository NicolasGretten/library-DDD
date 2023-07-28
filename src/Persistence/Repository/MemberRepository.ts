import * as fs from "fs";
import { v4 as uuid } from 'uuid';
import MemberEntity from "src/Domain/Entities/MemberEntity";
import IRepository from "src/Persistence/IRepository";

export default class MemberRepository implements IRepository<MemberEntity>{
    db: Array<MemberEntity>;
    constructor(){
        this.mapData()
    }

    mapData() {
        this.db = Object.values(JSON.parse(fs.readFileSync('./src/Persistence/DB/members.json').toString()))
    }

    findAll(): MemberEntity[] {
        return this.db
    }

    findAllWithParams(params: string): MemberEntity[] {
        return [];
    }

    findOneById(id: string): MemberEntity{
        const member = this.db.find(element => element.id === id)
        if(member) return member;
        else throw new Error("Member not found")
    }

    findMany(ids: Array<string>): MemberEntity[]{
        return this.db.filter(element => ids.includes(element.id))
    }

    create(entity: MemberEntity): MemberEntity {
        const newId = uuid();

        const newMember = { ...entity, id: newId };
        this.db.push(newMember);

        this.saveDataToJSON();

        return newMember;
    }

    update(entity: MemberEntity): MemberEntity {
        const index = this.db.findIndex((element) => element.id === entity.id);

        if (index !== -1) {
            this.db[index] = entity;

            this.saveDataToJSON();

            return entity;
        }else {
            throw new Error(`Could not find member`)
        }
    }

    private saveDataToJSON() {
        const jsonData = JSON.stringify(this.db, null, 2);
        fs.writeFileSync('./src/Persistence/DB/members.json', jsonData);
    }
}