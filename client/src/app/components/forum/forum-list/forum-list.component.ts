import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ForumService } from '../../../services/forum/forum.service';

@Component({
  selector: 'app-forum-list',
  templateUrl: './forum-list.component.html',
  styleUrls: ['./forum-list.component.css']
})
export class ForumListComponent implements OnInit {

  posts: any = [];

  constructor(private forumService: ForumService, private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Foro');
    this.getPosts();
  }

  getPosts() {
    this.forumService.getPosts().subscribe(
      res => {
        this.posts = res;
        console.log(this.posts)
      },
      err => console.error(err)
    );
  }

}
