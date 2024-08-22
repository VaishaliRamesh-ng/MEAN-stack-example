import * as mongodb from "mongodb";

export interface Company {
    name: string;
    exchange: string;
    ticker: string;
    ISin: string;
    website?: string | null
    _id?: mongodb.ObjectId;
}