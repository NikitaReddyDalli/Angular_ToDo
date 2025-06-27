import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  displayedColumns: string[] = ['id', 'userId', 'todo', 'action'];
  loading = true;
  currentFilter: 'all' | 'completed' | 'pending' = 'all';
  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    console.log('Component loaded');
    this.todoService.getTodos().subscribe({
      next: (data) => {
        console.log('✅ Todos fetched:', data.todos);
        this.todos = data.todos;
        this.filterTodos('all');  // Set default view
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error fetching todos:', err);
        this.loading = false;
      }
    });
  }


  filterTodos(status: 'all' | 'completed' | 'pending') {
    this.currentFilter = status;  // 👈 store the current filter
    console.log('Filtering by:', status);
    if (status === 'all') {
      this.filteredTodos = this.todos;
    } else if (status === 'completed') {
      this.filteredTodos = this.todos.filter(todo => todo.completed === true);
    } else {
      this.filteredTodos = this.todos.filter(todo => todo.completed === false);
    }
  }


  deleteTodo(id: number) {
    const confirmed = confirm('Are you sure you want to delete this to-do?');
    if (confirmed) {
      this.todoService.deleteTodo(id).subscribe({
        next: () => {
          this.todos = this.todos.filter(todo => todo.id !== id);
          this.filterTodos(this.currentFilter);  // 👈 refresh filtered list
          alert('To-do deleted successfully.');

        },
        error: () => {
          alert('Failed to delete the to-do.');
        }
      });

    }
    else {
      alert('Deletion cancelled.');
    }
  }
}