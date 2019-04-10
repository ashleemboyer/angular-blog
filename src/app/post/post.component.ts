import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoodskeeperService } from '../goodskeeper.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post = {
    name: null,
    author: null,
    pretty_date: null,
    intro: null,
    image_url: null,
    content: null,
  };

  constructor(
    private route: ActivatedRoute,
    private goodskeeper: GoodskeeperService
  ) { }

  ngOnInit() {
    var post_url = this.route.snapshot.params['post-url'];
    this.goodskeeper.getPostByUrl(post_url).subscribe(res => {
      res.pretty_date = this.goodskeeper.getPrettyDate(res.date);
      this.post = res;
    });
  }

}
