import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { IForum, IUser } from 'src/app/models/Models';

import { ForumService } from '../../../services/forum/forum.service';

@Component({
  selector: 'app-forum-form',
  templateUrl: './forum-form.component.html',
  styleUrls: ['./forum-form.component.css']
})
export class ForumFormComponent implements OnInit {

  id: any = '';

  user: IUser = {
    nombre_usuario: localStorage.getItem('nombre_usuario')
  }

  forum: IForum = {
    id_foro: 0,
    titulo: '',
    cuerpo: ''

  }

  constructor(private forumService: ForumService, private title: Title, private router: Router) { }

  ngOnInit() {
    this.title.setTitle('Nuevo post');
    this.getID();
  }

  getID() {
    this.forumService.getID().subscribe(
      res => {
        this.id = res;
        this.forum.id_foro = this.id[0].id + 1;
      },
      err => console.error(err)
    );
  }
  
  newPost(){
    this.forumService.newPost(this.forum, this.user).subscribe(
      res => {
        this.router.navigate(['/forum']);
      },  
      err => console.log(err)
    )
  }
}
