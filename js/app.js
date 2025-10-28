// LOGIN MODAL
const modal = document.getElementById('modal');
const openLogin = document.getElementById('open-login');
const tryLogin = document.getElementById('try-login');
const cancelLogin = document.getElementById('cancel-login');
const doLogin = document.getElementById('do-login');
const goDashboard = document.getElementById('go-dashboard');
const statusEl = document.getElementById('status');

function showModal(){ modal.classList.add('show'); }
function hideModal(){ modal.classList.remove('show'); }

openLogin.addEventListener('click', showModal);
tryLogin.addEventListener('click', showModal);
cancelLogin.addEventListener('click', hideModal);

doLogin.addEventListener('click', () => {
  const user = document.getElementById('user').value || 'guest';
  const token = btoa(JSON.stringify({user, t:Date.now()}));
  localStorage.setItem('tf_token', token);
  hideModal();
  alert(`Logged in as ${user}`);
  location.hash = '#dashboard';
  renderStatus();
});

function isAuthenticated(){ return !!localStorage.getItem('tf_token'); }
function renderStatus(){
  statusEl.textContent = isAuthenticated()
    ? 'Status: Authenticated — token present.'
    : 'Status: Not authenticated — login to unlock dashboard.';
}
renderStatus();

goDashboard.addEventListener('click', () => {
  location.hash = '#dashboard';
  if(!isAuthenticated()) showModal();
});

// Parallax effect
const layer = document.querySelector('.layer.layer-1');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  layer.style.transform = `translateY(${y * -0.06}px) scale(${1 + Math.min(y/6000,0.03)})`;
});

// Horizontal scroll
document.querySelectorAll('.h-scroll').forEach(el => {
  el.addEventListener('wheel', e => {
    if(Math.abs(e.deltaY) > Math.abs(e.deltaX)){
      el.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  });
});

// Keyboard shortcut
window.addEventListener('keydown', e => {
  if(e.key.toLowerCase() === 'l') showModal();
});
