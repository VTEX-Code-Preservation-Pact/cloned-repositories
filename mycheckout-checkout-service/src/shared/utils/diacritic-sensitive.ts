export const diacriticSensitiveRegex = (string = '') => {
  return string
    .replace(/a/g, '[a,á,à,ä]')
    .replace(/e/g, '[e,é,ë]')
    .replace(/i/g, '[i,í,ï]')
    .replace(/o/g, '[o,ó,ö,ò]')
    .replace(/u/g, '[u,ü,ú,ù]');
};

export const diacriticSensitive = (string = '') => {
  return string
    .replace(/á/g, 'a')
    .replace(/à/g, 'a')
    .replace(/ä/g, 'a')
    .replace(/é/g, 'e')
    .replace(/è/g, 'e')
    .replace(/ë/g, 'e')
    .replace(/í/g, 'i')
    .replace(/ì/g, 'i')
    .replace(/ï/g, 'i')
    .replace(/ó/g, 'o')
    .replace(/ò/g, 'o')
    .replace(/ö/g, 'o')
    .replace(/ú/g, 'u')
    .replace(/ù/g, 'u')
    .replace(/ü/g, 'u');
};
