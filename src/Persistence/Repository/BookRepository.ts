import * as fs from "fs";
import BookEntity from "src/Domain/Entities/BookEntity";
import { v4 as uuid } from 'uuid';
import IRepository from "src/Persistence/IRepository";

export default class BookRepository implements IRepository<BookEntity>{
    db: Array<BookEntity>;
    constructor(){
        this.db = Object.values(JSON.parse(fs.readFileSync('./src/Persistence/DB/books.json').toString()))
    }

    findAll() {
        return this.db
    }

    findAllWithParams(params: string) {
        return this.db.filter((book: any) => book[params] !== null)
    }

    findOneById(id: string): BookEntity{
        const book = this.db.find(element => element.id === id)
        if(book) return book;
        else throw new Error("Book not found")
    }

    findMany(ids: Array<string>){
        return this.db.filter(element => ids.includes(element.id))
    }

    create(entity: BookEntity) {
        const newId = uuid();

        const newBook = { ...entity, id: newId };
        this.db.push(newBook);

        this.saveDataToJSON();

        return newBook;
    }

    update(entity: BookEntity): BookEntity {
        const index = this.db.findIndex((element) => element.id === entity.id);

        if (index !== -1) {
            this.db[index] = entity;

            this.saveDataToJSON();

            return entity;
        } else {
            throw new Error("Couldn't find Book")
        }
    }

    private saveDataToJSON() {
        const jsonData = JSON.stringify(this.db, null, 2);
        fs.writeFileSync('./src/Persistence/DB/books.json', jsonData);
    }
}