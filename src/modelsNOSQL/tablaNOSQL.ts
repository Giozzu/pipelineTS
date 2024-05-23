import dynamodb from "../services/dynamoService";
import joi from 'joi';
import {PREFIX_NAME} from '../config';

const NOSQLModel = dynamodb.define('Pato',{
    hashKey:'PatoId',
    timestamps:false,
    schema:{
        PatoId:dynamodb.types.uuid(),
        Nombre:joi.string(),
        Precio:joi.number()
    },
    tableName:`Patos${PREFIX_NAME}`
});

dynamodb.createTables((err)=>{
    if(err)
        return console.log(err);
    console.log('Tabla de patos creada exitosamente')
})


export default NOSQLModel;