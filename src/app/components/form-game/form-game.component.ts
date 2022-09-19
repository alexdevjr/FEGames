import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Game } from 'src/app/Interfaces/Game';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-form-game',
  templateUrl: './form-game.component.html',
  styleUrls: ['./form-game.component.css']
})
export class FormGameComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  form: FormGroup;
  id: number;

  game: Game = {
    title: '',
    description: '',
    image: '',
    created_at: new Date(),
  }

  constructor(private fb: FormBuilder,
              private _gamesServices: GamesService,
              private router: Router,
              private aRoute: ActivatedRoute,
              private toastr: ToastrService) { 
                
        this.form = this.fb.group({
          title: ['', Validators.required],
          description: ['', Validators.required],
          image: ['', Validators.required],
          created_at: ['']
        })
      this.id = +this.aRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    if(this.id != 0) {
      this.edit(this.id);
    }
  }

  edit(id: number) {
    this._gamesServices.getGame(id).subscribe(data => {
      this.form.patchValue({
        title: data.title,
        description: data.description,
        image: data.image,
        created_at: data.created_at
      })
    })
  }

  addEditGame() {
    const game: Game = {
      title: this.form.value.title,
      description: this.form.value.description,
      image: this.form.value.image,
      created_at: this.form.value.created_at
    }
    if(this.id != 0){
      game.id = this.id;
      this.editGame(this.id, game);
    } else {
      this.addGame(game);
    }
  }

  editGame(id: number, game: Game) {
    this._gamesServices.updateGame(id, game).subscribe({
      next: () => {
        this.toastr.info('Juego actualizado exitosamente', 'Registro Actualizado!!');
        this.router.navigate(['/games']);
      },
      error: error => {
        this.toastr.error('Opss... ocurrio un error!', 'Error');
        console.log(error);
      }
    })
  }

  addGame(game: Game) {
    this._gamesServices.saveGame(game).subscribe({
      next: data => {
        this.toastr.success('Juego agregado exitosamente', 'Juego Registrado!')
        this.router.navigate(['/games']);
      },
      error: error => {
        this.toastr.error('Opss... ocurrio un error!', 'Error');
        console.log(error);
      }
    })
  }

}
