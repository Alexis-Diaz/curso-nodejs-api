import express from 'express'
import controller from '../controllers/blog.js'
import {protectedMid} from '../middleware/middleware.js'
const router = express.Router()

router.get('/', controller.list);
router.post('/', protectedMid, controller.newPost)//primero se llama la funcion protectedMid y si esta llama next pasa a la siguiente
router.get('/:id', controller.detail)//despues de los dos puntos express entiende que es un parametro

export default router
