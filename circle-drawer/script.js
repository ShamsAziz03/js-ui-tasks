const elements = {
  canvas: document.getElementById("canvas"),
  circles: [],
  hoveredCircle: null,
  context: null,
  popUpWindow: document.getElementById("popUpWindow"),
  closeWindowButton: document.getElementById("closeWindowButton"),
  diameterInput: document.getElementById("diameterInput"),
  selectedCircle: null,
  lastChange: {
    type: "createCircle", //or "changeDiameter"
    oldCircle: null,
    newCircle: null,
  },
  undoButton: document.getElementById("undoButton"),
  mainSection: document.getElementById("main"),
  redoButton: document.getElementById("redoButton"),
  lastUndoChange: {
    type: "createCircle", //or "changeDiameter"
    oldCircle: null,
    newCircle: null,
  },
};

function setCanvasDimensions() {
  //to let dimensions of canvas to be the same (real one with styled one)
  elements.canvas.width = elements.canvas.clientWidth; //from CSS file
  elements.canvas.height = elements.canvas.clientHeight;
}

function init() {
  setCanvasDimensions();
  elements.context = elements.canvas.getContext("2d");
}

function drawCircle(evt) {
  const rect = elements.canvas.getBoundingClientRect();
  const centerX = evt.clientX - rect.left;
  const centerY = evt.clientY - rect.top;
  const raduis = 30;

  let circle = new Path2D();
  //using offset
  // circle.arc(evt.offsetX, evt.offsetY, 20, 0, 2 * Math.PI, false);
  //or client dimensions
  circle.arc(centerX, centerY, raduis, 0, 2 * Math.PI, false);

  //add circle center to the array of what drawing
  const newCircle = {
    id: crypto.randomUUID(), //to creaate a uniqe id
    x: centerX,
    y: centerY,
    color: "black",
    r: raduis,
  };
  elements.circles.push(newCircle);

  elements.context.fillStyle = "black";
  elements.context.fill(circle);

  elements.lastChange = {
    type: "createCircle",
    oldCircle: null,
    newCircle: newCircle,
  };
  elements.undoButton.disabled = false;
}

function showMenu() {
  elements.popUpWindow.style.visibility = "visible";
  document.getElementById("contentOfWindow").innerText =
    ` Adjust diameter of circle at (${elements.selectedCircle.x}, ${elements.selectedCircle.y})`;
  elements.diameterInput.value = `${elements.selectedCircle.r * 2}`;
}

function redrawCircles() {
  elements.context.clearRect(
    0,
    0,
    elements.canvas.width,
    elements.canvas.height,
  ); // clear the canvas first
  elements.circles.forEach((arc) => {
    elements.context.beginPath();
    elements.context.arc(arc.x, arc.y, arc.r, 0, Math.PI * 2);
    elements.context.fillStyle = arc.color;
    elements.context.fill();
    elements.context.closePath();
  });
}

function undo() {
  elements.redoButton.disabled = false;
  if (elements.lastChange.type === "createCircle") {
    elements.lastUndoChange = {
      type: "createCircle",
      newCircle: { ...elements.lastChange.newCircle },
      oldCircle: null,
    };

    elements.circles = elements.circles.filter(
      (c) => c.id !== elements.lastChange.newCircle.id,
    );
    redrawCircles();
  } else if (elements.lastChange.type === "changeDiameter") {
    elements.lastUndoChange = {
      type: "changeDiameter",
      oldCircle: { ...elements.lastChange.newCircle },
      newCircle: { ...elements.lastChange.oldCircle },
    };

    for (let i = 0; i < elements.circles.length; i++) {
      if (elements.lastChange.newCircle.id === elements.circles[i].id) {
        elements.circles[i].r = elements.lastChange.oldCircle.r;
        redrawCircles();
        return;
      }
    }
  }
}

function redo() {
  if (elements.lastUndoChange.type === "createCircle") {
    elements.circles.push(elements.lastUndoChange.newCircle);
    redrawCircles();
  } else if (elements.lastUndoChange.type === "changeDiameter") {
    for (let i = 0; i < elements.circles.length; i++) {
      if (elements.lastUndoChange.newCircle.id === elements.circles[i].id) {
        elements.circles[i].r = elements.lastUndoChange.oldCircle.r;
        redrawCircles();
        return;
      }
    }
  }
}

// To prevent default operation of right mouse click
elements.mainSection.addEventListener("contextmenu", function (event) {
  event.preventDefault();
});

elements.canvas.addEventListener("mousedown", function (evt) {
  if (evt.button === 0) {
    drawCircle(evt);
  } else if (evt.button === 2 && elements.hoveredCircle !== null) {
    elements.selectedCircle = elements.hoveredCircle;
    showMenu();
  }
});

elements.canvas.addEventListener("mousemove", (evt) => {
  const currentX = evt.offsetX;
  const currentY = evt.offsetY;

  elements.circles.forEach((c) => (c.color = "black"));

  let { circle } =
    elements.circles
      .map(function circleDistance(k) {
        const dx = k.x - currentX;
        const dy = k.y - currentY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance <= k.r)
          return {
            distance,
            circle: k,
          };
        else {
          return null; //must return null if distance grater than raduis
        }
      })
      .reduce(function isNearestCircle(lastObj, obj) {
        if (!lastObj && obj) return obj;
        if (!obj && lastObj) return lastObj;
        if (lastObj && obj && lastObj.distance >= obj.distance) return obj;
        return lastObj;
      }, null) ?? {};

  if (circle) {
    elements.hoveredCircle = circle;
    elements.hoveredCircle.color = "gray";
  } else {
    elements.hoveredCircle = null;
  }

  redrawCircles();
});

elements.closeWindowButton.addEventListener("click", () => {
  elements.popUpWindow.style.visibility = "hidden";
  elements.selectedCircle = null;
});

elements.diameterInput.addEventListener("change", (event) => {
  //use change event not input
  if (elements.selectedCircle !== null) {
    elements.lastChange = {
      type: "changeDiameter",
      oldCircle: { ...elements.selectedCircle },
    };
    elements.selectedCircle.r = Number(event.target.value) / 2;
    elements.lastChange.newCircle = { ...elements.selectedCircle };
    redrawCircles();
  }
});

init();
