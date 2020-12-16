import { Injectable } from '@angular/core';

import * as Model from '../../models/Models';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  validateRegister(user: Model.IUser){
    if(user.correo == '' || user.nombre_usuario == '' || user.contrasena == '') {
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email: any){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}

