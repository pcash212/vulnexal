  const ValidationRules = {
  email: {
    pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "Please enter a valid email address (e.g., user@example.com)",
    test: (value) => ValidationRules.email.pattern.test(value)
  },
  
  password: {
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    message: "Password must be at least 8 characters with uppercase, lowercase, number, and special character (@$!%*?&)",
    test: (value) => ValidationRules.password.pattern.test(value)
  },
  
  fullname: {
    pattern: /^[a-zA-Z\s'-]{2,50}$/,
    message: "Full name must be 2-50 characters and contain only letters, spaces, hyphens, or apostrophes",
    test: (value) => ValidationRules.fullname.pattern.test(value.trim())
  },
  
  username: {
    pattern: /^[a-zA-Z0-9_-]{3,20}$/,
    message: "Username must be 3-20 characters and contain only letters, numbers, underscores, or hyphens",
    test: (value) => ValidationRules.username.pattern.test(value.trim())
  },
  
  url: {
    pattern: /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
    message: "Please enter a valid URL (e.g., example.com or https://example.com)",
    test: (value) => {
      const val = value.trim();
      return ValidationRules.url.pattern.test(val) || /^(https?:\/\/)/.test(val);
    }
  }
};

const Validator = {
  validateField: (value, rule) => {
    if (!value || value.trim() === '') {
      return { valid: false, message: "This field is required" };
    }
    
    const valid = rule.test(value);
    return { 
      valid, 
      message: valid ? "" : rule.message 
    };
  },
  
  validateEmail: (email) => Validator.validateField(email, ValidationRules.email),
  
  validatePassword: (password) => Validator.validateField(password, ValidationRules.password),
  
  validateFullname: (fullname) => Validator.validateField(fullname, ValidationRules.fullname),
  
  validateUsername: (username) => Validator.validateField(username, ValidationRules.username),
  
  validateURL: (url) => Validator.validateField(url, ValidationRules.url),
  
  validatePasswordMatch: (password, confirmPassword) => {
    if (!confirmPassword || confirmPassword.trim() === '') {
      return { valid: false, message: "Please confirm your password" };
    }
    if (password !== confirmPassword) {
      return { valid: false, message: "Passwords do not match" };
    }
    return { valid: true, message: "" };
  },
  
  showFieldError: (inputElement, message) => {
    if (!inputElement) return;
    
    inputElement.classList.add('is-invalid');
    inputElement.classList.remove('is-valid');
    
    let errorDiv = inputElement.parentElement.querySelector('.invalid-feedback');
    if (!errorDiv) {
      errorDiv = document.createElement('div');
      errorDiv.className = 'invalid-feedback d-block';
      inputElement.parentElement.appendChild(errorDiv);
    }
    errorDiv.textContent = message;
  },
  
  showFieldSuccess: (inputElement) => {
    if (!inputElement) return;
    
    inputElement.classList.remove('is-invalid');
    inputElement.classList.add('is-valid');
    
    const errorDiv = inputElement.parentElement.querySelector('.invalid-feedback');
    if (errorDiv) errorDiv.remove();
  },
  
  clearFieldValidation: (inputElement) => {
    if (!inputElement) return;
    
    inputElement.classList.remove('is-invalid', 'is-valid');
    const errorDiv = inputElement.parentElement.querySelector('.invalid-feedback');
    if (errorDiv) errorDiv.remove();
  },
  
  validateForm: (fields) => {
    let isValid = true;
    const errors = {};
    
    for (const [fieldName, { element, validator }] of Object.entries(fields)) {
      const value = element.value;
      const result = validator(value);
      
      if (!result.valid) {
        isValid = false;
        errors[fieldName] = result.message;
        Validator.showFieldError(element, result.message);
      } else {
        Validator.showFieldSuccess(element);
      }
    }
    
    return { valid: isValid, errors };
  }
};

const setupRealtimeValidation = (inputElement, validator) => {
  if (!inputElement) return;
  
  inputElement.addEventListener('blur', () => {
    const result = validator(inputElement.value);
    if (!result.valid) {
      Validator.showFieldError(inputElement, result.message);
    } else {
      Validator.showFieldSuccess(inputElement);
    }
  });
  
  inputElement.addEventListener('input', () => {
    if (inputElement.classList.contains('is-invalid')) {
      const result = validator(inputElement.value);
      if (result.valid) {
        Validator.showFieldSuccess(inputElement);
      }
    }
  });
};
