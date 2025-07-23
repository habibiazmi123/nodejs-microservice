import mongoose, { Document, Schema } from "mongoose";
import { Password } from "../services/password";

interface IUserBase {
    email: string;
    password: string;
}

export interface IUserInput extends IUserBase {}

export interface IUserDocument extends IUserBase, Document {
    createdAt: string;
    updatedAt: string;
}

const userSchema: Schema<IUserDocument> = new Schema<IUserDocument>({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
}, 
{
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
});

userSchema.pre('save', async function(done) {
    if(this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'))
        this.set('password', hashed)
    }
    done();
})

export const UserModel = mongoose.model<IUserDocument>('User', userSchema);
