import { Db, MongoClient } from 'mongodb'

const connectionURI = 'mongodb://127.0.0.1:27017'
const connectionURIRemote = 'mongodb+srv://dattu046:Gajanana_007@cluster0.xfp12go.mongodb.net/?retryWrites=true&w=majority'

const client = new MongoClient(connectionURIRemote)
let database : Db = {} as Db
console.log(connectionURI)
async function setup(){
    try{
        database = client.db('blogposts')
    }catch(exception){
        console.error('Error initializing database')
    }
}

setup().catch((error) => console.error('Error initializing database', error))

export default database