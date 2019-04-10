import { Component } from '@angular/core';

import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDo6KVvleXjLs2VQxL1AYvXtu__LEoa-dU",
  authDomain: "dev-site-2019.firebaseapp.com",
  databaseURL: "https://dev-site-2019.firebaseio.com",
  projectId: "dev-site-2019",
  storageBucket: "dev-site-2019.appspot.com",
  messagingSenderId: "280106823298"
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Our Blog';
  data = {
    posts: [],
    authors: {},
  };

  ngOnInit() {
    var self = this;

    firebase.initializeApp(config);
    firebase.database().ref('/').on('value', function(snapshot) {
      var snapshot_val = snapshot.val();
      self.data.authors = snapshot_val.author;

      for (var post_id in snapshot_val.post) {
        var post = snapshot_val.post[post_id];
        post.post_id = post_id;

        var author = self.data.authors[post.author_id];
        post.author = author.first_name + ' ' + author.last_name;

        var date = post.date;
        post.pretty_date = 'on ' + date.day_of_week + ', ' +
          date.date + ' ' +
          date.month + ' ' +
          date.year + ' at ' +
          date.hour + ':' +
          (date.minute < 10 ? '0' : '') + date.minute + ' ' +
          date.meridian;

        self.data.posts.push(post);
      }
    });
  }
}
