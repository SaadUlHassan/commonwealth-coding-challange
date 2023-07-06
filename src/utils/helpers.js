import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const formatAmount = (value, decimals = 2) => {
  if (typeof value === "undefined") {
    return "-";
  } else {
    if (value >= 1e9) return (value / 1e9)?.toFixed?.(decimals) + "b";
    else if (value >= 1e6) return (value / 1e6)?.toFixed?.(decimals) + "m";
    else if (value >= 1e3) return (value / 1e3)?.toFixed?.(decimals) + "k";
    else if (Math.abs?.(value) < 0.01) return "0.00";
    // fix decimals, remove trianling zeros and convert back to string
    else return parseFloat(value?.toFixed?.(decimals))?.toString?.();
  }
};

export const formatAmountCurrency = (value, decimals = 2) => {
  if (typeof value === "undefined") {
    return "-";
  } else {
    const formattedValue = formatAmount(value, decimals);
    return "$" + formattedValue;
  }
};

export const getTransactionsTableData = (transactions) => {
  return (
    transactions?.map?.((transaction) => {
      const mint = transaction?.mints[transaction?.mints?.length - 1];
      const swap = transaction?.swaps[transaction?.swaps?.length - 1];
      const burn = transaction?.burns[transaction?.burns?.length - 1];

      const type = mint ? "Mint" : swap ? "Swap" : "Burn";
      const totalValue = mint?.amountUSD || swap?.amountUSD || burn?.amountUSD;
      const token0Symbol =
        mint?.token0.symbol || swap?.token0.symbol || burn?.token0.symbol;
      const token1Symbol =
        mint?.token1.symbol || swap?.token1.symbol || burn?.token1.symbol;
      const tokenAmount0 = Math.abs(
        mint?.amount0 || swap?.amount0 || burn?.amount0
      );
      const tokenAmount1 = Math.abs(
        mint?.amount1 || swap?.amount1 || burn?.amount1
      );
      const account = mint?.sender || swap?.sender || burn?.origin;

      const token0SymbolFormatted =
        token0Symbol === "WETH"
          ? "ETH"
          : token0Symbol === "WBTC"
          ? "(BTC)"
          : token0Symbol;
      const token1SymbolFormatted =
        token1Symbol === "WETH"
          ? "ETH"
          : token1Symbol === "WBTC"
          ? "(BTC)"
          : token1Symbol;

      return {
        transactions: `${token0SymbolFormatted} ${
          type === "Mint"
            ? " and "
            : type === "Swap"
            ? " For "
            : type === "Burn"
            ? " And "
            : ""
        } ${token1SymbolFormatted}`,
        totalValue: Number(totalValue),
        tokenAmount0: `${tokenAmount0} ${token0SymbolFormatted}`,
        tokenAmount1: `${tokenAmount1} ${token1SymbolFormatted}`,
        account,
        timestamp: dayjs().to(dayjs.unix(Number(transaction?.timestamp))),
      };
    }) || { transactions: [] }
  );
};

export const getTokensTableData = (tokens) => {
  const tokensTableData = tokens.map((token) => ({
    token: `${
      token?.name === "Wrapped Ether"
        ? "Ether"
        : token?.name === "Wrapped BTC"
        ? "Bitcoin"
        : token?.name
    } ${
      token?.symbol === "WETH"
        ? "(ETH)"
        : token?.symbol === "WBTC"
        ? "(BTC)"
        : `(${token?.symbol})`
    }`,
    price: Number(token?.tokenDayData?.[0]?.priceUSD),
    priceChange: getPriceChange(
      Number(token?.tokenDayData?.[0]?.open),
      Number(token?.tokenDayData?.[0]?.close)
    ),
    totalValueLockedUSD: Number(token?.totalValueLockedUSD),
  }));

  return { tokens: tokensTableData };
};

/**
 * Helper function to get the PRICE CHANGE value of a token in percentages.
 *
 * Returns a JSX element that is sent to the TOKENS table component.
 * Includes PRICE CHANGE value and the UI changes with respect to the value.
 */
export const getPriceChange = (oldPrice, newPrice) => {
  let priceChange = ((newPrice - oldPrice) / oldPrice) * 100;

  if (priceChange < 0) {
    if ((Math.abs(priceChange) || 0).toFixed(2) === "0.00") {
      return (
        <p style={{ color: "green" }}>
          {(Math.abs(priceChange) || 0).toFixed(2)}
        </p>
      );
    } else {
      return (
        <p style={{ color: "red", display: "flex", alignItems: "center" }}>
          {(Math.abs(priceChange) || 0).toFixed(2)}% {"↓"}
        </p>
      );
    }
  } else {
    if ((Math.abs(priceChange) || 0).toFixed(2) === "0.00") {
      return (
        <p style={{ color: "green" }}>
          {(Math.abs(priceChange) || 0).toFixed(2)}
        </p>
      );
    } else {
      return (
        <p style={{ color: "green", display: "flex", alignItems: "center" }}>
          {(Math.abs(priceChange) || 0).toFixed(2)}% {"↑"}
        </p>
      );
    }
  }
};
