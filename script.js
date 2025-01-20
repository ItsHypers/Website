// Fetch the data from the JSON file
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const grid = document.querySelector('.grid');
    const popup = document.querySelector('.description-popup'); // The description popup that is above the grid
    
    data.forEach(item => {
      // Create a grid item
      const gridItem = document.createElement('div');
      gridItem.classList.add('grid-item');
      
      // Create image container
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('image-container');
      
      const image = document.createElement('img');
      image.src = item.image;
      image.classList.add('static-image');
      image.alt = 'Image';
      
      const hoverImage = document.createElement('img');
      hoverImage.src = "sparkle.gif"; // GIF that will appear on hover
      hoverImage.classList.add('hover-image');
      hoverImage.alt = 'Sparkle Effect';
      
      imageContainer.appendChild(image);
      imageContainer.appendChild(hoverImage);
      
      // Append elements to the grid item
      gridItem.appendChild(imageContainer);
      grid.appendChild(gridItem);
      
      // Show the popup with description on hover
      gridItem.addEventListener('mouseenter', (event) => {
        const rect = event.target.getBoundingClientRect(); // Get the position of the hovered item
        const popupContent = `
          <strong>Catch Method:</strong> ${item.catchMethod}<br>
          <strong>Catch Location:</strong> ${item.catchLocation}<br>
          <strong>Date:</strong> ${item.date}
        `;
        
        // Set the popup content
        popup.innerHTML = popupContent;
        
        // Position the popup below the hovered image (relative to viewport)
        popup.style.display = 'block';
        popup.style.top = `${rect.bottom + window.scrollY + 10}px`; // 10px padding below
        popup.style.left = `${rect.left + window.scrollX}px`; // Align with the left of the image
      });
      
      gridItem.addEventListener('mouseleave', () => {
        popup.style.display = 'none'; // Hide the popup when not hovering
      });
    });
  });
