import { DragInput } from "./DragInput";
import "./style.css";

import { toBlob } from "html-to-image";

// get the current theme from the URL
const searchParams = new URLSearchParams(window.location.search);
document.body.dataset.theme = searchParams.get("theme") ?? "light";

const mainWrapperEl = document.querySelector(".main-wrapper") as HTMLDivElement;
const mainContainerEl = document.querySelector(
  ".main-container"
) as HTMLDivElement;
const mainEl = document.querySelector(".main") as HTMLDivElement;
const addToPenpotButton = document.querySelector(
  "#addToPenpot"
) as HTMLButtonElement;

addToPenpotButton.addEventListener("click", async () => {
  if (mainEl.innerHTML.includes("Select a board to continue")) {
    console.log("Empty");
    return;
  }

  addToPenpotButton.disabled = true;
  addToPenpotButton.innerHTML = `<div class="loader center " id="loader"></div>`;

  const imageData = await getImage();

  console.log("----------------------");
  console.log(imageData);
  // send message to plugin.ts
  parent.postMessage(
    {
      type: "add",
      data: imageData,
    },
    "*"
  );
});

async function getImage() {
  // const data = await toPixelData(mainWrapperEl);

  // if (data instanceof Uint8ClampedArray) {
  //   const imageData = new Uint8Array(data);
  //   return imageData;
  // }
  const transformedMainWrapper = mainWrapperEl;
  transformedMainWrapper.style.border = "none";

  const data = await toBlob(transformedMainWrapper);

  if (data) {
    const buffer = await data.arrayBuffer();
    return new Uint8Array(buffer);
  }

  console.log("Error: Couldn't get image");
}

// Listen plugin.ts messages
window.addEventListener("message", (event) => {
  if (event.data.source === "penpot") {
    document.body.dataset.theme = event.data.theme;
  }

  if (event.data.type === "selection") {
    if (!event.data.htmlData) {
      resetAll();
    }

    mainEl.innerHTML = event.data.htmlData
      ? event.data.htmlData
      : `<p class="caption">Select a board to continue</p>`;
    updateStyles(event.data.cssData);
  }

  if (event.data.type === "added") {
    addToPenpotButton.disabled = false;
    addToPenpotButton.innerHTML = "Add to Penpot";
  }
});

const updateStyles = (newStyles: string) => {
  let styleSheet = document.getElementById("dynamic-styles");

  if (!styleSheet) {
    // Create the <style> element if it doesn't exist
    styleSheet = document.createElement("style");
    styleSheet.id = "dynamic-styles";
    document.head.appendChild(styleSheet);
  }

  // Update the styles
  styleSheet.textContent = newStyles;
};

// Initialize the components
const dragInputElement = document.getElementById(
  "dragInputPerspective"
) as HTMLInputElement;

const dragInputXElement = document.getElementById(
  "dragInputX"
) as HTMLInputElement;
const dragInputYElement = document.getElementById(
  "dragInputY"
) as HTMLInputElement;
const dragInputZElement = document.getElementById(
  "dragInputZ"
) as HTMLInputElement;
const dragInputAngleElement = document.getElementById(
  "dragInputAngle"
) as HTMLInputElement;

const resetAllButton = document.getElementById("resetAll") as HTMLButtonElement;
const resetButton = document.getElementById("resetButton") as HTMLButtonElement;
const resetButtonX = document.getElementById(
  "resetButtonX"
) as HTMLButtonElement;
const resetButtonY = document.getElementById(
  "resetButtonY"
) as HTMLButtonElement;
const resetButtonZ = document.getElementById(
  "resetButtonZ"
) as HTMLButtonElement;
const resetButtonAngle = document.getElementById(
  "resetButtonAngle"
) as HTMLButtonElement;

if (!dragInputElement || !resetButton) {
  throw new Error("Required elements not found");
}

const dragInputPerspective = new DragInput(dragInputElement, {
  onChange: (e) => handlePerspectiveChange(e),
  maxValue: 3000,
  minValue: 0,
});

const dragInputX = new DragInput(dragInputXElement, {
  onChange: (e) => updateRotation(e),
});

const dragInputY = new DragInput(dragInputYElement, {
  onChange: (e) => updateRotation(undefined, e, undefined),
});

const dragInputZ = new DragInput(dragInputZElement, {
  onChange: (e) => updateRotation(undefined, undefined, e),
});

const dragInputAngle = new DragInput(dragInputAngleElement, {
  onChange: (e) => updateRotation(undefined, undefined, undefined, e),
  maxValue: 360,
  minValue: -360,
});

// Initialize rotation values
let rotationX = 0;
let rotationY = 0;
let rotationZ = 0;
let rotationAngle = 0;

/**
 * Updates the rotation of the element on the X, Y, and Z axes.
 * @param x - Rotation value in degrees for the X axis (optional)
 * @param y - Rotation value in degrees for the Y axis (optional)
 * @param z - Rotation value in degrees for the Z axis (optional)
 */
function updateRotation(
  x?: number,
  y?: number,
  z?: number,
  angle?: number
): void {
  // Update rotation values if provided
  rotationX = x !== undefined ? x : rotationX;
  rotationY = y !== undefined ? y : rotationY;
  rotationZ = z !== undefined ? z : rotationZ;
  rotationAngle = angle !== undefined ? angle : rotationAngle;

  // Update the transform style

  const normalized = normalizeVector(rotationX, rotationY, rotationZ);
  mainEl.style.transform = `rotate3d(${normalized.x}, ${normalized.y}, ${normalized.z}, ${rotationAngle}deg)`;
}

function normalizeVector(
  x: number,
  y: number,
  z: number
): { x: number; y: number; z: number } {
  const magnitude = Math.sqrt(x * x + y * y + z * z);
  return magnitude < 0.00001
    ? { x: 0, y: 0, z: 0 }
    : { x: x / magnitude, y: y / magnitude, z: z / magnitude };
}

// Reset button
resetButton.addEventListener("click", () => {
  dragInputPerspective.reset();
});

resetButtonX.addEventListener("click", () => {
  dragInputX.reset();
});

resetButtonY.addEventListener("click", () => {
  dragInputY.reset();
});

resetButtonZ.addEventListener("click", () => {
  dragInputZ.reset();
});

resetButtonAngle.addEventListener("click", () => {
  dragInputAngle.reset();
});

resetAllButton.addEventListener("click", () => {
  resetAll();
});

function handlePerspectiveChange(value: number) {
  mainContainerEl.style.perspective = value.toString() + "px";
}

function resetAll() {
  dragInputPerspective.reset();
  dragInputX.reset();
  dragInputY.reset();
  dragInputZ.reset();
  dragInputAngle.reset();
}
