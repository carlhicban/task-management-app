import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private dbPath = '/tasks';
  tasksRef: AngularFirestoreCollection<Task>;

  constructor(private db: AngularFirestore) {
    this.tasksRef = db.collection<Task>(this.dbPath);
  }

  getAll(): Observable<Task[]> {
    return this.tasksRef.valueChanges({ idField: 'id' });
  }

  create(task: Task): Promise<void> {
    return this.tasksRef.add(task).then(() => { }); // or return this.tasksRef.add(task).then(() => {});
  }  

  update(id: string, task: Task): Promise<void> {
    return this.tasksRef.doc(id).update(task);
  }

  delete(id: string): Promise<void> {
    return this.tasksRef.doc(id).delete();
  }

  deleteAll(): Promise<void> {
    return this.tasksRef.doc().delete();
  }
}
