// Select the grid and filter elements
const grid = document.querySelector('.grid');
const categoryFilter = document.getElementById('categoryFilter');
const popup = document.getElementById('popup');
const popupImg = document.getElementById('popup-img');

// Clear the popup content dynamically
function clearPopupContent() {
  popup.innerHTML = ''; // Clear existing content from the popup
  const popupHeader = document.createElement('h3');
  popupHeader.textContent = 'Details:';
  popup.appendChild(popupHeader);
}

// Fetch the data from the JSON file
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    // Extract all unique categories from the data
    const categories = new Set();
    data.forEach(item => {
      item.categories.forEach(category => categories.add(category));
    });

    // Add "All" option to the dropdown
    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.textContent = 'All';
    categoryFilter.appendChild(allOption);

    // Create the category filter dropdown options
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });

    // Function to populate the grid with images
    function populateGrid(filteredData) {
      grid.innerHTML = ''; // Clear the grid before repopulating
      filteredData.forEach(item => {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = 'Image';
        img.dataset.index = filteredData.indexOf(item); // Store the index for later use

        gridItem.appendChild(img);
        grid.appendChild(gridItem);

        // Hover effect to show popup and handle opacity
        img.addEventListener('mouseenter', () => {
          // Display the popup below the hovered image
          const rect = img.getBoundingClientRect();
          popup.style.top = `${rect.top + window.scrollY + rect.height + 10}px`; // Adjust to position below the image
          popup.style.left = `${rect.left + window.scrollX}px`;
          popup.style.display = 'block';
          popup.style.zIndex = '10'; // Ensure it's on top of the images

          // Clear any old content
          clearPopupContent();

          // Set the popup data from the JSON item
          const itemData = filteredData[img.dataset.index];
          popupImg.src = itemData.image;

          // Dynamically add fields to the popup based on available data
          Object.keys(itemData).forEach(key => {
            // Skip the image field and categories
            if (key === "image" || key === "categories") return;

            // Create a new paragraph element for each key
            const field = document.createElement('p');
            field.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)}: ${itemData[key]}`;

            // Append the field to the popup
            popup.appendChild(field);
          });

          // Lower the opacity of other images
          const images = document.querySelectorAll('.grid-item img');
          images.forEach(otherImage => {
            if (otherImage !== img) {
              otherImage.style.opacity = '0.33';
            }
          });

          // Scale up the hovered image
          img.style.transform = 'scale(1.1)';
        });

        // Ensure the popup stays visible and does not flicker
        img.addEventListener('mouseleave', () => {
          setTimeout(() => {
            popup.style.display = 'none';
            const images = document.querySelectorAll('.grid-item img');
            images.forEach(otherImage => {
              otherImage.style.opacity = '1';
              otherImage.style.transform = 'scale(1)';
            });
          }, 200); // Delay hiding the popup after mouse leaves the image
        });

        // Ensure the popup stays visible even if hovering over the popup
        popup.addEventListener('mouseenter', () => {
          popup.style.display = 'block';
        });

        // Hide the popup when mouse leaves both the image and popup
        popup.addEventListener('mouseleave', () => {
          setTimeout(() => {
            popup.style.display = 'none';
            const images = document.querySelectorAll('.grid-item img');
            images.forEach(otherImage => {
              otherImage.style.opacity = '1';
              otherImage.style.transform = 'scale(1)';
            });
          }, 200); // Delay hiding the popup to prevent flicker
        });
      });
    }

    // Initial population of the grid with "all" category
    populateGrid(data);

    // Handle category filter
    categoryFilter.addEventListener('change', () => {
      const selectedCategory = categoryFilter.value;
      const filteredData = data.filter(item => item.categories.includes(selectedCategory) || selectedCategory === 'all');
      populateGrid(filteredData);
    });
  })
  .catch(error => {
    console.error('Error loading the data:', error);
  });
