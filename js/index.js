import "./tabs.js";

const container = document.getElementById("content");

async function loadPage() {
  const fileName = window.location.hash.replace("#", "");
  const content = await (await fetch(`pages/${fileName}.html`)).text();

  container.innerHTML = content;
  document.dispatchEvent(new CustomEvent("contentupdated"));
}

window.addEventListener("hashchange", loadPage);

loadPage();
