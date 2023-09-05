AFRAME.registerComponent('aircraft-controls', {
  schema: {
    rotationSpeed: { type: 'number', default: 1 },
    moveSpeed: { type: 'number', default: 1 }
  },
  init: function () {
    this.cameraEntity = document.querySelector('#cameraRig'); // Reference to the camera entity

    // Listen for keydown events
    window.addEventListener('keydown', this.onKeyDown.bind(this));
  },
  onKeyDown: function (event) {
    const rotation = this.cameraEntity.getAttribute('rotation'); // Use camera entity's rotation
    const position = this.cameraEntity.getAttribute('position'); // Use camera entity's position
    
    if (event.key === 'ArrowLeft') {
      // Turn left
      rotation.y += this.data.rotationSpeed;
    } else if (event.key === 'ArrowRight') {
      // Turn right
      rotation.y -= this.data.rotationSpeed;
    } else if (event.key === 'ArrowUp') {
      // Move forward along the camera's direction
      const angle = rotation.y * (Math.PI / 180); // Convert to radians
      position.x -= Math.sin(angle) * this.data.moveSpeed;
      position.z -= Math.cos(angle) * this.data.moveSpeed;
    }
    else if (event.key === 'ArrowDown') {
      // Move forward along the camera's direction
      position.y+=this.data.moveSpeed
    }

    // Set the new rotation and position for the camera entity
    this.cameraEntity.setAttribute('rotation', rotation);
    this.cameraEntity.setAttribute('position', position);
  }
});
