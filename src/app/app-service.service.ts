import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Book {
  title: string;
  author: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('/api/books');
  }

  getBook(id: any): Observable<Book> {
    return this.http.get<Book>(`/api/books/${id}`);
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>('/api/books', book);
  }

  updateBook(id: any, book: Book): Observable<any> {
    return this.http.put(`/api/books/${id}`, book);
  }

  deleteBook(id: any): any {
    return this.http.delete(`/api/books/${id}`);
  }
}
