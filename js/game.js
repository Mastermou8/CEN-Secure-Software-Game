document.addEventListener("DOMContentLoaded", initGamePage);

async function initGamePage() {
    const root = document.getElementById("game-app");

    if (!root) {
        return;
    }

    root.innerHTML = '<p class="status-message">Loading scenarios...</p>';

    try {
        const gameData = await ScenarioService.loadGameData();
        renderGame(root, gameData);
    } catch (error) {
        root.innerHTML = `
            <section class="panel error-panel">
                <h1>Game unavailable</h1>
                <p>Scenario data could not be loaded. Check the JSON file path and try again.</p>
                <a class="button-link" href="dashboard.html">Return to dashboard</a>
            </section>
        `;
    }
}

function renderGame(root, gameData) {
    const formMarkup = gameData.scenarios
        .map((scenario, scenarioIndex) => {
            const partsMarkup = scenario.parts
                .map((part, partIndex) => {
                    const groupName = `${scenario.id}__${part.id}`;
                    const choiceMarkup = part.choices
                        .map(
                            (choice) => `
                                <label class="choice-card choice-${choice.rating}">
                                    <input type="radio" name="${groupName}" value="${choice.id}" required>
                                    <span class="choice-copy">
                                        <strong>${choice.label}</strong>
                                        <small>${choice.feedback}</small>
                                    </span>
                                </label>
                            `
                        )
                        .join("");

                    return `
                        <article class="part-card">
                            <p class="card-label">Part ${partIndex + 1}</p>
                            <h3>${part.title}</h3>
                            <div class="choice-list">
                                ${choiceMarkup}
                            </div>
                        </article>
                    `;
                })
                .join("");

            const requirementMarkup = scenario.requirements
                .map((requirement) => `<li>${requirement}</li>`)
                .join("");

            return `
                <section class="scenario-card">
                    <div class="scenario-heading">
                        <p class="card-label">Scenario ${scenarioIndex + 1}</p>
                        <h2>${scenario.title}</h2>
                        <p>${scenario.summary}</p>
                    </div>
                    <div class="requirements-block">
                        <h3>Requirements</h3>
                        <ul>${requirementMarkup}</ul>
                    </div>
                    <div class="parts-grid">
                        ${partsMarkup}
                    </div>
                </section>
            `;
        })
        .join("");

    root.innerHTML = `
        <section class="intro-copy">
            <h1>Please select the best possible components to implement into the design for this scenario set.</h1>
            <p class="intro-description">${gameData.meta.description}</p>
        </section>
        <form id="game-form" class="game-form">
            ${formMarkup}
            <div class="submit-panel">
                <p>Choose one option for every part, then submit to see your secure architecture score.</p>
                <div class="action-row">
                    <a class="button-link secondary-link" href="dashboard.html">Back to dashboard</a>
                    <button type="submit">Score My Architecture</button>
                </div>
            </div>
        </form>
    `;

    const form = document.getElementById("game-form");
    form.addEventListener("submit", (event) => handleSubmit(event, gameData));
}

function handleSubmit(event, gameData) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const answers = {};

    ScenarioService.flattenScenarioParts(gameData).forEach((part) => {
        answers[part.key] = formData.get(part.key);
    });

    const result = ScoringEngine.evaluateGame(gameData, answers);

    GameAPI.saveState({
        answers,
        completedAt: new Date().toISOString(),
        result,
    });

    window.location.href = "result.html";
}