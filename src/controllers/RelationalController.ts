import { Request,Response } from "express";
import AbstractController from "./AbstractController";
import db from "../models";

class RelationalController extends AbstractController{
    //Singleton
    //Atributo de clase
    private static _instance: RelationalController;
    //Metodo de clase
    public static get instance():AbstractController{
        if(!this._instance){
            this._instance = new RelationalController("Videojuego");
        }
        return this._instance;
    }
    //Declarar todas las rutas del controlador
    protected initRoutes(): void {
        this.router.get('/testagent',this.getTestAgent.bind(this));
        this.router.get('/consultarVideojuegos',this.getConsultarVideojuegos.bind(this));
        this.router.post('/crearVideojuego',this.postCrearVideojuego.bind(this));
    }

    private async postCrearVideojuego(req: Request,res: Response){
        try{
            console.log(req.body);
            await db.Videogame.create(req.body); //INSERT
            console.log("Videojuego creado");
            res.status(200).send("<h1>Videojuego creado</h1>");

        }catch(error:any){
            console.log(error);
            res.status(500).send('Internal server error'+error);
        }
    }

    private async getConsultarVideojuegos(req: Request,res: Response){
        try{
            console.log("Consultar videojuegos");
            let videojuegos = await db["Videogame"].findAll(); //SELECT * FROM Agente;
            res.status(200).json(videojuegos);

        }catch(error:any){
            console.log(error);
            res.status(500).send('Internal server error'+error);
        }
    }
    //Metodos de instancia
    private getTestAgent(req: Request,res: Response){
        try{
            console.log("Prueba exitosa");
            res.status(200).send("<h1>Prueba exitosa</h1>")
        }catch(error:any){
            console.log(error);
            res.status(500).send('Internal server error'+error);
        }
    }

}

export default RelationalController;