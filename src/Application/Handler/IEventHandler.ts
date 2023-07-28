import IEvent from "../Event/IEvent";

export default abstract class IEventHandler<T extends IEvent> {
    abstract handle(event: T): void;
}