export default interface IRepository<T>{
    findAll(): T[];
    findAllWithParams(params: string): T[];
    findOneById(id: string): T;
    findMany(ids: Array<string>): T[];
    create(entity: T): T;
    update(entity: T): T;
}