let items = []; // Store items
let totalQuantity = 0; // Track total quantity
let totalPicked = 0; // Track picked quantity

// Add item when clicking 'Add Item' button
document.getElementById('add-item-btn').addEventListener('click', function() {
    const itemName = document.getElementById('item-name').value.trim();
    const itemQuantity = parseInt(document.getElementById('item-quantity').value);

    if (itemName && itemQuantity > 0) {
        const item = {
            name: itemName,
            quantity: itemQuantity,
            picked: 0
        };
        items.push(item);
        renderItems(); // Re-render the items list
        updateProgress();
        document.getElementById('item-name').value = ''; // Clear input
        document.getElementById('item-quantity').value = ''; // Clear input
    }
});

// Filter items dynamically
document.getElementById('filter').addEventListener('input', renderItems);

// Sort items dynamically
document.getElementById('sort-options').addEventListener('change', renderItems);

// Render items with filtering and sorting
function renderItems() {
    const filterText = document.getElementById('filter').value.toLowerCase();
    const sortOption = document.getElementById('sort-options').value;

    // Filter items based on the search input
    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(filterText)
    );

    // Sort items based on the selected option
    if (sortOption === 'name-asc') {
        filteredItems.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'name-desc') {
        filteredItems.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOption === 'quantity-asc') {
        filteredItems.sort((a, b) => a.quantity - b.quantity);
    } else if (sortOption === 'quantity-desc') {
        filteredItems.sort((a, b) => b.quantity - a.quantity);
    }

    // Render filtered and sorted items
    const itemList = document.getElementById('item-list');
    itemList.innerHTML = '';
    filteredItems.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.classList.toggle('done', item.picked === item.quantity);
        listItem.classList.add('animated-item');
        listItem.innerHTML = `
            <input type="checkbox" class="check-item" data-index="${index}" ${item.picked === item.quantity ? 'checked' : ''}>
            <span>${item.name} - ${item.quantity} units</span>
            <input type="number" value="${item.picked}" min="0" max="${item.quantity}" data-index="${index}" class="quantity-input">
            <button class="remove-btn" data-index="${index}">Remove</button>
        `;
        itemList.appendChild(listItem);
    });

    // Add event listeners to checkboxes, quantity inputs, and remove buttons
    attachItemEventListeners();
}

// Attach event listeners to newly rendered items
function attachItemEventListeners() {
    document.querySelectorAll('.check-item').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const index = this.dataset.index;
            items[index].picked = this.checked ? items[index].quantity : 0;
            renderItems();  // Re-render items when checkbox changes
            updateProgress();
        });
    });

    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('input', function() {
            const index = this.dataset.index;
            const newPicked = parseInt(this.value);
            if (newPicked <= items[index].quantity) {
                items[index].picked = newPicked;
                renderItems();
                updateProgress();
            }
        });
    });

    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.dataset.index;
            items.splice(index, 1);  // Remove item
            renderItems();  // Re-render items
            updateProgress();
        });
    });
}

// Update the progress of picked items
function updateProgress() {
    const total = items.reduce((acc, item) => acc + item.quantity, 0);
    totalPicked = items.reduce((acc, item) => acc + item.picked, 0);
    const progress = total > 0 ? (totalPicked / total) * 100 : 0;
    document.getElementById('progress-percentage').textContent = `${Math.round(progress)}%`;
}
document.getElementById("exploreButton").addEventListener("click", () => {
  alert("🌟 Let's go! Your adventure begins now!");
});
