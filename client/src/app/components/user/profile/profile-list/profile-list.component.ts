import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { AuthService } from '../../../../services/user/auth.service';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css']
})
export class ProfileListComponent implements OnInit {

  data: any = [];


  constructor(private authService: AuthService, private router: Router, private title: Title, private activedRoute: ActivatedRoute) { }

  params = this.activedRoute.snapshot.params;

  ngOnInit() {
    this.title.setTitle('Perfil');
    if (this.params.id) {
      this.authService.profile(this.params.id).subscribe(
        res => {
          this.data = res;
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

}
