import { Utils } from "./Utils";

export class ClassOfManyThings {

    utils: Utils;

    constructor(u: Utils) {
        this.utils = u;
    }

    public methodWithCallback(obj: Object, prop: string, callback){
        const x = obj[prop]
        callback(x)
        return x;
    }

    public someMethod(a: number, b: number): number {
        return this.utils.sum(a, b)
    }

    public anotherMethod(a: number, b: number): number {
        return this.utils.divide(a, b)
    }

    public dateTimeNowToString() {
        return new Date.now().toString();
    }

    public logToConsole(msg) {
        console.log(msg)
    }
}
