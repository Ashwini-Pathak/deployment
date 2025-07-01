const ERROR_CLASS_NAMES = {
    AUTHENTICATION_ERROR : "AuthenticationError",
    EXTERNAL_ERROR : "ExternalError"
};

export class AuthenticationError extends Error {
    constructor(message, metadata, ...params){
        super(...params);
        if(Error.captureStackTrace){
            Error.captureStackTrace(this,AuthenticationError);
        }

        this.name = ERROR_CLASS_NAMES.AUTHENTICATION_ERROR;

        this.message = message;
        this.metadata = metadata || {};
        this.date = new Date().toLocaleString();
    }
}

export class ExternalError extends Error {
    constructor(message, metadata, ...params){
        super(...params);

        if(Error.captureStackTrace){
            Error.captureStackTrace(this,ExternalError);
        }

        this.name = ERROR_CLASS_NAMES.EXTERNAL_ERROR;

        this.message = message;
        this.metadata = metadata || {};
        this.date = new Date().toLocaleString();
    }
}