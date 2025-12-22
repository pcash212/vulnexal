var AuthManager = (function() {
  var timer = null;
  var interval = 3000000;
  
  function startRefresh() {
    if (timer) clearInterval(timer);
    timer = setInterval(async function() {
      var u = firebase.auth().currentUser;
      if (u) {
        try {
          await u.getIdToken(true);
        } catch (e) {
          logout();
        }
      }
    }, interval);
  }
  
  function stopRefresh() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }
  
  async function getToken() {
    var u = firebase.auth().currentUser;
    if (!u) return null;
    try {
      return await u.getIdToken();
    } catch (e) {
      return null;
    }
  }
  
  async function verify() {
    var u = firebase.auth().currentUser;
    if (!u) return { valid: false };
    
    try {
      var tok = await u.getIdToken();
      if (!tok) return { valid: false };
      
      var res = await u.getIdTokenResult();
      var age = Date.now() - new Date(res.issuedAtTime).getTime();
      
      if (age > 3600000) {
        await u.getIdToken(true);
      }
      
      return { 
        valid: true, 
        uid: u.uid,
        email: u.email,
        verified: u.emailVerified
      };
    } catch (e) {
      return { valid: false };
    }
  }
  
  async function request(url, opts) {
    var tok = await getToken();
    if (!tok) throw new Error('Auth required');
    
    var h = opts.headers || {};
    h['Authorization'] = 'Bearer ' + tok;
    var o = Object.assign({}, opts, { headers: h });
    var r = await fetch(url, o);
    
    if (r.status === 401 || r.status === 403) {
      logout();
      throw new Error('Auth failed');
    }
    
    return r;
  }
  
  function clear() {
    try {
      localStorage.removeItem('vulnexal_session');
      localStorage.removeItem('rememberedEmail');
      sessionStorage.clear();
    } catch (e) {}
  }
  
  function logout() {
    stopRefresh();
    clear();
    firebase.auth().signOut()
      .then(function() { window.location.href = 'index.html'; })
      .catch(function() { window.location.href = 'index.html'; });
  }
  
  function init() {
    firebase.auth().onAuthStateChanged(function(u) {
      if (u) {
        startRefresh();
      } else {
        stopRefresh();
        clear();
      }
    });
  }
  
  return {
    init: init,
    getToken: getToken,
    verify: verify,
    request: request,
    logout: logout,
    start: startRefresh,
    stop: stopRefresh
  };
})();
