import { gql } from '@apollo/client';

export const ENDPOINTURL = 'https://swapi-graphql.netlify.app/.netlify/functions/index';

export const FILMSGRAPH = gql`
query GetExchangeRates {
    allFilms {
      totalCount
      films {
        id
        title
        releaseDate
        director
        openingCrawl
        characterConnection {
          edges {
            node {
              id
              name
              gender
              species {
                id
                name
                language
                homeworld {
                  id
                }
              }
            }
          }
        }
      }
    }
  }
`;

export type FilmsType = {
  allFilms: {
    films: {
      director: string,
      id: string,
      releaseDate: string,
      title: string,
      __typename: string,
      openingCrawl: string
      characterConnection: {
        edges:
        [
          node: {
            gender: string,
            id: string,
            name: string,
            species: string,
            __typename: string,
          },
          __typename: string
        ]
      }
    }[]
  }
};