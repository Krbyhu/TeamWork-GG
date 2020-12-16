import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Title } from '@angular/platform-browser';
import { IUser } from 'src/app/models/Models';

import { AuthService } from '../../../services/user/auth.service'
import { ValidationService } from '../../../services/validation/validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  data: any = []
  user: IUser = {
    correo: '',
    nombre_usuario: '',
    contrasena: '',
  };

  check = false;

  constructor(private authService: AuthService, private validationService: ValidationService, private router: Router, private title: Title, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.title.setTitle('Regístrate en TeamWork GG');
  }

  registerUser() {
    if(!this.validationService.validateRegister(this.user)){
      this.flashMessage.show('Completa todos los campos', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if(!this.validationService.validateEmail(this.user.correo)){
      this.flashMessage.show('Ingresa un correo valido', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if(!this.check){
      this.flashMessage.show('Debes aceptar los términos y condiciones', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    this.authService.logUp(this.user).subscribe(
      res => {
        this.data = res;
        localStorage.setItem('nombre_usuario', this.data.nombre_usuario);
        localStorage.setItem('img', this.data.img);
        localStorage.setItem('id_perfil', this.data.id_perfil);
        this.router.navigate(['/profile', this.data.id_perfil]);
      },
      err => this.flashMessage.show(err.error, {cssClass: 'alert-danger', timeout: 3000})
    )
  }

  checkbox(value: any) {
    if(value.currentTarget.checked == true) {
      this.check = true;
    } else {
      this.check = false;
    }
  }
}
