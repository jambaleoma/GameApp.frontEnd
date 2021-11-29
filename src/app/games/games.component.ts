import { Component, OnInit } from '@angular/core';
import { Game } from '../_models';
import { AccountService, ModalService } from '../_services';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit {
  public games: Game[] = [];

  constructor(
    private accountService: AccountService,
    private modalService: ModalService) {}

  ngOnInit() {
    this.accountService.getAllGames().subscribe((res) => {
      if (res) {
        this.games = res.data.map(g =>
          g.path !== '' ? { ...g, path: g.path.slice(15, g.path.length - 4) } : g);
        console.log(this.games);
      }
    });
  }

  getDetails(game: Game) {
    this.modalService.sendInfoModal(
      'SUCCESS',
      game.title,
      game.price,
      game.title,
      game.path);
  }

  addNewGame() {
    console.log('new game');
  }
}
