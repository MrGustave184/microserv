import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
    /**
     * Check that JWT_KEY env variable is defined
     */
    if(!process.env.JWT_KEY) {
        throw new Error('JWT_KEY env variable is undefined');
    }

    /**
     * To connect to out DB pod in k8s, we use the created mongo service name in the connection string along with the port
     * /auth is the name of the database, and if doesnt exists, mongo will create it automatically
     */
    try {      
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
        console.log('success on connecting to DB');
    } catch(err) {
        console.log(err);
    }
}

start();

app.listen(3000, () => {
    console.log('app listening on port 3000 with DB');
});