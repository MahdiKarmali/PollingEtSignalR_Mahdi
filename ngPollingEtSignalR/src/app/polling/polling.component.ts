import { Component, OnInit } from '@angular/core';
import { UselessTask } from '../models/UselessTask';
import { HttpClient, HttpParams } from '@angular/common/http';
import { interval } from 'rxjs';

@Component({
  selector: 'app-polling',
  templateUrl: './polling.component.html',
  styleUrls: ['./polling.component.css']
})
export class PollingComponent implements OnInit {

  title = 'labo.signalr.ng';
  tasks: UselessTask[] = [];
  taskname: string = "";
  private apiUrl = 'http://localhost:7289/api/UselessTasks';

  constructor(private http:HttpClient){}

  ngOnInit(): void {
    this.updateTasks();

    interval(1000).subscribe(() => {
      this.updateTasks();
    });
  }

  complete(id: number) {
    // TODO On invoke la méthode pour compléter une tâche sur le serveur (Contrôleur d'API)
    this.http.get(`${this.apiUrl}/Complete/${id}`)
      .subscribe(() => {
        this.updateTasks(); // Mise à jour des tâches après la complétion
      });
  }

  addtask() {
    // TODO On invoke la méthode pour ajouter une tâche sur le serveur (Contrôleur d'API)
    if (this.taskname.trim() !== "") {
      this.http.post(`${this.apiUrl}/Add`, null, { params: { taskText: this.taskname } })
        .subscribe(() => {
          this.taskname = ''; // Réinitialiser le nom de la tâche après l'ajout
          this.updateTasks(); // Mise à jour des tâches après l'ajout
        });
    }
  }

  updateTasks() {
    // TODO: Faire une première implémentation simple avec un appel au serveur pour obtenir la liste des tâches
    // TODO: UNE FOIS QUE VOUS AVEZ TESTER AVEC DEUX CLIENTS: Utiliser le polling pour mettre la liste de tasks à jour chaque seconde
    this.http.get<UselessTask[]>(`${this.apiUrl}/GetAll`)
      .subscribe((tasks) => {
        this.tasks = tasks;
      });
  }
  
}
