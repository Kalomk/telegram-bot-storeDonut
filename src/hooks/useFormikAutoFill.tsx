import { useFormik, FormikValues } from 'formik';

type FieldValuesFromFields<S> = {
  [Key in keyof S]: { setValue: (value: any) => void; getValue: () => any };
};

export function useFormikAutoFill<T extends FormikValues>({
  provider,
  builder,
}: {
  provider: ReturnType<typeof useFormik<T>>;
  builder: (valuesFromFields: FieldValuesFromFields<T>) => void;
}) {
  const { setFieldValue, values } = provider;

  const makeNewValuesFromFieldsObject = () => {
    const newValueObject = {} as FieldValuesFromFields<T>;

    Object.keys(values).forEach((key) => {
      if (!values[key]) {
        newValueObject[key as keyof T] = {
          getValue: () => values[key],
          setValue: (newValue: any) => setFieldValue(key, newValue),
        };
      }
    });

    return { newValueObject };
  };

  // Call the function to set values on mount or whenever necessary
  const { newValueObject } = makeNewValuesFromFieldsObject();

  return () => builder(newValueObject);
}
