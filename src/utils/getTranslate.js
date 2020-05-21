export const getTranslates = (item) => {
  const locale = item ? item : 'fr'
  return require(`../assets/locale/${locale}.json`)
}