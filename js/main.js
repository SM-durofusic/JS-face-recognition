window.onload = () => {
  var typeSelect = document.getElementById('type-select');
  var video = document.getElementById('video');
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  var selectedType = 'face';
  typeSelect.addEventListener('change', () => {
    selectedType = typeSelect[typeSelect.selectedIndex].value;
    selectType(selectedType, video, canvas, context);
  });
  selectType(selectedType, video, canvas, context);
};

const selectType = (selectedType, video, canvas, context) => {
  trackerFunc(selectedType, video, canvas, context);
};

const trackerFunc = (type, video, canvas, context) => {
  const tracker = new tracking.ObjectTracker([type]);
  tracker.setInitialScale(4);
  tracker.setStepSize(1);
  tracker.setEdgesDensity(0.1);

  tracking.track('#video', tracker, { camera: true });

  tracker.on('track', function(event) {
    // remove previous rectange
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (event.data.length !== 0) {
      // face tracking found something
      event.data.forEach((rect) => {
        context.strokeStyle = '#a64ceb';
        context.strokeRect(rect.x, rect.y, rect.width, rect.height);
        context.font = '11px Helvetica';
        context.fillStyle = '#fff';
        context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
        context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
      });
    }
  });
};
