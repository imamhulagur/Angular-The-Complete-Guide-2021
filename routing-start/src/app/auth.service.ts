export class AuthService {
    loggedIn = false;

    //to fake service a sit will take some time to authenticate, we ll write an promise here
    isAuthenticated() {
        const promise = new Promise(
            (resolve, reject)=> {
                setTimeout(()=> {
                    resolve(this.loggedIn);
                }, 800)
            }
        );
        return promise;
    }

    login() {
        this.loggedIn = true;
    }

    logout() {
        this.loggedIn = false;
    }
}