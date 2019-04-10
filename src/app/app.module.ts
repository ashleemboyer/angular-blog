import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';

import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './posts/posts.component';

const appRoutes: Routes = [
  {
    path: 'posts',
    component: PostsComponent,
  },
  {
    path: ':post-url',
    component: PostComponent,
  },
  {
    path: '',
    redirectTo: '/posts',
    pathMatch: 'full',
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PostsComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
