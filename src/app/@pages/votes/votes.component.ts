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

  constructor( private apiService: ApiService ) { }

  ngOnInit(): void {

    this.apiService.getCharacters( true ).subscribe( (data: any) => {

      this.characters = data;
      console.log(this.characters);


    });

  }

}
