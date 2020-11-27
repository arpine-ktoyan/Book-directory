import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppServiceService } from '../app-service.service';

@Component({
  selector: 'app-find-book',
  templateUrl: './find-book.component.html',
  styleUrls: ['./find-book.component.css']
})
export class FindBookComponent implements OnInit {
  currentBook: any = null;
  message = '';

  constructor(
    private service: AppServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.message = '';
    this.getTheBook(this.route.snapshot.paramMap.get('id'));
  }

  getTheBook(id: any): any {
    this.service.getBook(id)
      .subscribe(data => {
        this.currentBook = data;
      },
        error => {
          console.log(error);
        });
  }

  editBook(): any {
    this.service.updateBook(this.currentBook.id, this.currentBook).subscribe(response => {
      console.log(response);
      this.message = 'The book was updated';
    },
      error => {
        console.log(error);
      });
  }


  deleteBook(): any {
    this.service.deleteBook(this.currentBook.id)
      .subscribe();
    this.message = 'The book was deleted';
  }
}
