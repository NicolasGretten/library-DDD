import * as fs from "fs";
import BookEntity from "src/Domain/Entities/BookEntity";
import { v4 as uuid } from 'uuid';

export default class BookRepository{
    db: Array<BookEntity>;
    constructor(){
       this.mapData()
    }

    mapData() {
        this.db = Object.values(JSON.parse(fs.readFileSync('./src/Persistence/DB/books.json').toString()))
    }

    getAllData(){ 
        return this.db
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
        // Generate a new unique ID for the book
        const newId = uuid();

        // Add the new book to the database
        const newBook = { ...entity, id: newId };
        this.db.push(newBook);

        // Save the updated database to the JSON file
        this.saveDataToJSON();

        return newBook;
    }

    update(entity: BookEntity) {
        // Find the index of the book with the given ID in the database
        const index = this.db.findIndex((element) => element.id === entity.id);

        if (index !== -1) {
            // Update the book in the database
            this.db[index] = entity;

            // Save the updated database to the JSON file
            this.saveDataToJSON();

            return entity;
        }

        // If the book with the given ID doesn't exist, return null or throw an error.
        return null;
    }

    private saveDataToJSON() {
        const jsonData = JSON.stringify(this.db, null, 2);
        fs.writeFileSync('./src/Persistence/DB/books.json', jsonData);
    }
}