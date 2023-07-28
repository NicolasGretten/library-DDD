import express, { Application, Request, Response } from 'express';
import HttpController from "src/Application/Controllers/HttpController";
import LogEventHandler from "src/Application/LogEventHandler";
import MemberBorrowBookAggregate from "src/Domain/Aggregates/MemberBorrowBookAggregate";
import EventBus from "src/Domain/Events/EventBus";
import LibraryService from "src/Domain/Services/LibraryService";
import BookRepository from "src/Persistence/BookRepository";

// Créer l'Event Bus
const eventBus = new EventBus();

// Créer le service du domaine avec l'Event Bus
const libraryService = new LibraryService(eventBus);

// Créer le controller et injecter le service du domaine
const httpController = new HttpController(libraryService);

const db = new BookRepository()

// Créer le LogEventHandler et s'abonner à l'Event Bus pour le BookBorrowedEvent
const logEventHandler = new LogEventHandler();
eventBus.subscribe("BookBorrowedEvent", logEventHandler);

const app: Application = express();
const port = 3000;

app.get('/books', (req: Request, res: Response) => {
    res.send(httpController.listAllBook())
});

app.get('/books/borrowed', (req: Request, res: Response) => {
    res.send(httpController.listAllBorrowedBook())
});

app.get('/members', (req: Request, res: Response) => {
    res.send(httpController.listAllMembers())
});

app.post('/books/:id/return', (req: Request, res: Response) => {
    const bookId = req.params.id;
    res.send(httpController.returnABook(bookId))
});

app.post('/books/:id/borrow/:memberId', (req: Request, res: Response) => {
    const bookId = req.params.id;
    const memberId = req.params.memberId;
    res.send(httpController.borrowABook(bookId, memberId))
});

app.listen(port, () => {
    console.log(`Le serveur est en cours d'exécution sur le port ${port}.`);
});
