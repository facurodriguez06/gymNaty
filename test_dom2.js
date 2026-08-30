const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const virtualConsole = new jsdom.VirtualConsole();
virtualConsole.on("error", (e) => {
  console.error("DOM ERROR:", e);
});
virtualConsole.on("jsdomError", (e) => {
  console.error("JSDOM ERROR:", e);
});
virtualConsole.on("log", (msg) => {
  console.log("LOG:", msg);
});

JSDOM.fromURL("http://localhost:8080/index.html", {
  runScripts: "dangerously",
  resources: "usable",
  virtualConsole
}).then(dom => {
  setTimeout(() => {
    console.log("BODY CLASS:", dom.window.document.body.className);
    console.log("APP CONTENT CLASS:", dom.window.document.getElementById("app-content").className);
    console.log("DONE");
    process.exit(0);
  }, 2000);
});
