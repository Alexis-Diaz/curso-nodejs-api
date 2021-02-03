export const parseBody = (req, res, next)=>{
    let datos = '';
    req.on('data', pedazoDeDatos =>{
        datos += pedazoDeDatos
    })
    req.on('end', ()=>{
        const jsonBody = JSON.parse(datos)
        req.body = jsonBody
        next()
    })
}

//esta funcion se llama entre funciones y lo que hace es revisar si hay sesion
//esta funcion sirve para proteger rutas
export const protectedMid = (req, res, next) => {
   
    if( !req.session){
        
    }else if( req.session.userId !== undefined){
        next();//next da paso a la siguiente funcion que esta en la ruta (ver routes/blog)
    }else{
        const error = 0;
       
    }
}