import mongoose from "mongoose";
import { Password } from "../services/password";

/**
 * INTERFACES EXPLANATION:
 * UserAttrs are the attributes needed to create a new user
 * UserDoc are the attributes a user have after being created (remember
 * that mongo adds things like __v version key, maybe created at and
 * updated at)
 * UserModel are all the attributes tied to the model itself
 */

// With this interface, we can allow typechecking user parameters to build a new user
interface UserAttrs {
    email: string;
    password: string;
}

/**
 * Extends the properties of the user model
 * adds a build method so typescript can type check
 * Model represents the entire collection of data
 */
// interface UserModel extends mongoose.Model<any> {
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
    // build(attrs: UserAttrs): any;
}

/**
 * An interface that describes the properties of a user document
 */
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
    // createdAt: string;
    // updatedAt: string;
}

const userSchema  = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
        toJSON: {
            /**
             * 
             * @param doc is the actual mongoose document 
             * @param ret the plain JSON object that will be returned
             */
            transform(doc, ret) {
                // this is js, not ts or mongoose. It deletes a property of an object
                delete ret.password;

                // remove the mongoose version key
                delete ret.__v;

                // rename the id to match other languages/databases format
                ret.id = ret._id;
                delete ret._id;
            }
        }
});

/**
 * Hook/middleware that executes right before the document is stored in the DB
 * The 'done' parameter is like 'next' in express middlewares, we have to call it
 * at the end.
 * 
 * This cannot be an arrow function because we access the document attempted
 * to be saved through 'this'
 */
userSchema.pre('save', async function (done) {

    /**
     * isModified('password') will return true even if the user is being
     * created for the first time
     */
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }

    done();
});

// add a method to mongoose User model
// We add this so we can typecheck the user attributes
userSchema.statics.build = function (attrs: UserAttrs) {
    return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);
// const User = mongoose.model<any, UserModel>('User', userSchema);

export { User };