import { Shape } from "@penpot/plugin-types";

penpot.ui.open("3D Design Viewer", `?theme=${penpot.theme}`, {
  width: 880,
  height: 600,
});

penpot.ui.onMessage<{ type: string; data: any }>(async (message) => {
  if (message.type === "add") {
    if (message.data) {
      const imageData = await penpot.uploadMediaData(
        "test",
        message.data,
        "image/png"
      );

      if (imageData) {
        const shape = penpot.createRectangle();
        shape.boardX = penpot.viewport.center.x;
        shape.boardY = penpot.viewport.center.y;
        shape.resize(imageData.width, imageData.height);
        shape.fills = [
          { fillOpacity: 1, fillImage: { ...imageData, keepApectRatio: true } },
        ];
      }
    }

    penpot.ui.sendMessage({
      type: "added",
    });
  }
});

penpot.on("themechange", (theme) => {
  penpot.ui.sendMessage({
    source: "penpot",
    type: "themechange",
    theme,
  });
});

penpot.on("selectionchange", () => {
  penpot.ui.sendMessage({
    type: "selection",
    htmlData: penpot.generateMarkup(getSelectedBoards()),
    cssData: penpot.generateStyle(getSelectedBoards()),
  });
});

penpot.ui.sendMessage({
  type: "selection",
  htmlData: penpot.generateMarkup(getSelectedBoards()),
  cssData: penpot.generateStyle(getSelectedBoards()),
});

function getSelectedBoards() {
  return penpot.selection.filter((shape) => shape.type === "board");
}
