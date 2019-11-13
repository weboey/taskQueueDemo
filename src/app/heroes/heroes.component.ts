import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import {TaskQueueService} from '../task-queue.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];

  constructor(private heroService: HeroService, private taskQueueService: TaskQueueService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }
  addAync(name: string) {
    this.taskQueueService.addTask(this.add, this, [name, '参数A', '参数B']);
  }
  add(name: string, b, c) {
    console.log('增加英雄任务');
    console.log(this);
    console.log(name, b, c);
    return new Promise((resolve, reject) => {
      // debugger;
      this.heroService.addHero({ name } as Hero)
        .subscribe(hero => {
          this.heroes.push(hero);
          resolve(true);
        });
    });

  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

}
