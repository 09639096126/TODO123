import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { initSUpabase } from './utils/initSUpabase'; // Fix the typo here
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  supabase: SupabaseClient = createClient(initSUpabase.supabseUrl, initSUpabase.supabaseKey);

  constructor() { }

  async ApiaddTodo(todo: Todo) {
    return await this.supabase
      .from('todos')
      .insert([todo]);
  }

  async ApiViewTodos() {
    return await this.supabase
      .from('todos')
      .select('*');
  }

  async ApideleteTodo(todoId: number) {
    return await this.supabase
      .from('todos')
      .delete()
      .eq('id', todoId);
  }

  async ApiUpdateTodo(todo: Todo) {
    return await this.supabase
      .from('todos')
      .update(todo)
      .eq('id', todo.id);
  }
}
