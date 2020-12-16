import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { IUser, IProfile } from 'src/app/models/Models';

import { AuthService } from '../../../../services/user/auth.service';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit {


  data: any = [];

  user: IUser = {
    nombre_usuario: '',
    correo: ''
  }

  profile: IProfile = {
    descripcion: '',
    img: ''
  }

  socialNet = {
    facebook: 'username',
    insta: 'username',
    twitter: '@username'
  }


  constructor(private authService: AuthService, private router: Router, private title: Title, private activedRoute: ActivatedRoute) { }

  params = this.activedRoute.snapshot.params;
  
  ngOnInit() {
    this.title.setTitle('Editar perfil');
    if (this.params.id) {
      this.authService.profile(this.params.id).subscribe(
        res => {
          this.data = res;
          this.user.correo = this.data.correo;
          this.user.nombre_usuario = this.data.nombre_usuario;
          this.profile.descripcion = this.data.descripcion;
          this.profile.img = this.data.img;
        },
        err => console.error(err)
      )
    }
  }

  url = ''
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = reader.result as string;
      }
    }
  }

  updateProfile() {
    this.authService.updateProfile(this.data.id_perfil, this.user, this.profile).subscribe(
      res => {
        this.router.navigate(['/profile', this.data.id_perfil]);
      },  
      err => console.log(err)
    )
  }

  get id(): any {
    return localStorage.getItem('id_perfil');
  }
}
