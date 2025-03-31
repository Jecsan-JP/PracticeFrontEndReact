import { useEffect, useState } from "react";
import useForm from "../../../../../common/hooks/useForm";
import { User } from "../../../domain/models/User";

interface UserFormValues {
  // Datos básicos
  id: number;
  name: string;
  username: string;
  email: string;
  password?: string;
  phone: string;
  website: string;
  // Dirección (aplanada)
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  // Geo (aplanado)
  lat: string;
  lng: string;
  // Compañía (aplanada)
  companyName: string;
  catchPhrase: string;
  bs: string;
}

interface UserFormProps {
  user?: User;
  onClose: () => void;
  onSuccess?: () => void;
}

const DEFAULT_USER_VALUES = {
  id: 0,
  name: "",
  username: "",
  email: "",
  password: "",
  phone: "",
  website: "",

  // Address (aplanado)
  street: "",
  suite: "",
  city: "",
  zipcode: "",

  // Geo (aplanado)
  lat: "",
  lng: "",

  // Company (aplanado)
  companyName: "",
  catchPhrase: "",
  bs: "",
};

const VALIDATION_SCHEMA = {
  name: (value: string) => {
    if (!value.trim()) return "El nombre es obligatorio";
    if (value.length < 4) return "Mínimo 2 caracteres";
    return null;
  },
  username: (value: string) => {
    if (!value.trim()) return "El usuario es obligatorio";
    if (value.length < 4) return "Mínimo 4 caracteres";
    if (!/^[a-zA-Z0-9_]+$/.test(value)) return "Solo letras, números y _";
    return null;
  },
  email: (value: string) => {
    if (!value.trim()) return "El email es obligatorio";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Email inválido";
    return null;
  },
  password: (value: string) => {
    if (!value.trim()) return "La contraseña es obligatoria";
    if (value.length < 8) return "Mínimo 8 caracteres";
    if (!/[A-Z]/.test(value)) return "Debe tener al menos 1 mayúscula";
    if (!/[0-9]/.test(value)) return "Debe tener al menos 1 número";
    return null;
  },
  // Campos no requeridos pero con validación opcional:
  phone: (value: string) => {
    if (value && !/^[\d\s()+-]+$/.test(value)) return "Teléfono inválido";
    return null;
  },
  zipcode: (value: string) => {
    if (value && !/^\d{5}(-\d{4})?$/.test(value))
      return "Código postal inválido";
    return null;
  },
};

const flattenUser = (user: User) => ({
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

export const UserForm = ({ user, onClose, onSuccess }: UserFormProps) => {
  const isEditing = !!user;
  const [initialized, setInitialized] = useState(false);

  // Convertir UserFormValues a User (reconstruir)
  // const unflattenUser = (form: UserFormValues): User => ({
  //   ...form,
  //   address: {
  //     street: form.street,
  //     suite: form.suite,
  //     city: form.city,
  //     zipcode: form.zipcode,
  //     geo: {
  //       lat: form.lat,
  //       lng: form.lng,
  //     },
  //   },
  //   company: {
  //     name: form.companyName,
  //     catchPhrase: form.catchPhrase,
  //     bs: form.bs,
  //   },
  // });

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
    setValues,
    resetForm,
  } = useForm<UserFormValues>(DEFAULT_USER_VALUES, VALIDATION_SCHEMA);

  // Adaptamos el onSubmit para usar el handleSubmit del hook
  const onSubmit = (callback: () => void) => {
    if (isEditing) {
      // Lógica para editar
      console.log("Editando usuario:", values);
      // await updateUser(values);
    } else {
      // Lógica para crear
      console.log("Creando usuario:", values);
      // await createUser(values);
    }
    onSuccess?.();
    callback();
  };

  useEffect(() => {
    if (isEditing && user) {
      setValues({ ...flattenUser(user), password: "" });
      setInitialized(true); // Esto solo asegura que no se vuelve a inicializar si ya se hizo antes
    } else {
      setValues(DEFAULT_USER_VALUES); // Resetear los valores si no estás editando un usuario
    }
  }, [user]);

  return (
    <form
      onSubmit={(e) => handleSubmit(e, () => onSubmit(onSuccess || (() => {})))}
    >
      <h2 className="text-2xl font-bold mb-6 text-primary">
        {isEditing ? "Editar Usuario" : "Crear Usuario"}
      </h2>

      {/* Sección 1: Información Básica */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Nombre completo*</span>
          </label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            className="input input-bordered"
            placeholder="Ej: Juan Pérez"
          />
          {errors.name && (
            <span className="text-error text-sm mt-1">{errors.name}</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Nombre de usuario*</span>
          </label>
          <input
            type="text"
            name="username"
            value={values.username}
            onChange={handleChange}
            className="input input-bordered"
            placeholder="Ej: juanperez"
          />
          {errors.username && (
            <span className="text-error text-sm mt-1">{errors.username}</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Email*</span>
          </label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            className="input input-bordered"
            placeholder="Ej: juan@ejemplo.com"
          />
          {errors.email && (
            <span className="text-error text-sm mt-1">{errors.email}</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Contraseña{!isEditing && "*"}</span>
          </label>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            className="input input-bordered"
            placeholder={
              isEditing ? "Dejar vacío para no cambiar" : "Mínimo 8 caracteres"
            }
          />
          {errors.password && (
            <span className="text-error text-sm mt-1">{errors.password}</span>
          )}
        </div>
      </div>

      {/* Sección 2: Contacto */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Teléfono</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={values.phone}
            onChange={handleChange}
            className="input input-bordered"
            placeholder="Ej: +1 234 567 8900"
          />
          {errors.phone && (
            <span className="text-error text-sm mt-1">{errors.phone}</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Sitio web</span>
          </label>
          <input
            type="url"
            name="website"
            value={values.website}
            onChange={handleChange}
            className="input input-bordered"
            placeholder="Ej: https://miweb.com"
          />
          {errors.website && (
            <span className="text-error text-sm mt-1">{errors.website}</span>
          )}
        </div>
      </div>

      {/* Sección 3: Dirección */}
      <div className="bg-base-200 p-4 rounded-lg mb-6">
        <h3 className="font-bold text-lg mb-4">Dirección</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Calle*</span>
            </label>
            <input
              type="text"
              name="street"
              value={values.street}
              onChange={handleChange}
              className="input input-bordered"
              placeholder="Ej: Av. Principal 123"
            />
            {errors.street && (
              <span className="text-error text-sm mt-1">{errors.street}</span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Suite/Apartamento</span>
            </label>
            <input
              type="text"
              name="suite"
              value={values.suite}
              onChange={handleChange}
              className="input input-bordered"
              placeholder="Ej: Apt 4B"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Ciudad*</span>
            </label>
            <input
              type="text"
              name="city"
              value={values.city}
              onChange={handleChange}
              className="input input-bordered"
              placeholder="Ej: Nueva York"
            />
            {errors.city && (
              <span className="text-error text-sm mt-1">{errors.city}</span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Código Postal</span>
            </label>
            <input
              type="text"
              name="zipcode"
              value={values.zipcode}
              onChange={handleChange}
              className="input input-bordered"
              placeholder="Ej: 10001"
            />
          </div>
        </div>
      </div>

      {/* Sección 4: Compañía */}
      <div className="bg-base-200 p-4 rounded-lg mb-6">
        <h3 className="font-bold text-lg mb-4">Información de la Compañía</h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Nombre de la compañía*</span>
            </label>
            <input
              type="text"
              name="companyName"
              value={values.companyName}
              onChange={handleChange}
              className="input input-bordered"
              placeholder="Ej: Acme Corp"
            />
            {errors.companyName && (
              <span className="text-error text-sm mt-1">
                {errors.companyName}
              </span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Eslogan</span>
            </label>
            <input
              type="text"
              name="catchPhrase"
              value={values.catchPhrase}
              onChange={handleChange}
              className="input input-bordered"
              placeholder="Ej: Haciendo lo imposible desde 1920"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Servicios (BS)</span>
            </label>
            <input
              type="text"
              name="bs"
              value={values.bs}
              onChange={handleChange}
              className="input input-bordered"
              placeholder="Ej: Soluciones innovadoras"
            />
          </div>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex justify-end gap-4 mt-6">
        <button type="button" onClick={onClose} className="btn btn-ghost">
          Cancelar
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="loading loading-spinner"></span>
              Procesando...
            </>
          ) : isEditing ? (
            "Actualizar Usuario"
          ) : (
            "Crear Usuario"
          )}
        </button>
      </div>
    </form>
  );
};
