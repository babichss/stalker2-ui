let containers = [];

function clearSiblings(activeItem) {
  let next = activeItem.nextElementSibling;
  let prev = activeItem.previousElementSibling;

  // Process both directions simultaneously
  while (next || prev) {
    next?.classList.remove("active");
    prev?.classList.remove("active");

    next = next?.nextElementSibling;
    prev = prev?.previousElementSibling;
  }
}

function onClick(event) {
  const activeItem = event.target.closest(".active-item");

  if (!activeItem) return;

  // Clear siblings and set the clicked item as active
  clearSiblings(activeItem);
  activeItem.classList.add("active");
}

function updateActiveTabs() {
  Array.from(document.querySelectorAll(".tab-trigger:checked"))
    .map((trigger) => trigger.id)
    .forEach((id) =>
      document
        .querySelector(`[for="${id}"]`)
        ?.closest(".active-item")
        ?.classList.add("active")
    );
}

function init() {
  // Remove previous event listeners
  containers.forEach((container) =>
    container.removeEventListener("click", onClick)
  );

  // Update containers
  containers = Array.from(document.querySelectorAll(".active-list"));

  // Attach event listeners to new containers
  containers.forEach((container) =>
    container.addEventListener("click", onClick)
  );

  // Update active tabs
  updateActiveTabs();
}

// Reinitialize on content update
document.addEventListener("contentupdated", init);
