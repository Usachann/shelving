export const formatNumber = (
  value: number,
  currency: string = 'RUB',
  localeFormat: string = 'ru-RU',
): string => {
  const attributes = {
    ISO: 'RUB',
    localeFormat: 'ru-RU',
    symbol: '₽',
  }

  const formattedValue = new Intl.NumberFormat(
    localeFormat || attributes.localeFormat,
    {
      style: 'currency',
      currency: currency || attributes.ISO,
      currencyDisplay: 'code',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    },
  ).format(value)

  return formattedValue.replace(attributes.ISO, attributes.symbol)
}
