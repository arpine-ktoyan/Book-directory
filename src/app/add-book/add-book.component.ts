import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../app-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  book: {
    title: '',
    author: ''
  };
  myForm: FormGroup;
  submitted = false;

  constructor(private service: AppServiceService) {
    this.myForm = new FormGroup({
      title: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }

  saveBook(): void {
    this.book = this.myForm.value;

    console.log(this.book.title);

    this.service.addBook(this.book)
      .subscribe(response => {
        console.log(response);
        this.submitted = true;
      },
        error => {
          console.log(error);
        });
  }

  newBook(): void {
    this.submitted = false;
    this.book = {
      title: '',
      author: ''
    };
  }
}
