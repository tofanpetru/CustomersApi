export class Utils {

    // https://www.typescriptlang.org/docs/handbook/

    static undef: number;
    static text = "text";

    public static sum(a: number, b: number) {
        return a + b;
    }

    public static devide(a: number, b: number) {
        return a / b;
    }

    public static createObjectWithDate() {
        const obj = {datetime: ''}
        obj.datetime = Date.now().toString();
        return obj;
    }

    public static returnBoolean(v: boolean) {
        return !v
    }

    public static creteArray(...args: any[]) {
        return Array.from(args);
    }

    public static throwException() {
        throw new Error("This error is thrown")
    }
}
