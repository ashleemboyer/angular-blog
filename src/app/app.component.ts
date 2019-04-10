import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { Router, NavigationEnd } from '@angular/router';

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

  constructor(private router: Router) { }

  ngOnInit() {
    firebase.initializeApp(config);
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  goHome() {
    this.router.navigate(['']);
  }
}
