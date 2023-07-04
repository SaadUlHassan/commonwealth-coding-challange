import { gql } from "@apollo/client";

export const GET_TOP_POOLS = gql`
  query GetTopPools {
    pools(first: 10, orderBy: totalValueLockedUSD, orderDirection: desc) {
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
