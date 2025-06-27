import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Todo {
  id: number;
  userId: number;
  todo: string;
  completed: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'https://dummyjson.com/todos';
  constructor(private http: HttpClient) { }
  getTodos(): Observable<{ todos: Todo[] }> {
    return this.http.get<{ todos: Todo[] }>(this.apiUrl);
  }
  deleteTodo(id: number) {
    return this.http.delete(`https://dummyjson.com/todos/${id}`);
  }

}
