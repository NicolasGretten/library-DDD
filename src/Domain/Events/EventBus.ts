import IEvent from "../../Application/Event/IEvent";
import IEventHandler from "../../Application/Handler/IEventHandler";

export default class EventBus {
    private eventHandlers: Map<string, IEventHandler<IEvent>[]>;

    constructor() {
        this.eventHandlers = new Map();
    }

    subscribe<T extends IEvent>(eventName: string, handler: IEventHandler<T>): void {
        if (!this.eventHandlers.has(eventName)) {
            this.eventHandlers.set(eventName, []);
        }

        this.eventHandlers.get(eventName)?.push(handler);
    }

    publish<T extends IEvent>(event: T): void {
        const eventName = event.constructor.name;
        const handlers = this.eventHandlers.get(eventName);

        if (handlers) {
            handlers.forEach((handler) => handler.handle(event));
        }
    }
}
