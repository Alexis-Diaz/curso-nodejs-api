import express from 'express'//Para crear el servidor, se instala aparte
import dotenv from 'dotenv'//libreria que sirve para crear variables globales, se instala aparte
import blogRouter from './routes/blog.js'
import contactRouter from './routes/contact.js'
import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'

dotenv.config()//busca un archivo .env vera lo que hay adentro y creara variables de entorno

const server = express();
server.use(express.json());
server.use('/auth', authRouter);
server.use('user',userRouter );
server.use('/blog', blogRouter);
server.use('/contact', contactRouter)

server.listen(8000);