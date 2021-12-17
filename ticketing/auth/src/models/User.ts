import mongoose from "mongoose";

// With this interface, we can allow typechecking user parameters to build a new user
interface UserAttrs {
    email: string;
    password: string;
}

/**
 * Extends the properties of the user model
 * adds a build method so typescript can type check
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
});

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);
// const User = mongoose.model<any, UserModel>('User', userSchema);

// add a method to mongoose User model
userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
}

const user = User.build({
    email: 'test@test.com',
    password: '123456'
});

export { User };