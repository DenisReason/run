import { MongoClient } from 'mongodb'

const url = 'mongodb+srv://denisadmin:00000000tri@cluster0.nmebfc9.mongodb.net/'
const Client = new MongoClient(url)

export const GetuserByUsername = async (username) => {
    try {
        await Client.connect()
        const db = Client.db("MinhDb")
        const collection = db.collection("UsersAccount")
        const data = await collection.findOne({ "username": username })
        Client.close()
        console.log(data)
        return data
    } catch (error) {
        console.log(error);
    }
}

export const CreateUserAccount = async (newUser) => {
    try {
        await Client.connect()
        const db = Client.db("MinhDb")
        const collection = db.collection("UsersAccount")
        await collection.insertOne(newUser)
        console.log("Create Account Done")
    } catch (error) {
        console.log(error);
    }
}

