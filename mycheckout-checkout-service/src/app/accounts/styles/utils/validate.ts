import * as yup from 'yup';

yup.addMethod(yup.array, 'mustContain', function (args) {
  return this.test('mustContain', 'Miss some required values', function (list) {
    return args && list && !args.some((l: unknown) => !list.includes(l));
  });
});

const BASE_BUTTON = yup.object().shape({
  font: yup.string().required(),
  borderRadius: yup.string().required(),
  width: yup.string().required(),
  normal: yup
    .object()
    .shape({
      textColor: yup.string().required(),
      backgroundColor: yup.string().required(),
      outlineColor: yup.string().required(),
    })
    .required(),
  hover: yup
    .object()
    .shape({
      textColor: yup.string().required(),
      backgroundColor: yup.string().required(),
      outlineColor: yup.string().required(),
    })
    .required(),
});

const BASE_MODAL = yup.object().shape({
  font: yup.string().required(),
  backgroundColor: yup.string().required(),
  button: yup
    .object()
    .shape({
      borderRadius: yup.string().required(),
      normal: yup
        .object()
        .shape({
          textColor: yup.string().required(),
          backgroundColor: yup.string().required(),
          outlineColor: yup.string().required(),
        })
        .required(),
      hover: yup
        .object()
        .shape({
          textColor: yup.string().required(),
          backgroundColor: yup.string().required(),
          outlineColor: yup.string().required(),
        })
        .required(),
    })
    .required(),
  icons: yup
    .object()
    .shape({
      color: yup.string().required(),
    })
    .required(),
});

export const BASE_STYLES = yup.object().shape({
  button: BASE_BUTTON,
  modal: BASE_MODAL,
});

export const validateData = async (data: string, validation: yup.AnySchema) => {
  const dataJson = JSON.parse(data);

  await validation.validate(dataJson);
};
