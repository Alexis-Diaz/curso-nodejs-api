import User from '../models/user.js'

export const getUser = (req, res) => {

}

export const updateUser = (req, res) => {
    
}

export const deleteUser = (req, res) => {
    try{
        const deletedUser = User.deleteUserById(req.params.id);
        return res.send({status:"success", deletedUser:deletedUser})
    }catch{
        return res.send({status:"error", message:"something went wrong"})
    }
}

export default {getUser,updateUser, deleteUser}