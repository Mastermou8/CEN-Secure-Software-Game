document.addEventListener("DOMContentLoaded", initAdminPage);

function initAdminPage() {
  const root = document.getElementById("admin-app");

  if (!root) {
    return;
  }

  const state = GameAPI.loadState();

  if (!state || !state.result) {
    root.innerHTML = `
      <section class="empty-state">
        <h1 class="admin-heading">Administrator Feedback:</h1>
        <p>Complete the game first so administrator feedback can be generated.</p>
        <div class="action-row">
          <a class="button-link" href="game.html">Start Game</a>
          <a class="button-link" href="dashboard.html">Return to Dashboard</a>
        </div>
      </section>
    `;
    return;
  }

  const details = state.result.scenarioBreakdown.flatMap((scenario) =>
    scenario.details.map((detail, index) => ({
      index: index + 1,
      scenarioTitle: scenario.title,
      ...detail,
    }))
  );

  renderAdmin(root, details, 0);
}

function renderAdmin(root, details, activeIndex) {
  const activeDetail = details[activeIndex];
  const tabsMarkup = details
    .map(
      (detail, index) => `
        <button class="admin-tab ${index === activeIndex ? "is-active" : ""}" type="button" data-index="${index}">
          Part ${detail.index}:<br>${detail.partTitle}
        </button>
      `
    )
    .join("");

  root.innerHTML = `
    <h1 class="admin-heading">Administrator Feedback:</h1>
    <div class="admin-tabs">${tabsMarkup}</div>
    <section class="admin-feedback-panel">
      <p class="admin-meta">${activeDetail.scenarioTitle}</p>
      <h2>${activeDetail.selectedChoice ? activeDetail.selectedChoice.label : "No Selection"}</h2>
      <p>${activeDetail.selectedChoice ? activeDetail.selectedChoice.feedback : "This section did not receive an answer."}</p>
      <span class="badge badge-${activeDetail.rating}">${activeDetail.rating} - ${activeDetail.points} pts</span>
    </section>
    <div class="action-row">
      <a class="button-link secondary-link" href="result.html">Return to Results Page</a>
    </div>
  `;

  root.querySelectorAll(".admin-tab").forEach((button) => {
    button.addEventListener("click", () => {
      renderAdmin(root, details, Number(button.dataset.index));
    });
  });
}