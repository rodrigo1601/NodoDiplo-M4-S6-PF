export const requiredRules = {
    required: "Este campo es obligatorio",
};

export const userNameRules = {
    required: "El nombre de usuario es obligatorio",
    minLength: {
        value: 5,
        message: "Debe tener al menos 5 caracteres",
    },
    maxLength: {
        value: 20,
        message: "No puede superar los 20 caracteres",
    },
    pattern: {
        value: /^[a-zA-Z0-9_]+$/,
        message:
            "Solo puede contener letras, números y guiones bajos",
    },
};

export const passwordRules = {
    required: "La contraseña es obligatoria",
    minLength: {
        value: 8,
        message: "Debe tener al menos 8 caracteres",
    },
    pattern: {
        value: /^(?=.*[A-Z])(?=.*\d).+$/,
        message: "Debe contener una mayúscula y un número",
    },
};

export const optionalPasswordRules = {
    validate: (value) => {
        if (!value) return true;

        if (value.length < passwordRules.minLength.value) {
            return passwordRules.minLength.message;
        }

        if (!passwordRules.pattern.value.test(value)) {
            return passwordRules.pattern.message;
        }

        return true;
    }
};

export const emailRules = {
    required: "El email es obligatorio",
    pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Introduce un email válido",
    },
};

export const birthDateRules = {
    required: "La fecha de nacimiento es obligatoria",
    validate: (value) => {
        const selectedDate = new Date(value);
        const today = new Date();

        today.setHours(0, 0, 0, 0);

        return (
            selectedDate <= today ||
            "La fecha no puede ser futura"
        );
    },
};

export const avatarRules = {
    required: "La imagen es obligatoria",
};

export const requiredIf = (condition, message) => {
    return condition ? { required: message } : {};
};

export const nameRules = {
    required: "El nombre es obligatorio",
    minLength: {
        value: 2,
        message: "Debe tener al menos 2 caracteres",
    },
    maxLength: {
        value: 50,
        message: "No puede superar los 50 caracteres",
    },
};

export const slugRules = {
    required: "El slug es obligatorio",
    pattern: {
        value: /^[a-z0-9-]+$/,
        message:
            "Solo puede contener letras minúsculas, números y guiones",
    },
};