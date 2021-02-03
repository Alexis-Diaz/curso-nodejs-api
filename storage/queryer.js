import {pool} from './pool.js';

pool.on('connect', ()=>{
    console.log("DB Connected");
});

export default{
    //esto es para anotar los tipos de parametros que recibe el metodo
    /**
     * 
     * @param {String} query 
     * @param {Array?} params 
     * @returns {Promise} the result of the query
     */
    exec (query, ...params){
        return pool.query(query, [...params]);
    }
}
