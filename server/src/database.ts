import * as mongodb from "mongodb";
import { Company } from "./company_list";

export const collections: {
    company_list?: mongodb.Collection<Company>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("company_list");
    await applySchemaValidation(db);

    const company_list_collection = db.collection<Company>("company_list");
    collections.company_list = company_list_collection;
}


async function applySchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "exchange", "ticker", "ISin"],
            additionalProperties: false,
            properties: {
                _id: {},
                name: {
                    bsonType: "string",
                    description: "'name' is required and is a string",
                },
                exchange: {
                    bsonType: "string",
                    description: "'exchange' is required and is a string",
                },
                ticker: {
                    bsonType: "string",
                    description: "'Ticker' is required and is a string"

                },
                isin: {
                    bsonType: "string",
                    description: "'ISin' is required and is a string",
                    RegExp: [/^([a-z]{2})+$/i],
                }
            },
        },
    };

    // Update the collection and if it doesn't exist, create it
   await db.command({
        collMod: "company_list",
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("company_list", {validator: jsonSchema});
        }
    });
}