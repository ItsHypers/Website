// Load JSON file and populate the grid
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        let imagesContainer = document.querySelector('.grid');
        let categoryDropdown = document.querySelector('.category-dropdown select');

        // Get unique categories
        let categories = ['All', ...new Set(data.map(item => item.category))];

        // Populate the dropdown with categories dynamically
        categories.forEach(category => {
            let option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryDropdown.appendChild(option);
        });

        // Function to render images based on the selected category
        function renderImages(category) {
            imagesContainer.innerHTML = ''; // Clear the existing images
            let filteredImages = data.filter(item => category === 'All' || item.category === category);

            filteredImages.forEach(item => {
                let gridItem = document.createElement('div');
                gridItem.classList.add('grid-item');

                let imageContainer = document.createElement('div');
                imageContainer.classList.add('image-container');

                // Static Image
                let staticImage = document.createElement('img');
                staticImage.src = item.image;
                staticImage.classList.add('static-image');

                // Hover Image (GIF)
                let hoverImage = document.createElement('img');
                hoverImage.src = 'sparkle.gif';  // Assuming the gif file is named 'sparkle.gif'
                hoverImage.classList.add('hover-image');

                imageContainer.appendChild(staticImage);
                imageContainer.appendChild(hoverImage);
                gridItem.appendChild(imageContainer);
                imagesContainer.appendChild(gridItem);
            });
        }

        // Initial render of all images
        renderImages('All');

        // Filter images when the dropdown value changes
        categoryDropdown.addEventListener('change', (e) => {
            renderImages(e.target.value);
        });
    })
    .catch(error => console.error('Error loading the data:', error));
