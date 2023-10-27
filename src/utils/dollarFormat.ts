// Reusable function to format a number as a dollar amount
export default function dollarFormat(amount: number) {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'CAD',
  }).format(amount)
  return formatted
}
