const ValidationRules = {
  email: {
    pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "Enter a valid email address",
    test: function(value) {
      return this.pattern.test(value);
    }
  },
  password: {
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    message: "Password needs 8+ chars with upper, lower, number & special char",
    test: function(value) {
      return this.pattern.test(value);
    }
  },
  fullname: {
    pattern: /^[a-zA-Z\s'-]{2,50}$/,
    message: "Name must be 2-50 characters",
    test: function(value) {
      return this.pattern.test(value.trim());
    }
  },
  username: {
    pattern: /^[a-zA-Z0-9_-]{3,20}$/,
    message: "Username must be 3-20 characters",
    test: function(value) {
      return this.pattern.test(value.trim());
    }
  },
  url: {
    pattern: /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
    message: "Enter a valid URL",
    test: function(value) {
      const clean = value.trim();
      return this.pattern.test(clean);
    }
  }
};

const Validator = {
  validateField: function(value, rule) {
    if (!value || value.trim() === '') {
      return { valid: false, message: "Required field" };
    }
    const isValid = rule.test(value);
    return { valid: isValid, message: isValid ? "" : rule.message };
  },
  
  validateEmail: function(email) {
    return this.validateField(email, ValidationRules.email);
  },
  
  validatePassword: function(password) {
    return this.validateField(password, ValidationRules.password);
  },
  
  validateFullname: function(fullname) {
    return this.validateField(fullname, ValidationRules.fullname);
  },
  
  validateUsername: function(username) {
    return this.validateField(username, ValidationRules.username);
  },
  
  validateURL: function(url) {
    return this.validateField(url, ValidationRules.url);
  },
  
  validatePasswordMatch: function(password, confirmPassword) {
    if (!confirmPassword || confirmPassword.trim() === '') {
      return { valid: false, message: "Confirm password required" };
    }
    if (password !== confirmPassword) {
      return { valid: false, message: "Passwords don't match" };
    }
    return { valid: true, message: "" };
  },
  
  showFieldError: function(input, message) {
    if (!input) return;
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    
    let errorDiv = input.parentElement.querySelector('.invalid-feedback');
    if (!errorDiv) {
      errorDiv = document.createElement('div');
      errorDiv.className = 'invalid-feedback d-block';
      input.parentElement.appendChild(errorDiv);
    }
    errorDiv.textContent = message;
  },
  
  showFieldSuccess: function(input) {
    if (!input) return;
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    
    const errorDiv = input.parentElement.querySelector('.invalid-feedback');
    if (errorDiv) errorDiv.remove();
  },
  
  clearFieldValidation: function(input) {
    if (!input) return;
    input.classList.remove('is-invalid', 'is-valid');
    
    const errorDiv = input.parentElement.querySelector('.invalid-feedback');
    if (errorDiv) errorDiv.remove();
  }
};

function setupRealtimeValidation(input, validator) {
  if (!input) return;
  
  input.addEventListener('blur', function() {
    const result = validator(input.value);
    if (!result.valid) {
      Validator.showFieldError(input, result.message);
    } else {
      Validator.showFieldSuccess(input);
    }
  });
  
  input.addEventListener('input', function() {
    if (input.classList.contains('is-invalid')) {
      const result = validator(input.value);
      if (result.valid) {
        Validator.showFieldSuccess(input);
      }
    }
  });
}
