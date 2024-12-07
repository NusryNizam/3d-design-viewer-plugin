penpot.ui.open("Plugin Template", `?theme=${penpot.theme}`, {
  width: 880,
  height: 600,
});

penpot.ui.onMessage<{ type: string; data: any }>((message) => {
  if (message.type === "create-text") {
    // Example
    penpot.createText("Hello!");
  }
});

penpot.on("themechange", (theme) => {
  penpot.ui.sendMessage({
    source: "penpot",
    type: "themechange",
    theme,
  });
});

penpot.ui.sendMessage({
  type: "selection",
  data: penpot.selection.filter((e) => e.type === "board"),
});

penpot.on("selectionchange", () => {
  console.log(
    penpot.generateMarkup(penpot.selection.filter((e) => e.type === "board"))
  );
  penpot.ui.sendMessage({
    type: "selection",
    htmlData: penpot.generateMarkup(
      penpot.selection.filter((e) => e.type === "board")
    ),
    cssData: penpot.generateStyle(
      penpot.selection.filter((e) => e.type === "board")
    ),
  });
});
