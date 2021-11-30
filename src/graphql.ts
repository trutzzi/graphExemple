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