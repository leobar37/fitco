export const moneyHelper = {
    toCents(price: number | string) {
      const numericPrice =
        typeof price === 'string'
          ? parseFloat(price.replace(/[^0-9.-]+/g, ''))
          : price;
      return Math.round(numericPrice * 100);
    },
    fromCents(price: number) {
      return price / 100;
    },
  };
  