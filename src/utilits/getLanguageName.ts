export const getLanguageName = (code: string): string => {
  if (!code) {
    return 'Неизвестный язык'
  }
  const displayNames = new Intl.DisplayNames(['ru'], {type: 'language'})

  const localName = displayNames.of(code)
  if (localName === code) {
    return 'Неизвестный язык'
  }
  if (localName) {
    return localName[0].toUpperCase() + localName.slice(1)
  }
  return code
}
