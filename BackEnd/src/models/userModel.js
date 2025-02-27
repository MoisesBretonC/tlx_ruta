import mongoose from 'mongoose';
import { unique } from 'next/dist/build/utils';


mongoose.Schema({
    userName:{
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
})

export default mongoose.model('User', userSchema)