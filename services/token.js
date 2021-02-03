import crypto from 'crypto';//se parece a bcryp pero tiene mas funcionalidad
import jwt from 'jsonwebtoken';

//CREACION DE UN TOKEN DE VERIFICACION
const tokenSecret = "j0mvfn3JH9NHL6hjs"//valor random
const delimiter = "||"
const milisegundos = 1;
const segundos = milisegundos * 1000;
const minutos = segundos * 60;
const maxAgeMinutes = minutos * 120;//fecha de expiracion en minutos


//key es el id del usuario pero puede ser cualquier otra cosa
export const newToken = (key) => {
    //investigar que es sha256
    const hash = crypto.createHmac("sha256", tokenSecret)
    const timestamp = Date.now().toString()//se captura la fecha actual en milisegundos desde 1970
    const toHmac = key + timestamp;//se une el id mas el tiempo
    const sha = hash.update(toHmac).digest('hex')
    const toEncode = sha + delimiter + key + delimiter + timestamp
    return Buffer.from(toEncode).toString('base64');
}

export const verify = (token) => {
    const decoded = Buffer.from(token, 'base64').toString();
    const [hash, key, timestamp] = decoded.split(delimiter);
    const tiempoTranscurrido = Date.now().toString() - timestamp;
    let minutosTranscurridos = tiempoTranscurrido/1000/60;
    if(tiempoTranscurrido > maxAgeMinutes) {
        console.log ("el tiempo caduco, es de: " + minutosTranscurridos + " minutos")
        return {valid:false, key:null}
    }
    const toCompare = crypto.createHmac('sha256', tokenSecret).update(key + timestamp).digest('hex');
    const valid = toCompare === hash
    return {valid,key}
}

export const newAuthToken = userId => {
    const auth = jwt.sign({role:"auth",userId}, tokenSecret, {expiresIn:"1h"});
    const refresh = jwt.sign({role:"refresh", userId}, tokenSecret, {expiresIn:"7d"});
    return {auth, refresh}
}

export const verifyAuthToken = token => {
    try{
        const decoded = jwt.verify(token, tokenSecret);
        return {error:null, decoded:decoded}
    }catch (err) {
        return {error:err, decoded:null}
    }
}