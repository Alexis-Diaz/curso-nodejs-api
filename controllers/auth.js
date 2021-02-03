import User from '../models/user.js'

import {sendVerificatioEmail} from '../services/mailer.js'
import {newAuthToken, newToken, verify} from '../services/token.js'



export const refreshToken=(req,res)=>{
    return res.json({})
}

export const register = async (req, res) => {
    const {fullname, email, password} = req.body;
    const userToSave = new User(firstName, lastName, email, password)
    try{
        const savedUser = await userToSave.save();
        sendVerificatioEmail(savedUser)
        return res.send({user:savedUser, token: newAuthToken(savedUser.id)})
    }catch (err){
        return res.status(500).send({status:"error", message:"Something went wrong"})
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;
    if(email === "" || password === ""){
      return res.status(400).send({message:"Invalid credentials"})
    }
    try{
        const {valid, found, user} = await User.findByEmailAndComparePassword(email, password)
        if(!valid) return res.status(400).send({status:"error", message:"Invalid credentials"});
        if(!found) return res.status(404).send({status:"error", message:"User not found"});
        return res.send({user:user, token:newAuthToken(user.id)})
    }catch(err){
        return res.status(500).send({status:"error", message:"Something went wrong"})
    }
}

//esta funcion sirve para verificar el token por medio del enlace enviado al correo del usuario
export const renderHomeEmailVerification = (req, res) => {//se ha usado query params para estraer el valor del token se usa req.query.nombreDelParametro
    const userVerification = verify(req.query.token)
    if(userVerification.valid === false && userVerification.key === null){
     
    }else{
        User.findById(userVerification.key, (err, users) =>{
           
            User.updateOne({_id:users._id},{emailVerified:true})
            .then(
               
            )
            .catch( error =>{
              
            })
        })
    }
}
export default {register, login, renderHomeEmailVerification}