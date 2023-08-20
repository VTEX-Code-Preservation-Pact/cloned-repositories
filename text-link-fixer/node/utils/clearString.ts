const removeSpecialCharacters = (url: string) => {
  let newUrl = ''

  const str =
    '\'.," !@#$%\x00a8&+,´`*()-?:;={}][/\x00c4\x00c5\x00c1\x00c2\x00c0\x00c3\x00e4\x00e1\x00e2\x00e0\x00e3\x00c9\x00ca\x00cb\x00c8\x00e9\x00ea\x00eb\x00e8\x00cd\x00ce\x00cf\x00cc\x00ed\x00ee\x00ef\x00ec\x00d6\x00d3\x00d4\x00d2\x00d5\x00f6\x00f3\x00f4\x00f2\x00f5\x00dc\x00da\x00db\x00fc\x00fa\x00fb\x00f9\x00c7\x00e7 /'

  const str2 =
    '-----------------------------AAAAAAaaaaaEEEEeeeeIIIIiiiiOOOOOoooooUUUuuuuCc--'

  for (let i = 0; i < str.length; i++) {
    newUrl = url.replace(str[i], str2[i])
  }

  // Remove special spaces
  newUrl = url.replace(/\s+/g, '-')

  return newUrl
}

export function clearString(url: string) {
  const newUrl = removeSpecialCharacters(url).toLowerCase()

  return newUrl
}
