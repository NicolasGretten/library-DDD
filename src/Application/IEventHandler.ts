import IEvent from "./IEvent";

export default abstract class IEventHandler<T extends IEvent> {
    abstract handle(event: T): void;
}