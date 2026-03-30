export const clampPriceInput = (value, minAllowed, maxAllowed) => {
  const numericValue = Number(value);

  if (Number.isNaN(numericValue)) {
    return minAllowed;
  }

  return Math.min(Math.max(Math.round(numericValue), minAllowed), maxAllowed);
};
