import * as firebase from 'firebase';
import {Injectable} from '@angular/core';
import { error } from '@angular/compiler/src/util';

@Injectable()

export class AuthService{


    signUp(email:string,password:string){
        firebase.auth().createUserWithEmailAndPassword(email,password).catch(
        );
    }
    login(email:string,password:string){
        firebase.auth().signInWithEmailAndPassword(email,password).then(
            response=>console.log(response)
        ).catch(
            
        );
    }
}
