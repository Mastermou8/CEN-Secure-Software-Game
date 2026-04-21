document.addEventListener("DOMContentLoaded", initScenarioSelectionPage);

async function initScenarioSelectionPage() {
	const root = document.getElementById("scenario-selection-app");

	if (!root) {
		return;
	}

	root.innerHTML = '<p class="status-message">Loading available scenarios...</p>';

	try {
		const gameData = await GameAPI.fetchScenarios();
		renderScenarioSelection(root, gameData.scenarios);
	} catch (error) {
		root.innerHTML = `
			<section class="empty-state">
				<h1 class="selection-heading">Scenario Selections:</h1>
				<p>Scenario data could not be loaded.</p>
				<div class="action-row">
					<a class="button-link" href="dashboard.html">Return to Dashboard</a>
				</div>
			</section>
		`;
	}
}

function renderScenarioSelection(root, scenarios) {
	let selectedScenarioId = scenarios[0] ? scenarios[0].id : null;

	const render = () => {
		const scenarioItems = scenarios
			.map(
				(scenario) => `
					<li>
						<button class="selection-card ${scenario.id === selectedScenarioId ? "is-selected" : ""}" type="button" data-scenario-id="${scenario.id}">
							<strong>${scenario.title}</strong>
							<p>${scenario.summary}</p>
							<p class="selection-meta">${scenario.parts.length} parts</p>
						</button>
					</li>
				`
			)
			.join("");

		root.innerHTML = `
			<h1 class="selection-heading">Scenario Selections:</h1>
			<p class="selection-description">Please select a Secure Architecture Design scenario to solve.</p>
			<section class="selection-layout">
				<div class="selection-panel">
					<h2>Assigned Scenarios</h2>
					<ul class="selection-list">${scenarioItems}</ul>
				</div>
				<div class="selection-actions">
					<a class="button-link" href="dashboard.html">Go Back</a>
					<button type="button" id="play-selected-button">Start Selected</button>
					<button type="button" id="play-all-button">Play All</button>
				</div>
			</section>
		`;

		root.querySelectorAll(".selection-card").forEach((button) => {
			button.addEventListener("click", () => {
				selectedScenarioId = button.dataset.scenarioId;
				render();
			});
		});

		root.querySelector("#play-selected-button").addEventListener("click", () => {
			GameAPI.saveScenarioSelection(selectedScenarioId ? [selectedScenarioId] : []);
			GameAPI.clearState();
			window.location.href = "game.html";
		});

		root.querySelector("#play-all-button").addEventListener("click", () => {
			GameAPI.clearScenarioSelection();
			GameAPI.clearState();
			window.location.href = "game.html";
		});
	};

	render();
}