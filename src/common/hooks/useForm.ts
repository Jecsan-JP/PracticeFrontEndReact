import { useState } from "react";

interface ValidationSchema<T> {
  [key: string]: (value: any, values?: T) => string | null;
}

const useForm = <T extends Record<string, any>>(
  initialValues: T,
  validationSchema?: ValidationSchema<T>
) => {
  // Estado para almacenar valores de los campos
  const [values, setValues] = useState<T>(initialValues);

  // Estado para almacenar errores de validación
  const [errors, setErrors] = useState<Partial<Record<keyof T, string | null>>>(
    {}
  );

  // Estado para saber si se ha intentado enviar el formulario
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validar campo individualmente
  const validateField = (name: keyof T, value: any) => {
    if (validationSchema && validationSchema[name as string]) {
      return validationSchema[name as string](value, values);
    }
    return null;
  };

  // Validar todos los campos
  const validateAllFields = () => {
    if (!validationSchema) return {};
    const newErrors: Partial<Record<keyof T, string | null>> = {};
    for (const key in validationSchema) {
      const error = validateField(key as keyof T, values[key as keyof T]);
      if (error) {
        newErrors[key as keyof T] = error;
      }
    }
    setErrors(newErrors);
    return newErrors;
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, type, value, files } = event.target as HTMLInputElement;
    let fieldValue: any = value;

    if (type === "file" && files) {
      fieldValue = files[0];
    }

    setValues((prevValues) => ({
      ...prevValues,
      [name]: fieldValue,
    }));

    if (validationSchema) {
      const error = validateField(name as keyof T, fieldValue);

      // Clonar `errors` antes de modificarlo
      const newErrors = { ...errors };
      newErrors[name as keyof T] = error; // Aquí ya no debería dar error
      setErrors(newErrors);
    }
  };

  const setFieldValue = (field: string, value: any) => {
    setValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));

    if (validationSchema) {
      const error = validateField(field, value);

      // Crear copia de `errors` antes de modificar
      const newErrors = { ...errors };
      newErrors[field as keyof T] = error;
      setErrors(newErrors);
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    callback: () => void
  ) => {
    event.preventDefault();
    setIsSubmitting(true);
    const newErrors = validateAllFields();

    // Actualizar errores en el estado
    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => error === null)) {
      callback();
    } else {
      console.log("Errores de validación", newErrors);
    }
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
    setFieldValue,
    validateAllFields,
    setValues,
  };
};

export default useForm;
