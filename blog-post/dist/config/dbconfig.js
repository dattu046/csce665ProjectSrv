"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const connectionURI = 'mongodb://127.0.0.1:27017';
const connectionURIRemote = 'mongodb+srv://dattu046:Gajanana_007@cluster0.xfp12go.mongodb.net/?retryWrites=true&w=majority';
const client = new mongodb_1.MongoClient(connectionURIRemote);
let database = {};
console.log(connectionURI);
async function setup() {
    try {
        database = client.db('blogposts');
    }
    catch (exception) {
        console.error('Error initializing database');
    }
}
setup().catch((error) => console.error('Error initializing database', error));
exports.default = database;
