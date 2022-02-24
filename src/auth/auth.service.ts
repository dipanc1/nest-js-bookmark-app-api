import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService{

    signup(){
        return {msg:'jatt ne signup kita4'};
    }

    signin(){
        return {msg:'jatt ne SIGNNIN kita'};
    }
}