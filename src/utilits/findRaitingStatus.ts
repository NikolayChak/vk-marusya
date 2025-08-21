export function findRatingStatus(rating: string): string {
  const num = parseFloat(rating);
  return num <= 5 ? 'red'
       : num <= 7 ? 'lgrey'
       : num <= 8 ? 'green'
       : 'gold';
}
