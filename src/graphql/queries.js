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
      decimals
      volume
      totalValueLockedUSD
      tokenDayData(first: 1, orderBy: date, orderDirection: desc) {
        priceUSD
        open
        close
        volumeUSD
      }
    }
  }
`;

export const GET_TRANSACTIONS = gql`
  query ($first: Int, $orderBy: String, $orderDirection: String, $skip: Int) {
    transactions(
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      skip: $skip
    ) {
      id
      timestamp
      mints {
        id
        transaction {
          id
        }
        token0 {
          id
          name
          symbol
        }
        token1 {
          id
          name
          symbol
        }
        sender
        amountUSD
        amount0
        amount1
      }
      swaps {
        id
        transaction {
          id
        }
        token0 {
          id
          name
          symbol
        }
        token1 {
          id
          name
          symbol
        }
        sender
        amountUSD
        amount0
        amount1
      }
      burns {
        id
        transaction {
          id
        }
        token0 {
          id
          name
          symbol
        }
        token1 {
          id
          name
          symbol
        }
        origin
        amountUSD
        amount0
        amount1
      }
    }
  }
`;
