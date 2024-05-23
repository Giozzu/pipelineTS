import { Request,Response } from "express";
import AbstractController from "./AbstractController";
import NOSQLModel from "../modelsNOSQL/tablaNOSQL";


class NoRelationalController extends AbstractController{
    //Singleton
    //Atributo de clase
    private static _instance: NoRelationalController;
    //Metodo de clase
    public static get instance():AbstractController{
        if(!this._instance){
            this._instance = new NoRelationalController("pato");
        }
        return this._instance;
    }
    //Declarar todas las rutas del controlador
    protected initRoutes(): void {
        this.router.post('/crearPato',this.postCrearPato.bind(this));
        this.router.get('/consultarPatos',this.getConsultaPato.bind(this));
        this.router.get('/testPato',this.getTestPato.bind(this));
        
    }
    private async getConsultaPato(req: Request,res: Response){
        try{
            const patos = await NOSQLModel.scan().exec().promise();
            console.log(patos);
            res.status(200).send(patos[0].Items);
        }catch(err){
            console.log(err)
            res.status(500).send('Internal server error'+err);
        }
    }
    

    private async postCrearPato(req: Request,res: Response){
        try{
            console.log(req.body);
            await NOSQLModel.create(req.body);
            console.log("Pato creado");
            res.status(200).send("<h1>Pato creado</h1>");
        }catch(err){
            console.log(err);
            res.status(500).send('Internal server error'+err);
        }
    }

    private getTestPato(req: Request,res: Response){
        try{
            console.log("Prueba exitosa");
            res.status(200).send("<h1>Prueba exitosa</h1>")
        }catch(error:any){
            console.log(error);
            res.status(500).send('Internal server error'+error);
        }
    }
}

export default NoRelationalController;