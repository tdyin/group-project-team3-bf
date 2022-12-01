namespace NodeJS {
    interface ProcessEnv {
        MONGO_URL: string;
        PORT: number;
        JWT_KEY: string;
        AWS_ACCESS_KEY_ID: string;
        AWS_SECRET_ACCESS_KEY: string;
        EMAIL_ADDRESS: string,
        EMAIL_PASS: string;
    }
}
//File to allow process.env to be used