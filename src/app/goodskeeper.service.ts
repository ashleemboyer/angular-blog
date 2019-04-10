import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { ɵangular_packages_core_testing_testing_a } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class GoodskeeperService {
  db = firebase.database();

  constructor() { }

  getPrettyDate(date_object): String {
    return 'on ' + date_object.day_of_week + ', ' +
      date_object.date + ' ' +
      date_object.month + ' ' +
      date_object.year + ' at ' +
      date_object.hour + ':' +
      (date_object.minute < 10 ? '0' : '') + date_object.minute + ' ' +
      date_object.meridian;
  }

  getPostByUrl(url): Observable<any> {
    return new Observable(observer => {
      this.db.ref('/post/' + url).on('value', post_snapshot => {
        var post = post_snapshot.val();
        
        this.db.ref('/author/' + post.author_id).on('value', author_snapshot => {
          var author = author_snapshot.val();
          post.author = author.first_name + ' ' + author.last_name;
          observer.next(post);
        });
      });
    });
  }

  getPosts(): Observable<any> {
    return new Observable(observer => {
      this.db.ref('/author').on('value', author_snapshot => {
        var authors = author_snapshot.val();

        this.db.ref('/post').on('value', post_snapshot => {
          var result = [];

          var posts = post_snapshot.val();
          for (var post_url in posts) {
            var post = posts[post_url];

            var author = authors[post.author_id];
            post.author = author.first_name + ' ' + author.last_name;

            result.push(post);
          }

          // most to least recently published
          result.sort((a, b) => {
            var a_date = new Date(
              a.date.month + ' ' +
              a.date.date + ' ,' +
              a.date.year + ' ' +
              a.date.hour + ':' +
              (a.date.minute < 10 ? '0' : '') +
              a.date.minute
            );

            var b_date = new Date(
              b.date.month + ' ' +
              b.date.date + ' ,' +
              b.date.year + ' ' +
              b.date.hour + ':' +
              (b.date.minute < 10 ? '0' : '') +
              b.date.minute
            );

            return (
              b_date.getMilliseconds() -
              a_date.getMilliseconds()
            );
          });

          observer.next(result);
        });
      });

      // this.db.ref('/post').on('value', post_snapshot => {
      //   var posts = post_snapshot.val();
      // });
    })
  }
}
