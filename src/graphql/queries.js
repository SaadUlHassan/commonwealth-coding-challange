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

export const GET_PAGINATED_TOKENS = gql`
  query GetPaginatedTokens(
    $skip: Int!
    $first: Int!
    $orderBy: String!
    $orderDirection: String!
  ) {
    tokens(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      id
      name
      symbol
      volumeUSD
      totalValueLockedUSD
      derivedETH
    }
    bundles {
      ethPriceUSD
    }
  }
`;
