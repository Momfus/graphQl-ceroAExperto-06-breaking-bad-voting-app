import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/@core/interfaces/character.interface';
import { ApiService } from '../../@core/services/api.service';

@Component({
  selector: 'app-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.css']
})
export class VotesComponent implements OnInit {

  characters: Character[] = [];
  loading: boolean;

  constructor( private apiService: ApiService ) { }

  ngOnInit(): void {

    this.loading = true;
    this.apiService.getCharacters( true ).subscribe( (data: any) => {

      this.characters = data;
      console.log(this.characters);
      this.loading = false;

    });

    // Escuchar los cambios del grapqhl
    this.changeVotes();

  }

  // Suscribirse al cambio de votos
  changeVotes(): void {

    this.apiService.changeVotesListener().subscribe( ({data}) => {

      console.log(data.changeVotes);
      this.characters = data.changeVotes;

    });

  }

  addVote( character: string ): void {

    this.apiService.addVote(character).subscribe( ({data}) => {

      console.log(data);



    });

  }


}
