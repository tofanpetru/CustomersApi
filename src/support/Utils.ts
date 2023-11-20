export class Utils {

    private text = "text";

    public sum(a: number, b: number) {
        return a + b;
    }

    public divide(a: number, b: number) {
        return a / b;
    }

    public createObjectWithDate() {
        const obj = {datetime: ''}
        obj.datetime = Date.now().toString();
        return obj;
    }

    public returnBoolean(v: boolean) {
        return !v
    }

    public creteArray(...args: any[]) {
        return Array.from(args);
    }

    public throwException() {
        throw new Error("This error is thrown")
    }
}

export const utils = new Utils();
