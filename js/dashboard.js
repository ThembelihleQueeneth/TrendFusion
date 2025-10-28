const grid = document.getElementById('cryptoGrid');
const search = document.getElementById('search');
const logoutBtn = document.getElementById('logout');

// Redirect if not logged in
if (!localStorage.getItem('tf_token')) {
  alert("You must log in first!");
  window.location.href = "index.html";
}

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('tf_token');
  window.location.href = "index.html";
});

async function fetchData() {
  try {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false'
    );
    const data = await res.json();
    renderCoins(data);
    setupSearch(data);
  } catch (err) {
    grid.innerHTML = "<p>Failed to load data. Try again later.</p>";
  }
}

function renderCoins(coins) {
  grid.innerHTML = coins.map(coin => `
    <div class="card">
      <div class="flex">
        <img src="${coin.image}" alt="${coin.name}">
      </div>
      <h3>${coin.name}</h3>
      <p class="price">$${coin.current_price.toLocaleString()}</p>
      <p class="change ${coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}">
        ${coin.price_change_percentage_24h.toFixed(2)}%
      </p>
    </div>
  `).join('');
}

function setupSearch(data) {
  search.addEventListener('input', e => {
    const term = e.target.value.toLowerCase();
    const filtered = data.filter(c => c.name.toLowerCase().includes(term));
    renderCoins(filtered);
  });
}

// Smooth fade-in animation
window.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = 0;
  document.body.style.transition = "opacity 0.8s ease";
  requestAnimationFrame(() => document.body.style.opacity = 1);
});

fetchData();
