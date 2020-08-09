import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { listaPersonajes } from '../operations/query';
import { changeVotes } from '../operations/subscription';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private apollo: Apollo) { }

  // Lista de los personajes de Breaking Bad
  getCharacters( skip: boolean = true ): any {

    return this.apollo.watchQuery({

      query: listaPersonajes,
      variables: {
        skip
      },
      fetchPolicy: 'network-only'

    }).valueChanges.pipe(map( (result: any)  => {

      console.log(result.data);
      return result.data.characters;

    }));

  }

  // Obtener los cambios en tiempo real de los votos
  changeVotesListener(): any {

    return this.apollo.subscribe({

      query: changeVotes

    });

  }

}
