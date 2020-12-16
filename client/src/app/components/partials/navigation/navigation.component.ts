import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/user/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  img: string;

  constructor(private authService: AuthService, private _router: Router) {}

  ngOnInit() {
    this.img = this.readImg('img');
  }

  logOut(){
    this.authService.logOut();
    this._router.navigate(['/']);
  }


  get nombre_usuario(): any {
    return localStorage.getItem('nombre_usuario');
  }

  get id(): any {
    return localStorage.getItem('id_perfil');
  }

  readImg(key: string) {
    return localStorage.getItem(key);
  }


}
