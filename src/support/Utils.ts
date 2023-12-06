export class Utils {

    private localVar: string | undefined | null;

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

    public setLocalVar(value: string | undefined | null) {
        this.localVar = value;
    }

    public getLocalVar(): string | undefined | null {
        if (this.localVar === null) {
            return null;
        } else if (this.localVar === undefined) {
            return undefined;
        } else {
            return this.localVar
        }
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

    public forwardError(msg: string, callback: any) {
        callback(msg);
    }
}

export const utils = new Utils();
