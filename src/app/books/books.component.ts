import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../app-service.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: any;
  currentBook: any;
  currentIndex = -1;
  message = '';
  idOfBook: any;
  visibleAll = true;

  constructor(private service: AppServiceService) { }

  ngOnInit(): void {
    this.showAllBooks();
  }

  getAllBooksFromApi(): any {
    this.service.getAllBooks()
      .subscribe((response: any) => {
        this.books = response;
      },
        error => {
          console.log('Error is ', error);
        });
  }

  showAllBooks(): any {
    this.getAllBooksFromApi();
    this.visibleAll = true;
  }

  hideAllBooks(): any {
    this.visibleAll = false;
    this.books = null;
  }

  refreshList(): void {
    this.getAllBooksFromApi();
    this.currentBook = null;
    this.currentIndex = -1;
  }

  setActiveBook(book: any, index: any): void {
    this.currentBook = book;
    this.currentIndex = index;
  }

  searchId(id: any): any {
    this.message = '';
    id = this.idOfBook;
    this.service.getBook(id)
      .subscribe(data => {
        this.currentBook = data;
      },
        error => {
          this.message = 'No such book';
          console.log(error);
        });
  }

}
