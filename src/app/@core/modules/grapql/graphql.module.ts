/// Configuración general de graphql - Tener en cuenta que se hace basado en la conexión realizada en proyecto anterior con MongoDB

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    HttpClientModule,
    HttpLinkModule,
    ApolloModule
  ]
})

export class GraphqlModule {

  constructor( apollo: Apollo, httpClient: HttpClient ) {

    // Configurar la url principal con el link
    const httpLink = new HttpLink( httpClient ).create({

      uri: 'http://localhost:5012//graphql'

    });


    // Configurar el websocket con el link
    const subscriptionLink = new WebSocketLink({

      uri: 'ws://localhost:5012//graphql',
      options: {

        reconnect: true

      }

    });


    // Unir las dos conexiones
    const link = split(
      ({ query }) => {
        const { kind, operation }: any = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      subscriptionLink,
      httpLink
    );

    // Crear conexión de apollo
    apollo.create({
      link, // idem que hacer link: link (declarado más arriba)
      cache: new InMemoryCache()
    });

  }

}
