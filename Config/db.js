import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();


const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const connection = async () => {
    const url = `mongodb+srv://${username}:${password}@cluster0.jjmvoks.mongodb.net/persidio?retryWrites=true&w=majority&appName=Cluster0`
    const connectionParams = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		autoIndex: true
	}
    await mongoose.connect(url, connectionParams);
}

export default connection

