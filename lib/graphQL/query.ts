import { gql } from "@apollo/client";

export const GET_ARTICLE = gql`
  query Article($articleId: ID) {
    article(id: $articleId) {
      data {
        id
        attributes {
          title
          date
          content
          image {
            data {
              attributes {
                url
              }
            }
          }
          categories {
            data {
              id
              attributes {
                title
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_ARTICLES = gql`
  query {
    articles {
      data {
        id
        attributes {
          date
          title
          content
          image {
            data {
              attributes {
                url
              }
            }
          }
          categories {
            data {
              id
              attributes {
                title
              }
            }
          }
        }
      }
    }
  }
`;
