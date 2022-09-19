import { Component, HostBinding, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Game } from 'src/app/Interfaces/Game';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-list-game',
  templateUrl: './list-game.component.html',
  styleUrls: ['./list-game.component.css']
})
export class ListGameComponent implements OnInit {

  @HostBinding('class') classes = 'row'
  listGames: Game[] = [];
  filterGame!: '';

  constructor(private _gamesServices: GamesService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getGames();
  }

  getGames() {
    this._gamesServices.getListGames().subscribe({
      next: data => {
        this.listGames = data;
      },
      error: error => {
        console.log(error);
      }
    })
  }

  deleteGame(id: any) {
    this._gamesServices.deleteGame(id).subscribe({
      next: () => {
        this.toastr.error('Juego eliminado exitosamente', 'Registro Eliminado!');
        this.getGames();
      },
      error: error => {
        this.toastr.error('Opss... ocurrio un error!', 'Error');
        console.log(error);
      }
    })
  }

}
