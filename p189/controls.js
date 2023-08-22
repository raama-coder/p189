AFRAME.registerComponent('aircraft-controls', {
  schema: {
    verticalSpeed: { type: 'number', default: 0.1 },
  },
  init: function () {
    this.verticalDirection = 1; // 1 for moving up, -1 for moving down
    this.verticalMovement = 0; // Amount of vertical movement

    this.cameraEntity = document.querySelector('#cameraRig'); // Reference to the camera entity

    // Lock the pointer when entering VR mode
    this.el.sceneEl.canvas.addEventListener('enter-vr', () => {
      this.el.sceneEl.canvas.requestPointerLock();
    });

    // Add a light for shadow casting
    const light = document.createElement('a-light');
    light.setAttribute('type', 'directional');
    light.setAttribute('position', '2 5 -3');
    light.setAttribute('intensity', '0.5');
    light.setAttribute('target', '#cameraRig');
    light.setAttribute('castShadow', 'true'); // Enable shadow casting
    this.el.sceneEl.appendChild(light);

    // Listen for keydown events
    window.addEventListener('keydown', this.onKeyDown.bind(this));
  },
  onKeyDown: function (event) {
    const rotationSpeed = 0.1;
    const rotation = this.cameraEntity.getAttribute('rotation'); // Use camera entity's rotation

    // Handle turning controls
    if (event.key === 'ArrowLeft') {
      rotation.y += rotationSpeed;
    }
    
    if (event.key === 'ArrowRight') {
      rotation.y -= rotationSpeed;
    }

    // Set the new rotation for the camera entity
    this.cameraEntity.setAttribute('rotation', rotation);
  },
  tick: function (time, timeDelta) {
    const verticalStep = this.data.verticalSpeed * this.verticalDirection * (timeDelta / 1000);

    // Update vertical movement
    this.verticalMovement += verticalStep;

    // Change vertical direction at bounds
    if (this.verticalMovement >= 2 || this.verticalMovement <= -2) {
      this.verticalDirection *= -1;
    }

    // Calculate camera's new position
    const cameraPosition = this.cameraEntity.getAttribute('position');
    cameraPosition.y += verticalStep;

    // Move the camera entity
    this.cameraEntity.setAttribute('position', cameraPosition);
  }
});
