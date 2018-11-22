window.onload = function() {
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  addRocket(video, canvas, context);
};

const addRocket = (video, canvas, context) => {
  // initialize tracker
  const tracker = new tracking.ObjectTracker(['face']);
  // set properties of face tracking
  tracker.setInitialScale(4);
  tracker.setStepSize(0.8);
  tracker.setEdgesDensity(0.1);

  // initialize tracking on camera
  tracking.track('#video', tracker, { camera: true });
  // add tracking event
  tracker.on('track', function(event) {
    // remove previous rectange
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (event.data.length !== 0) {
      // face tracking found something
      event.data.forEach((rect) => {
        // add image on top of face
        const image = new Image();
        image.src = '../assets/rocket.svg';
        context.drawImage(image, rect.x, rect.y, rect.width, rect.height);
      });
    }
  });
};
