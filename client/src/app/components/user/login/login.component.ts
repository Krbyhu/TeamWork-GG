import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Title } from '@angular/platform-browser';
import { IUser } from 'src/app/models/Models';

import { AuthService } from '../../../services/user/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  data: any = []
  user: IUser = {
    correo: '',
    contrasena: '',
  };

  constructor(private authService: AuthService, private router: Router, private title: Title, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.title.setTitle('Inicia sesión en TeamWork GG');
  }

  loginUser() {
    this.authService.logIn(this.user).subscribe(
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

}
