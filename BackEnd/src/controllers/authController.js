import User from '../models/userModel.js'

export const register = async (req, res) => {
    const{email, password,userName} = req.body; 
    try{
        // GUardar el usuario pero solo en el back, sin irse a la base de datos
        const newUser = new User({
            email,
            password,
            userName
        });
        
        await newUser.save()
        res.send('registrando');
    }catch(error){
        console.log(error)
    }

};

export const login = (req, res) => {
    res.send('login');
};
