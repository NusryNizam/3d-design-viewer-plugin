penpot.ui.open("Plugin Template", `?theme=${penpot.theme}`, {
  width: 500,
  height: 500,
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
