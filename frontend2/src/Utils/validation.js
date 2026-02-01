// validation.js

// Name: only letters & spaces, min 2 characters
export const validateName = (value) => {
    if (!value) return "Name is required";
    if (!/^[A-Za-z\s]+$/.test(value)) return "Name should contain only letters";
    if (value.length < 2) return "Name must be at least 2 characters";
    return "";
  };
  
  // Email: must follow standard email format
  export const validateEmail = (value) => {
    if (!value) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      return "Enter a valid email address";
    return "";
  };

// Validator function for phone number
  export const validatePhone = (value) => {
    if (!value) return "Phone number is required";
    if (value.length !== 10) return "Phone number must be 10 digits";
    return "";
  };
  
  // Password: at least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
  export const validatePassword = (value) => {
    if (!value) return "Password is required";
    if (value.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(value)) return "Must contain at least one uppercase letter";
    if (!/[a-z]/.test(value)) return "Must contain at least one lowercase letter";
    if (!/[0-9]/.test(value)) return "Must contain at least one number";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
      return "Must contain at least one special character";
    return "";
  };
  