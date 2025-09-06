export const formatCurrency = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
};

export const formatDate = (datetime) => {
  const date = new Date(datetime);
  const formatted = date.toLocaleString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
  return formatted;
};

export const capitalize = (string) => {
  if (typeof string !== 'string') return '';
  const arr = string.split(' ');
  const newString = arr.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
  return newString.join(' ');
};

export const getFirstName = (string) => {
  const arr = string.split(' ');
  return arr[0];
};