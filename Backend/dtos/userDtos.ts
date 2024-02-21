import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class RegistrationDTO {
    email: string;
    password: string;
    username: string;
    
    constructor(email: string, password: string, username: string) {
        this.email = email;
        this.password = password;
        this.username = username;
    }
}

export class LoginDTO {
    email: string;
    password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}