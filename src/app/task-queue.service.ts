import {Injectable} from '@angular/core';
declare const TaskQueue: any;
window['queue'] = new TaskQueue(false);
@Injectable({ providedIn: 'root' })
export class TaskQueueService {
  queue = window['queue'];
  add() {
    console.log('add event...');
    // this.httpClient.post().subscribe(resp => {});
    
  }

  addTask(taskName, scope, argument) {
    const a = this.queue.addHandler(this.add, this, argument, 1, null);
  }
}
