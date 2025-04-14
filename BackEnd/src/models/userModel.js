    import mongoose from 'mongoose';

    const userSchema = new mongoose.Schema({
        username:{
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
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        userType: {
            type:String,
            enum:['concessionaire','monitor','operator'],
            default: 'concessionaire'
        },
    
    },{
        timestamps:true
    })

    export default mongoose.model('User', userSchema)