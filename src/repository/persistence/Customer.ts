import { Identifiable } from "./Identifiable";

export interface Customer extends Identifiable{
    name: string;
    email: string;
}