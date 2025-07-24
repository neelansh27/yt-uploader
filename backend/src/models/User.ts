import mongoose from "mongoose";

export interface UserType extends mongoose.Document {
    googleId: string,
    name: string,
    email: string,
    avatar?: string,
    accessToken: string,
    refreshToken?: string
}

const UserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    accessToken: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String
    }
}, { timestamps: true });

export const User = mongoose.model<UserType>('User', UserSchema);
