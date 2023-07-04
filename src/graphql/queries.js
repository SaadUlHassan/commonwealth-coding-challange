import { gql } from "@apollo/client";

export const GET_TOP_POOLS = gql`
  query GetTopPools(
    $skip: Int!
    $first: Int!
    $orderBy: String!
    $orderDirection: String!
  ) {
    pools(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      id
      volumeUSD
      totalValueLockedUSD
      token0 {
        name
        id
        symbol
        decimals
      }
      token1 {
        name
        id
        symbol
        decimals
      }
    }
  }
`;
