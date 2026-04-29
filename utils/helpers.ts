import { format, parseISO } from 'date-fns';
import { id as idID } from 'date-fns/locale';

export const formatCurrency = (amount: number, currencyOverride?: string) => {
  let currency = currencyOverride;
  if (!currency && typeof window !== 'undefined') {
    currency = localStorage.getItem('business_currency') || 'IDR';
  }
  currency = currency || 'IDR';

  let locale = 'id-ID';
  let fraction = 0;

  switch (currency) {
    case 'USD': locale = 'en-US'; fraction = 2; break;
    case 'SGD': locale = 'en-SG'; fraction = 2; break;
    case 'MYR': locale = 'ms-MY'; fraction = 2; break;
    case 'EUR': locale = 'de-DE'; fraction = 2; break;
    default: locale = 'id-ID'; fraction = 0; break;
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: fraction,
    minimumFractionDigits: fraction,
  }).format(amount);
};

export const formatCurrencyCompact = (amount: number) => {
  let currency = 'IDR';
  if (typeof window !== 'undefined') {
    currency = localStorage.getItem('business_currency') || 'IDR';
  }
  
  const symbolMap: Record<string, string> = {
    'USD': '$',
    'SGD': 'S$',
    'MYR': 'RM',
    'EUR': '€',
    'IDR': 'Rp'
  };
  const symbol = symbolMap[currency] || currency;

  if (amount >= 1_000_000_000) {
    return `${symbol} ${(amount / 1_000_000_000).toFixed(1)}M`;
  }
  if (amount >= 1_000_000) {
    return `${symbol} ${(amount / 1_000_000).toFixed(1)}jt`;
  }
  if (amount >= 1_000) {
    return `${symbol} ${(amount / 1_000).toFixed(0)}rb`;
  }
  return `${symbol} ${amount}`;
};

export const formatDate = (date: string | Date, formatStr = 'dd MMM yyyy') => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr, { locale: idID });
};

export const formatDateTime = (date: string | Date) => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'dd MMM yyyy HH:mm', { locale: idID });
};

export const calculatePercentageChange = (current: number, previous: number) => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / Math.abs(previous)) * 100;
};

export const truncateText = (text: string, length: number) => {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
};

export const generateRandomId = () => {
  return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
};

export const isValidEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isValidPhoneNumber = (phone: string) => {
  // Indonesian phone number validation
  const regex = /^(\+62|62|0)[0-9]{9,12}$/;
  return regex.test(phone.replace(/\D/g, ''));
};

export const calculateInventoryValue = (quantity: number, unitPrice: number) => {
  return quantity * unitPrice;
};

export const getBusinessHealthScore = (stats: {
  revenue: number;
  expenses: number;
  debt: number;
  inventory: number;
}) => {
  let score = 100;
  
  // Reduce score if expenses > 80% of revenue
  if (stats.revenue > 0 && (stats.expenses / stats.revenue) > 0.8) {
    score -= 20;
  }
  
  // Reduce score if debt is more than 50% of revenue
  if (stats.revenue > 0 && (stats.debt / stats.revenue) > 0.5) {
    score -= 15;
  }
  
  // Reduce score if inventory turnover is low
  if (stats.inventory > stats.revenue * 0.5) {
    score -= 10;
  }
  
  return Math.max(0, Math.min(100, score));
};

export const exportToCSV = (data: any[], filename: string) => {
  if (data.length === 0) return;
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map((row) =>
      headers
        .map((header) => {
          const val = row[header];
          return typeof val === 'string' ? `"${val.replace(/"/g, '""')}"` : val;
        })
        .join(',')
    ),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
