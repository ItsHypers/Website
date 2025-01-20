fetch('data.json')
    .then(response => response.json())
    .then(data => {
        let imagesContainer = document.querySelector('.grid');
        let categoryDropdown = document.querySelector('.category-dropdown select');

        // Get unique categories from all the images
        let categories = [...new Set(data.flatMap(item => item.categories))]; // Remove duplicate categories

        // Add "All" as the first category
        categories.unshift("All");

        // Populate the dropdown with categories dynamically
        categories.forEach(category => {
            // Only add the "All" category once
            if (!categoryDropdown.querySelector(`option[value="${category}"]`)) {
                let option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                categoryDropdown.appendChild(option);
            }
        });

        // Function to render images based on the selected category
        function renderImages(selectedCategories) {
            imagesContainer.innerHTML = ''; // Clear existing images
            let filteredImages;

            // If "All" is selected, show all images
            if (selectedCategories.includes("All")) {
                filteredImages = data;
            } else {
                // Filter images based on selected categories
                filteredImages = data.filter(item => 
                    selectedCategories.some(category => item.categories.includes(category))
                );
            }

            // Render filtered images
            filteredImages.forEach(item => {
                let gridItem = document.createElement('div');
                gridItem.classList.add('grid-item');

                let imageContainer = document.createElement('div');
                imageContainer.classList.add('image-container');

                // Static Image
                let staticImage = document.createElement('img');
                staticImage.src = item.image;  // The image path from JSON
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
        renderImages(['All']);

        // Filter images when the dropdown value changes
        categoryDropdown.addEventListener('change', (e) => {
            renderImages([e.target.value]);
        });
    })
    .catch(error => console.error('Error loading the data:', error));
