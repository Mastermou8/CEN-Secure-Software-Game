document.addEventListener("DOMContentLoaded", initResultPage);

function initResultPage() {
	const root = document.getElementById("result-app");

	if (!root) {
		return;
	}

	const state = GameAPI.loadState();

	if (!state || !state.result) {
		root.innerHTML = `
			<section class="panel empty-state">
				<h1>No score available</h1>
				<p>Complete the game first to see your score breakdown.</p>
				<div class="action-row">
					<a class="button-link" href="game.html">Start the game</a>
					<a class="button-link secondary-link" href="dashboard.html">Return to dashboard</a>
				</div>
			</section>
		`;
		return;
	}

	renderResults(root, state.result);
}

function renderResults(root, result) {
	const flattenedDetails = result.scenarioBreakdown.flatMap((scenario) =>
		scenario.details.map((detail, index) => ({
			index: index + 1,
			ratingLabel: detail.rating.charAt(0).toUpperCase() + detail.rating.slice(1),
			scenarioTitle: scenario.title,
			...detail,
		}))
	);

	const sectionMarkup = flattenedDetails
		.map(
			(detail) => `
				<li class="section-row">
					<span>Part ${detail.index}: ${detail.partTitle}</span>
					<span>${detail.ratingLabel}</span>
				</li>
			`
		)
		.join("");

	const scenarioNames = result.scenarioBreakdown.map((scenario) => scenario.title).join(" / ");

	root.innerHTML = `
		<section class="results-topline">
			<div class="score-banner">Your Score Is: ${result.percentage}%</div>
			<div class="scenario-title-line">Scenario Title: <span>${scenarioNames}</span></div>
		</section>
		<section class="results-layout">
			<div class="results-card">
				<h1>Sections</h1>
				<ul class="section-status-list">${sectionMarkup}</ul>
			</div>
			<div class="results-summary">
				<p class="results-label">${result.performanceLabel}</p>
				<p class="big-score">${result.totalScore} / ${result.maxScore}</p>
				<div class="score-key">
					<span class="badge badge-optimal">Optimal: ${result.ratingCounts.optimal}</span>
					<span class="badge badge-acceptable">Acceptable: ${result.ratingCounts.acceptable}</span>
					<span class="badge badge-insecure">Insecure: ${result.ratingCounts.insecure}</span>
				</div>
				<div class="action-row result-actions">
					<a class="button-link" href="game.html">Try Again</a>
					<a class="button-link" href="admin.html">View Admin Feedback</a>
					<a class="button-link" href="dashboard.html">Go To Main Menu</a>
				</div>
			</div>
		</section>
	`;
}

