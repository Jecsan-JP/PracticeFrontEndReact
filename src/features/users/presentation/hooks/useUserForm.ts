import { useEffect } from "react";
import useForm from "../../../../common/hooks/useForm";
import { getUserValidationSchema } from "../../domain/validations/userValidations";
import { User } from "../../domain/models/User";
import { useUsersRedux } from "./useUsersRedux";
import { CreateUserDto } from "../../../login/domain/models/CreateUserDto";

interface UserFormValues {
  id?: number;
  name: string;
  username: string;
  email: string;
  password?: string;
  phone: string;
  website: string;
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  lat: string;
  lng: string;
  companyName: string;
  catchPhrase: string;
  bs: string;
}

const DEFAULT_USER_VALUES: UserFormValues = {
  id: 0,
  name: "",
  username: "",
  email: "",
  password: "",
  phone: "",
  website: "",
  street: "",
  suite: "",
  city: "",
  zipcode: "",
  lat: "",
  lng: "",
  companyName: "",
  catchPhrase: "",
  bs: "",
};

const flattenUser = (user: User): UserFormValues => ({
  ...user,
  street: user.address.street,
  suite: user.address.suite,
  city: user.address.city,
  zipcode: user.address.zipcode,
  lat: user.address.geo.lat,
  lng: user.address.geo.lng,
  companyName: user.company.name,
  catchPhrase: user.company.catchPhrase,
  bs: user.company.bs,
  password: "",
});

// Convertir UserFormValues a User (reconstruir)
const unflattenUser = (form: UserFormValues): User => ({
  ...form,
  address: {
    street: form.street,
    suite: form.suite,
    city: form.city,
    zipcode: form.zipcode,
    geo: {
      lat: form.lat,
      lng: form.lng,
    },
  },
  company: {
    name: form.companyName,
    catchPhrase: form.catchPhrase,
    bs: form.bs,
  },
});

export const useUserForm = (user?: User, onSuccess?: () => void) => {
  const isEditing = !!user;
  const validationSchema = getUserValidationSchema(isEditing);
  const { createUser, isLoading } = useUsersRedux();

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
    setValues,
  } = useForm<UserFormValues>(DEFAULT_USER_VALUES, validationSchema);

  useEffect(() => {
    if (isEditing && user) {
      setValues({ ...flattenUser(user), password: "" });
    } else {
      setValues(DEFAULT_USER_VALUES);
    }
  }, [user]);

  const onSubmit = (callback: () => void) => {
    const userToSubmit = unflattenUser(values);

    if (isEditing) {
      console.log("Editando usuario:", values);
    } else {
      createUser({
        user: userToSubmit,
        password: values.password,
      } as CreateUserDto);
    }
    onSuccess?.();
    callback();
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
    onSubmit,
    isEditing,
    isLoading,
  };
};
