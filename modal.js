const VulnexalModal = {
  create: (type, title, message, options = {}) => {
    const existingModal = document.querySelector('.vulnexal-modal-overlay');
    if (existingModal) existingModal.remove();

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
    
    const closeBtn = options.showClose !== false ? `
      <button class="vulnexal-modal-close" onclick="VulnexalModal.close()">
        <i class="bi bi-x"></i>
      </button>
    ` : '';
    
    const primaryBtnText = options.primaryBtnText || 'OK';
    const secondaryBtnText = options.secondaryBtnText;
    
    const footerButtons = secondaryBtnText ? `
      <button class="vulnexal-modal-btn vulnexal-modal-btn-secondary" onclick="VulnexalModal.onSecondary()">
        ${secondaryBtnText}
      </button>
      <button class="vulnexal-modal-btn vulnexal-modal-btn-primary" onclick="VulnexalModal.onPrimary()">
        ${primaryBtnText}
      </button>
    ` : `
      <button class="vulnexal-modal-btn vulnexal-modal-btn-primary" onclick="VulnexalModal.close()">
        ${primaryBtnText}
      </button>
    `;
    
    modal.innerHTML = `
      ${closeBtn}
      <div class="vulnexal-modal-header">
        <div class="vulnexal-modal-icon ${type}">
          <i class="bi ${icons[type]}"></i>
        </div>
        <h3 class="vulnexal-modal-title">${title}</h3>
      </div>
      <div class="vulnexal-modal-body">
        <p class="vulnexal-modal-message">${message}</p>
      </div>
      <div class="vulnexal-modal-footer">
        ${footerButtons}
      </div>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    VulnexalModal.primaryCallback = options.onPrimary || (() => VulnexalModal.close());
    VulnexalModal.secondaryCallback = options.onSecondary || (() => VulnexalModal.close());
    
    setTimeout(() => overlay.classList.add('active'), 10);
    
    if (options.autoClose) {
      setTimeout(() => VulnexalModal.close(), options.autoClose);
    }
    
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay && options.closeOnBackdrop !== false) {
        VulnexalModal.close();
      }
    });
    
    return overlay;
  },

  close: () => {
    const overlay = document.querySelector('.vulnexal-modal-overlay');
    if (overlay) {
      overlay.classList.remove('active');
      setTimeout(() => overlay.remove(), 300);
    }
  },

  onPrimary: () => {
    if (VulnexalModal.primaryCallback) {
      VulnexalModal.primaryCallback();
    }
  },

  onSecondary: () => {
    if (VulnexalModal.secondaryCallback) {
      VulnexalModal.secondaryCallback();
    }
  },

  success: (message, title = 'Success!', options = {}) => {
    return VulnexalModal.create('success', title, message, options);
  },

  error: (message, title = 'Error!', options = {}) => {
    return VulnexalModal.create('error', title, message, options);
  },

  warning: (message, title = 'Warning!', options = {}) => {
    return VulnexalModal.create('warning', title, message, options);
  },

  info: (message, title = 'Information', options = {}) => {
    return VulnexalModal.create('info', title, message, options);
  },

  confirm: (message, title = 'Confirm', options = {}) => {
    return new Promise((resolve) => {
      VulnexalModal.create('warning', title, message, {
        ...options,
        primaryBtnText: options.primaryBtnText || 'Confirm',
        secondaryBtnText: options.secondaryBtnText || 'Cancel',
        onPrimary: () => {
          VulnexalModal.close();
          resolve(true);
        },
        onSecondary: () => {
          VulnexalModal.close();
          resolve(false);
        }
      });
    });
  }
};

window.VulnexalModal = VulnexalModal;
