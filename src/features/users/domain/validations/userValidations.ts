export const getUserValidationSchema = (isEditing: boolean) => ({
  name: (value: string) => {
    if (!value.trim()) return "El nombre es obligatorio";
    if (value.length < 4) return "Mínimo 4 caracteres";
    return null;
  },
  username: (value: string) => {
    if (!value.trim()) return "El usuario es obligatorio";
    // if (value.length < 4) return "Mínimo 4 caracteres";
    // if (!/^[a-zA-Z0-9_]+$/.test(value)) return "Solo letras, números y _";
    return null;
  },
  email: (value: string) => {
    if (!value.trim()) return "El email es obligatorio";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Email inválido";
    return null;
  },
  password: (value: string) => {
    if (isEditing || !value.trim()) return null; // Ignorar validación si está en edición
    if (value.length < 8) return "Mínimo 8 caracteres";
    if (!/[A-Z]/.test(value)) return "Debe tener al menos 1 mayúscula";
    if (!/[0-9]/.test(value)) return "Debe tener al menos 1 número";
    return null;
  },
  // phone: (value: string) => {
  //   if (value && !/^[\d\s()+-]+$/.test(value)) return "Teléfono inválido";
  //   return null;
  // },
  zipcode: (value: string) => {
    if (value && !/^\d{5}(-\d{4})?$/.test(value))
      return "Código postal inválido";
    return null;
  },
});
