import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TaskQueueService} from './task-queue.service';
declare const TaskQueue: any;
const queue = new TaskQueue();
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private httpClient: HttpClient, private taskQueueService: TaskQueueService) {}

  add() {
    console.log('add event...');
    // this.httpClient.post().subscribe(resp => {});
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(true), 3000);
    });
  }

  query() {
    console.log('query event...');
  }

  edit() {
    console.log('edit event...');
  }

  delete() {
    console.log('delete event...');
  }

  addTask() {
    console.log(queue);
    const a = queue.addHandler(this.add, 1, function() {
      console.log('add over1');
    });
    console.log(a);
  }

  queryTask() {
    console.log(this.taskQueueService.queue);
  }

  startTask() {
    // this.taskQueueService.queue.run();
  }
  startTaskForWorker() {
    const worker = new Worker('/assets/testfw.js');
    worker.postMessage('hello 发我');
  }
}
