import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { GoodskeeperService } from '../goodskeeper.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts = [];

  constructor(
    private goodskeeper: GoodskeeperService,
    private router: Router
  ) { }

  ngOnInit() {
    this.goodskeeper.getPosts().subscribe(res => {
      this.posts = res;
    });
  }

  openPost(post) {
    this.router.navigate([post.url]);
  }
}
