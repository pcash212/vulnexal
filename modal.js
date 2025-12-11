const VulnexModal = {
  create: (type, title, message, options = {}) => {
    const existingModal = document.querySelector('.vulnex-modal-overlay');
    if (existingModal) existingModal.remove();

    const icons = {
      success: 'bi-check-circle-fill',
      error: 'bi-x-circle-fill',
      warning: 'bi-exclamation-triangle-fill',
      info: 'bi-info-circle-fill'
    };

    const overlay = document.createElement('div');
    overlay.className = 'vulnex-modal-overlay';
    
    const modal = document.createElement('div');
    modal.className = 'vulnex-modal';
    
    const closeBtn = options.showClose !== false ? `
      <button class="vulnex-modal-close" onclick="VulnexModal.close()">
        <i class="bi bi-x"></i>
      </button>
    ` : '';
    
    const primaryBtnText = options.primaryBtnText || 'OK';
    const secondaryBtnText = options.secondaryBtnText;
    
    const footerButtons = secondaryBtnText ? `
      <button class="vulnex-modal-btn vulnex-modal-btn-secondary" onclick="VulnexModal.onSecondary()">
        ${secondaryBtnText}
      </button>
      <button class="vulnex-modal-btn vulnex-modal-btn-primary" onclick="VulnexModal.onPrimary()">
        ${primaryBtnText}
      </button>
    ` : `
      <button class="vulnex-modal-btn vulnex-modal-btn-primary" onclick="VulnexModal.close()">
        ${primaryBtnText}
      </button>
    `;
    
    modal.innerHTML = `
      ${closeBtn}
      <div class="vulnex-modal-header">
        <div class="vulnex-modal-icon ${type}">
          <i class="bi ${icons[type]}"></i>
        </div>
        <h3 class="vulnex-modal-title">${title}</h3>
      </div>
      <div class="vulnex-modal-body">
        <p class="vulnex-modal-message">${message}</p>
      </div>
      <div class="vulnex-modal-footer">
        ${footerButtons}
      </div>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    VulnexModal.primaryCallback = options.onPrimary || (() => VulnexModal.close());
    VulnexModal.secondaryCallback = options.onSecondary || (() => VulnexModal.close());
    
    setTimeout(() => overlay.classList.add('active'), 10);
    
    if (options.autoClose) {
      setTimeout(() => VulnexModal.close(), options.autoClose);
    }
    
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay && options.closeOnBackdrop !== false) {
        VulnexModal.close();
      }
    });
    
    return overlay;
  },

  close: () => {
    const overlay = document.querySelector('.vulnex-modal-overlay');
    if (overlay) {
      overlay.classList.remove('active');
      setTimeout(() => overlay.remove(), 300);
    }
  },

  onPrimary: () => {
    if (VulnexModal.primaryCallback) {
      VulnexModal.primaryCallback();
    }
  },

  onSecondary: () => {
    if (VulnexModal.secondaryCallback) {
      VulnexModal.secondaryCallback();
    }
  },

  success: (message, title = 'Success!', options = {}) => {
    return VulnexModal.create('success', title, message, options);
  },

  error: (message, title = 'Error!', options = {}) => {
    return VulnexModal.create('error', title, message, options);
  },

  warning: (message, title = 'Warning!', options = {}) => {
    return VulnexModal.create('warning', title, message, options);
  },

  info: (message, title = 'Information', options = {}) => {
    return VulnexModal.create('info', title, message, options);
  },

  confirm: (message, title = 'Confirm', options = {}) => {
    return new Promise((resolve) => {
      VulnexModal.create('warning', title, message, {
        ...options,
        primaryBtnText: options.primaryBtnText || 'Confirm',
        secondaryBtnText: options.secondaryBtnText || 'Cancel',
        onPrimary: () => {
          VulnexModal.close();
          resolve(true);
        },
        onSecondary: () => {
          VulnexModal.close();
          resolve(false);
        }
      });
    });
  }
};

window.VulnexModal = VulnexModal;
