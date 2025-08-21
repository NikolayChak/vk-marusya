export const convertMoney = (num: string) => {
  const digit = +num
  return digit.toLocaleString()
}
