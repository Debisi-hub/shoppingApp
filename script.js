const itemForm = document.getElementById('itemForm');
const itemList = document.getElementById('itemList');
const totalCostEl = document.getElementById('totalCost');
const searchInput = document.getElementById('searchInput');
const filterCategory = document.getElementById('filterCategory');

let items = JSON.parse(localStorage.getItem('items')) || [];

//  Save to localStorage 
function saveItems() {
  localStorage.setItem('items', JSON.stringify(items));
}

//  Calculate Total 
function updateTotal() {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  totalCostEl.textContent = total;
}

//  Render Items 
function renderItems() {
  itemList.innerHTML = '';

  const searchText = searchInput.value.toLowerCase();
  const categoryFilter = filterCategory.value;

  items.forEach((item, index) => {
    if (
      item.name.toLowerCase().includes(searchText) &&
      (categoryFilter === 'All' || item.category === categoryFilter)
    ) {
      const li = document.createElement('li');
      if (item.important) li.classList.add('important');

      li.innerHTML = `
        <span>
          ${item.name} - ₦${item.price} (${item.category})
        </span>
        <div class="actions">
          <button onclick="toggleImportant(${index})">IMP</button>
          <button onclick="deleteItem(${index})">DEL</button>
        </div>
      `;

      itemList.appendChild(li);
    }
  });

  updateTotal();
}

//  Add Item 
itemForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = itemName.value;
  const price = Number(itemPrice.value);
  const category = itemCategory.value;

  items.push({
    name,
    price,
    category,
    important: false
  });

  saveItems();
  renderItems();
  itemForm.reset();
});

//  Delete Item 
function deleteItem(index) {
  items.splice(index, 1);
  saveItems();
  renderItems();
}

//  Toggle Important 
function toggleImportant(index) {
  items[index].important = !items[index].important;
  saveItems();
  renderItems();
}

//  Filters 
searchInput.addEventListener('input', renderItems);
filterCategory.addEventListener('change', renderItems);

// Initial load
renderItems();
