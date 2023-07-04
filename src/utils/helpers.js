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
