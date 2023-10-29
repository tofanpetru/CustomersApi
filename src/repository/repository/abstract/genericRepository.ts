import { DbContext } from "../../dbContext";
import { v4 as uuidv4 } from 'uuid';
import { Identifiable } from "../../persistence/Identifiable";

export class GenericRepository<T extends Identifiable> implements IRepository<T> {
    constructor(private dbContext: DbContext<T>) { }

    create(item: T): Promise<T> {
        const newItem = {
            ...item,
            _id: this.generateUniqueId(),
        };
        this.dbContext.items.push(newItem);
        return Promise.resolve(newItem);
    }

    findById(id: string): Promise<T | null> {
        const result = this.dbContext.items.find((item) => item._id === id);
        return Promise.resolve(result || null);
    }

    update(id: string, item: T): Promise<T | null> {
        const index = this.dbContext.items.findIndex((existingItem) => existingItem._id === id);

        if (index === -1) {
            return Promise.resolve(null);
        }

        const updatedItem = { ...item, _id: id };
        this.dbContext.items[index] = updatedItem;
        return Promise.resolve(updatedItem);
    }

    delete(id: string): Promise<T | null> {
        const index = this.dbContext.items.findIndex((item) => item._id === id);

        if (index === -1) {
            return Promise.resolve(null);
        }

        const deletedItem = this.dbContext.items.splice(index, 1)[0];
        return Promise.resolve(deletedItem);
    }

    findAll(): Promise<T[]> {
        return Promise.resolve(this.dbContext.items);
    }

    private generateUniqueId(): string {
        const uniqueId = uuidv4();
        return uniqueId;
    }
}
