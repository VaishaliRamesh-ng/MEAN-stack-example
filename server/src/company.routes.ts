import * as express from "express";
import { ObjectId } from "mongodb";
import { collections } from "./database";

export const company_list_router = express.Router();
company_list_router.use(express.json());

company_list_router.get("/", async (_req, res) => {
    try {
        const company_list = await collections?.company_list?.find({}).toArray();
        res.status(200).send(company_list);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});

company_list_router.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const company = await collections?.company_list?.findOne(query);

        if (company) {
            res.status(200).send(company);
        } else {
            res.status(404).send(`No Such Entry Found: ID ${id}`);
        }
    } catch (error) {
        res.status(404).send(`No Such Entry Found: ID ${req?.params?.id}`);
    }
});

company_list_router.post("/", async (req, res) => {
    try {
        const company = req.body;
        const result = await collections?.company_list?.insertOne(company);

        if (result?.acknowledged) {
            res.status(201).send(`Created a record: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new record.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error instanceof Error ? error.message : "Unknown error");
    }
});

company_list_router.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const company = req.body;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.company_list?.updateOne(query, { $set: company });

        if (result && result.matchedCount) {
            res.status(200).send(`Updated the record: ID ${id}.`);
        } else if (!result?.matchedCount) {
            res.status(404).send(`Failed to find a matching record: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update a matching record: ID ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
});


company_list_router.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.company_list?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed the record: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove record: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find record: ID ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
});