//authenticator
class Authenticator {
    constructor() {
        this.userExists = false;
        this.isUserPlayer = false;
    }

    doesUserExist() {
        return this.userExists;
    }
    
    isUserPlayer() {
        return this.isUserPlayer;
    }

    hash(password) {
        return password;
    }
    
    authenticateUser(username, password) {
        // hash(password): Hashes the password and returns the result. (It actually just returns the plain password at the moment.)
        var hashedPassword = this.hash(password);

        if (checkUsernamePassword(username, hashedPassword)) {
            this.userExists = true;
            if (isPlayer(username)) {
                this.isUserPlayer = true;
            } else {
                this.isUserPlayer = false;
            }
        } else {
            this.userExists = false;
        }
    }
}