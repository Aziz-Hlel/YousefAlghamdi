

declare global {
    
    
    namespace NodeJS{
        interface ProcessEnv{
            NODE_ENV: 'development' | 'production' | 'test' ;
            PORT:number;
            MONGO_URI:string;
            JWT_SECRET:string;
        }
    }


    // namespace Express
}