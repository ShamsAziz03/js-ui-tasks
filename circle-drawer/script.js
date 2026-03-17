const elements = {
  canvas: document.getElementById("canvas"),
  circles: [],
  hoveredCircle: null,
  context: null,
  popUpWindow: document.getElementById("popUpWindow"),
  closeWindowButton: document.getElementById("closeWindowButton"),
  diameterInput: document.getElementById("diameterInput"),
  selectedCircle: null,
};

function drawCircle(evt) {
  elements.context = elements.canvas.getContext("2d");
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
  elements.circles.push({
    x: centerX,
    y: centerY,
    color: "black",
    r: raduis,
  });

  elements.context.fillStyle = "black";
  elements.context.fill(circle);
}

function showMenu() {
  elements.popUpWindow.style.cssText = `
  display:flex;
  flex-direction:column;
  background-color: rgb(255, 255, 255);
  border: 2px solid black;
  position:absolute;
  top:60%;
  left:50%;
  transform: translate(-50%,-50%);
  z-index:1000;
  padding:10px;
  `;
  document.getElementById("contentOfWindow").innerText =
    ` Adjust diameter of circle at (${elements.selectedCircle.x}, ${elements.selectedCircle.y})`;
  elements.diameterInput.value = `${elements.selectedCircle.r * 2}`;
}

function setCanvasDimensions() {
  //to let dimensions of canvas to be the same (real one with styled one)
  elements.canvas.width = elements.canvas.clientWidth; //from CSS file
  elements.canvas.height = elements.canvas.clientHeight;
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

// To prevent default operation of right mouse click
document.addEventListener("contextmenu", function (event) {
  event.preventDefault();
  console.log("Default context menu prevented!");
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

  let insideCircle = false;
  let nearestPoint = null;

  for (const k of elements.circles) {
    k.color = "black";
    const dx = k.x - currentX;
    const dy = k.y - currentY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance <= k.r) //so u r in the circle
    {
      if (!nearestPoint) nearestPoint = k;
      else {
        const ndx = nearestPoint.x - currentX;
        const ndy = nearestPoint.y - currentY;
        const nearestDistance = Math.sqrt(ndx * ndx + ndy * ndy);
        if (nearestDistance >= distance) {
          nearestPoint = k;
        }
      }
    } 
  }

  if (nearestPoint) {
    elements.hoveredCircle = nearestPoint;
    elements.hoveredCircle.color = "gray";
    insideCircle = true;
  }

  redrawCircles();

  if (!insideCircle) {
    if (elements.hoveredCircle) {
      //!=null
      elements.hoveredCircle = null;
    }
  }
});

elements.closeWindowButton.addEventListener("click", () => {
  elements.popUpWindow.style.display = "none";
  elements.selectedCircle = null;
});

elements.diameterInput.addEventListener("input", (event) => {
  if (elements.selectedCircle !== null) {
    elements.selectedCircle.r = Number(event.target.value) / 2;
    redrawCircles();
  }
});

setCanvasDimensions();
