export const StylesButtonSchema = {
  font: 'Helvetica',
  borderRadius: 25,
  normal: {
    textColor: '#ED6400',
    backgroundColor: '#000000',
    outlineColor: '#898989',
  },
  hover: {
    textColor: '#ED6400',
    backgroundColor: '#000000',
    outlineColor: '#898989',
  },
  width: 100,
};

export const StylesModalSchema = {
  font: 'Helvetica',
  backgroundColor: '#ED6400',
  button: {
    borderRadius: 25,
    normal: {
      textColor: '#ED6400',
      backgroundColor: '#000000',
      outlineColor: '#898989',
    },
    hover: {
      textColor: '#ED6400',
      backgroundColor: '#000000',
      outlineColor: '#898989',
    },
  },
  icons: {
    color: '#ED6400',
  },
};

export const TextButton = `Compra Ya`;

export const StylesSchema = {
  button: StylesButtonSchema,
  modal: StylesModalSchema,
};
