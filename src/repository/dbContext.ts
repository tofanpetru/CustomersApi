export class DbContext<T extends Identifiable> {
    public items: T[] = [];
}