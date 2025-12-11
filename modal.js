const VulnexalModal = {
  primaryCallback: null,
  secondaryCallback: null,
  
  create: function(type, title, message, options) {
    options = options || {};
    
    const existing = document.querySelector('.vulnexal-modal-overlay');
    if (existing) {
      existing.remove();
    }

    const icons = {
      success: 'bi-check-circle-fill',
      error: 'bi-x-circle-fill',
      warning: 'bi-exclamation-triangle-fill',
      info: 'bi-info-circle-fill'
    };

    const overlay = document.createElement('div');
    overlay.className = 'vulnexal-modal-overlay';
    
    const modal = document.createElement('div');
    modal.className = 'vulnexal-modal';
    
    const closeBtn = options.showClose !== false 
      ? '<button class="vulnexal-modal-close" onclick="VulnexalModal.close()"><i class="bi bi-x"></i></button>' 
      : '';
    
    const primaryText = options.primaryBtnText || 'OK';
    const secondaryText = options.secondaryBtnText;
    
    let footerButtons = '';
    if (secondaryText) {
      footerButtons = '<button class="vulnexal-modal-btn vulnexal-modal-btn-secondary" onclick="VulnexalModal.onSecondary()">' + secondaryText + '</button>';
      footerButtons += '<button class="vulnexal-modal-btn vulnexal-modal-btn-primary" onclick="VulnexalModal.onPrimary()">' + primaryText + '</button>';
    } else {
      footerButtons = '<button class="vulnexal-modal-btn vulnexal-modal-btn-primary" onclick="VulnexalModal.close()">' + primaryText + '</button>';
    }
    
    const iconClass = icons[type] || icons.info;
    const safeTitle = this.escapeHtml(title);
    const safeMessage = this.escapeHtml(message);
    
    modal.innerHTML = closeBtn +
      '<div class="vulnexal-modal-header">' +
        '<div class="vulnexal-modal-icon ' + type + '">' +
          '<i class="bi ' + iconClass + '"></i>' +
        '</div>' +
        '<h3 class="vulnexal-modal-title">' + safeTitle + '</h3>' +
      '</div>' +
      '<div class="vulnexal-modal-body">' +
        '<p class="vulnexal-modal-message">' + safeMessage + '</p>' +
      '</div>' +
      '<div class="vulnexal-modal-footer">' + footerButtons + '</div>';
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    this.primaryCallback = options.onPrimary || this.close.bind(this);
    this.secondaryCallback = options.onSecondary || this.close.bind(this);
    
    setTimeout(function() {
      overlay.classList.add('active');
    }, 10);
    
    if (options.autoClose) {
      setTimeout(function() {
        VulnexalModal.close();
      }, options.autoClose);
    }
    
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay && options.closeOnBackdrop !== false) {
        VulnexalModal.close();
      }
    });
    
    return overlay;
  },
  
  escapeHtml: function(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  },

  close: function() {
    const overlay = document.querySelector('.vulnexal-modal-overlay');
    if (overlay) {
      overlay.classList.remove('active');
      setTimeout(function() {
        overlay.remove();
      }, 300);
    }
  },

  onPrimary: function() {
    if (this.primaryCallback) {
      this.primaryCallback();
    }
  },

  onSecondary: function() {
    if (this.secondaryCallback) {
      this.secondaryCallback();
    }
  },

  success: function(message, title, options) {
    title = title || 'Success!';
    options = options || {};
    return this.create('success', title, message, options);
  },

  error: function(message, title, options) {
    title = title || 'Error!';
    options = options || {};
    return this.create('error', title, message, options);
  },

  warning: function(message, title, options) {
    title = title || 'Warning!';
    options = options || {};
    return this.create('warning', title, message, options);
  },

  info: function(message, title, options) {
    title = title || 'Information';
    options = options || {};
    return this.create('info', title, message, options);
  },

  confirm: function(message, title, options) {
    title = title || 'Confirm';
    options = options || {};
    
    return new Promise(function(resolve) {
      const confirmOptions = {
        primaryBtnText: options.primaryBtnText || 'Confirm',
        secondaryBtnText: options.secondaryBtnText || 'Cancel',
        onPrimary: function() {
          VulnexalModal.close();
          resolve(true);
        },
        onSecondary: function() {
          VulnexalModal.close();
          resolve(false);
        }
      };
      
      for (let key in options) {
        if (key !== 'primaryBtnText' && key !== 'secondaryBtnText') {
          confirmOptions[key] = options[key];
        }
      }
      
      VulnexalModal.create('warning', title, message, confirmOptions);
    });
  }
};

window.VulnexalModal = VulnexalModal;
