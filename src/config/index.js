import dotenv from 'dotenv';
dotenv.config();


const config = {
    appUrl: process.env.APP_URL||"",
    port: process.env.PORT || 5000,
    name: process.env.APP_NAME || "lelekomart backend",
    version: process.env.APP_VERSION || '0.1.0',
    mongoUrl: process.env.MONGO_URL,
    jwtSecret: process.env.JWT_SECRET || 'secret',
   
    
    email: {
        apiKey: process.env.EMAIL_API_KEY,
    },
    khalti: {
        apiKey: process.env.KHALTI_API_KEY,
        apiUrl: process.env.KHALTI_API_URL,
        returnUrl: process.env.KHALTI_RETURN_URL,
    }
};

export default config;
