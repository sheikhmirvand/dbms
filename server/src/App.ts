import express,{Application} from 'express';
import dbRouter from './routes/db.router'
import cors from 'cors';

export class App {
    private app : Application;
    private port : number;
    constructor(port : number) {
        this.app = express();
        this.port = port
    }
    
    startApp () {
        this.app.use(cors({origin : "http://localhost:4200"}))
        this.app.use(express.json())
        this.app.use('/db',dbRouter)
        this.app.listen(this.port,()=>console.log(`app running on ${this.port} port`))
    }
}