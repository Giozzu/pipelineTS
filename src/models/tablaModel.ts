import {Model,Sequelize} from 'sequelize';
import RelationalController from '../controllers/RelationalController';

interface VideogameAttributes {
    videogameId:number;
    name:string;
    price:number;
    rating:number;
}

module.exports = (sequelize:any,DataTypes:any) => {
    class Videogame extends Model<VideogameAttributes> implements VideogameAttributes{
        public videogameId!:number;
        public name!:string;
        public price!: number;
        public rating!:number;

        static associate(models:any){

        }

    }
    Videogame.init({
        videogameId:{
            type: DataTypes.INTEGER,
            allowNull:false,
            primaryKey: true,
            autoIncrement:true
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        price:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        rating:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    },{
        sequelize,
        modelName:'Videogame'
    });
    return Videogame;

}