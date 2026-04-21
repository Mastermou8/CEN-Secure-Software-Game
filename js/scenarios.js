const ScenarioService = (() => {
	async function loadGameData() {
		const gameData = await GameAPI.fetchScenarios();
		const selectedScenarioIds = GameAPI.loadScenarioSelection();

		if (!selectedScenarioIds || selectedScenarioIds.length === 0) {
			return gameData;
		}

		const selectedScenarios = gameData.scenarios.filter((scenario) => selectedScenarioIds.includes(scenario.id));

		return {
			...gameData,
			scenarios: selectedScenarios.length > 0 ? selectedScenarios : gameData.scenarios,
		};
	}

	function flattenScenarioParts(gameData) {
		return gameData.scenarios.flatMap((scenario) =>
			scenario.parts.map((part) => ({
				key: `${scenario.id}__${part.id}`,
				scenarioId: scenario.id,
				scenarioTitle: scenario.title,
				partId: part.id,
				partTitle: part.title,
				choices: part.choices,
			}))
		);
	}

	return {
		flattenScenarioParts,
		loadGameData,
	};
})();

