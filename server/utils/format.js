export const etdToNumber = (etd) => {
  const num = parseInt(etd, 10);
  return isNaN(num) ? null : num;
};