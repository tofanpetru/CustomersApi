import { Identifiable } from './persistence/Identifiable'

export class DbContext<T extends Identifiable> {
    public items: T[] = [];
}