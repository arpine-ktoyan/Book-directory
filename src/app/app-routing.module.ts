import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { BooksComponent } from './books/books.component';
import { FindBookComponent } from './find-book/find-book.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'books', pathMatch: 'full'
  },
  {
    path: 'books',
    component: BooksComponent
  },
  {
    path: 'books/:id',
    component: FindBookComponent
  },
  {
    path: 'add',
    component: AddBookComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
