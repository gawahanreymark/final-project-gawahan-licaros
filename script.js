const STORAGE_KEY = 'findit_items';
const CATEGORIES = [
  'Electronics', 'Bags', 'Keys', 'IDs & Cards',
  'Books & Supplies', 'Clothing', 'Bottles & Containers', 'Other'
];

// 1. Get & save items in localStorage
function getItems() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveItems(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

// 2. Update Homepage stats (runs only if on index.html)
const statLost = document.getElementById('stat-lost');
if (statLost) {
  const items = getItems();
  const lostCount = items.filter(item => item.type === 'lost').length;
  const foundCount = items.filter(item => item.type === 'found').length;

  statLost.textContent = lostCount;
  document.getElementById('stat-found').textContent = foundCount;
  document.getElementById('stat-total').textContent = items.length;
}

// 3. App Page Setup (runs only if on app.html)
const grid = document.getElementById('grid');
if (grid) {
  const filterCategory = document.getElementById('filter-category');
  const formCategory = document.getElementById('f-category');

  // Fill both category dropdowns
  CATEGORIES.forEach(cat => {
    filterCategory.innerHTML += `<option value="${cat}">${cat}</option>`;
    formCategory.innerHTML += `<option value="${cat}">${cat}</option>`;
  });

  // Render filtered items into #grid (US1)
  function renderItems() {
    const query = document.getElementById('q').value.toLowerCase().trim();
    const cat = filterCategory.value;
    const status = document.getElementById('filter-status').value;

    const filtered = getItems().filter(item => {
      const matchText = `${item.name} ${item.location} ${item.description}`.toLowerCase().includes(query);
      const matchCat = cat === 'all' || item.category === cat;
      const matchStatus = status === 'all' || item.type === status;
      return matchText && matchCat && matchStatus;
    });

    document.getElementById('result-count').textContent = `${filtered.length} item(s) shown`;
    document.getElementById('empty').hidden = filtered.length > 0;
    grid.innerHTML = filtered.map(item => `
      <article class="card">
        <span class="badge ${item.type}">${item.type}</span>
        <h3>${item.name}</h3>
        <p>${item.location} • ${item.date || 'No date'}</p>
        <button type="button" onclick="openDetails('${item.id}')">View details</button>
      </article>
    `).join('');
  }

  // 4. Handle Report Form Submit & Validation (US2)
  const reportForm = document.getElementById('report-form');
  reportForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('f-name');
    const locInput = document.getElementById('f-location');
    const nameErr = document.getElementById('err-name');
    const locErr = document.getElementById('err-location');

    // Reset error visibility
    nameErr.hidden = nameInput.value.trim() !== '';
    locErr.hidden = locInput.value.trim() !== '';
    if (!nameErr.hidden || !locErr.hidden) return;

    const newItem = {
      id: Date.now().toString(),
      type: document.getElementById('f-type').value,
      name: nameInput.value.trim(),
      category: formCategory.value,
      location: locInput.value.trim(),
      date: document.getElementById('f-date').value,
      contact: document.getElementById('f-contact').value.trim(),
      description: document.getElementById('f-description').value.trim()
    };

    const items = getItems();
    items.unshift(newItem);
    saveItems(items);
    reportForm.reset();
    renderItems();
  });

  // 5. Details Modal (US3)
  const dialog = document.getElementById('detail-dialog');
  window.openDetails = (id) => {
    const item = getItems().find(i => i.id === id);
    if (!item) return;

    const badge = document.getElementById('dlg-badge');
    badge.className = `badge ${item.type}`;
    badge.textContent = item.type;
    document.getElementById('dlg-title').textContent = item.name;
    document.getElementById('dlg-body').innerHTML = `
      <p><strong>Category:</strong> ${item.category}</p>
      <p><strong>Location:</strong> ${item.location}</p>
      <p><strong>Date:</strong> ${item.date || 'Not specified'}</p>
      <p><strong>Contact:</strong> ${item.contact || 'Not specified'}</p>
      <p><strong>Description:</strong> ${item.description || 'No description.'}</p>
    `;
    dialog.showModal();
  };

  document.getElementById('dlg-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });

  // 6. Live Search & Filter Listeners + Initial Render (US1)
  document.getElementById('q').addEventListener('input', renderItems);
  filterCategory.addEventListener('change', renderItems);
  document.getElementById('filter-status').addEventListener('change', renderItems);
  renderItems();
}