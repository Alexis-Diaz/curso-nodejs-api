import Post from '../models/post.js'

export const list = async (req, res)=>{
    try{
        const list = await Post.find()
        return res.send({status:"succes", post:list})
    }catch{
        return res.status(500).send({status:"error", message:"something went wrong"})
    }  
}

export const newPost = async (req,res) => {
    const post = new Post(req.body.title, req.body.body, req.userId)//se crea una instancia del modelo creado
    try{
        const savedPost = await post.save()
        return res.send({status:"succes", createdPost:savedPost})
    }catch(err){
        return res.status(500).send({status:"error", message:"something went wrong"})
    }
}

export const detail = async (req,res) => {
    try{
        const {found,post} = await Post.findById(req.params.id)
        if (!found) return res.status(404).send({status:"error",message:`Post not found whit id ${req.params.id}`});
        return res.send({status:"success", post:post})
    }catch(err){
        return res.status(500).send({status:"error", message:"something went wrong"})
    }
}

export const deletePost = (req, res)=>{
    return res.json({})
}

export const updatePost=(req, res)=>{
    
}
export default {newPost, detail, list}