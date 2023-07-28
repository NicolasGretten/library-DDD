import express, { Request, Response } from 'express';
import BookController from "src/Application/Controllers/BookController";
import LogEventHandler from "src/Application/Handler/LogEventHandler";
import EventBus from "src/Domain/Events/EventBus";
import BookService from "src/Domain/Services/BookService";
import MemberController from "src/Application/Controllers/MemberController";
import MemberService from "src/Domain/Services/MemberService";
import bodyParser from "body-parser";
import BookEntity from "src/Domain/Entities/BookEntity";
import MemberEntity from "src/Domain/Entities/MemberEntity";

const eventBus = new EventBus();

const bookService = new BookService(eventBus);
const memberService = new MemberService(eventBus);

const bookController = new BookController(bookService);
const memberController = new MemberController(memberService);

// LOG LES EVENT CREER DEPUIS LES SEVRICES
const logEventHandler = new LogEventHandler();
eventBus.subscribe("BookBorrowedEvent", logEventHandler);

const app: express.Application = express();
app.use(bodyParser.json());
app.use(bodyParser.raw());
const port = 3000;

app.get('/books', (req: Request, res: Response) => {
    res.send(bookController.getAllBooks())
});

app.post('/books', (req: Request, res: Response) => {
    console.log(req.body);
    res.send(bookController.create(req.body as BookEntity))
});

app.get('/books/borrowed', (req: Request, res: Response) => {
    res.send(bookController.listAllBorrowedBook())
});

app.patch('/books/:id/return', (req: Request, res: Response) => {
    const bookId = req.params.id;
    res.send(bookController.returnABook(bookId))
});

app.post('/books/:id/borrow/:memberId', (req: Request, res: Response) => {
    const bookId = req.params.id;
    const memberId = req.params.memberId;
    res.send(bookController.borrowABook(bookId, memberId))
});

app.get('/members', (req: Request, res: Response) => {
    res.send(memberController.listAllMembers())
});

app.post('/members', (req: Request, res: Response) => {
    res.send(memberController.create(req.body as MemberEntity))
});

app.listen(port, () => {
    console.log(`Le serveur est en cours d'exécution sur le port ${port}.`);
});
