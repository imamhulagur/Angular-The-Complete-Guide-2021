export class User {
    //here we are using type scripts shortcut of automatically storing arguments of the constructor in properties fo the class by adding accessor in front of the property name
    //private - we should not give permission to user to access token without checking vulnerability of the user.
    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _tokenExpirationDate
    ){}

    //here we are using OOP JS class concepts
    get token() {
        //before returning token check the user
        //does not exist and token created in the past
        if(!this._tokenExpirationDate && new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }
}