export const formatCurrency = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
};

export const formatDate = (datetime) => {
  const date = new Date(datetime)
  const formatted = date.toLocaleString('id-ID', {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        });
  return formatted;
}

export const capitalize = (string) => {
  const newString = string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  return newString
}
