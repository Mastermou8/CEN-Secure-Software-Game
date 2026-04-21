const ScoringEngine = (() => {
	function evaluateGame(gameData, answers) {
		const flattenedParts = ScenarioService.flattenScenarioParts(gameData);
		const ratingCounts = {
			acceptable: 0,
			insecure: 0,
			optimal: 0,
		};

		const details = flattenedParts.map((part) => {
			const selectedChoiceId = answers[part.key] || null;
			const selectedChoice = part.choices.find((choice) => choice.id === selectedChoiceId) || null;
			const points = selectedChoice ? selectedChoice.points : 0;
			const rating = selectedChoice ? selectedChoice.rating : "insecure";

			ratingCounts[rating] += 1;

			return {
				partId: part.partId,
				partTitle: part.partTitle,
				points,
				rating,
				scenarioId: part.scenarioId,
				scenarioTitle: part.scenarioTitle,
				selectedChoice,
			};
		});

		const totalScore = details.reduce((sum, detail) => sum + detail.points, 0);
		const maxScore = flattenedParts.length;
		const percentage = maxScore ? Math.round((totalScore / maxScore) * 100) : 0;

		const scenarioBreakdown = gameData.scenarios.map((scenario) => {
			const scenarioDetails = details.filter((detail) => detail.scenarioId === scenario.id);
			const scenarioScore = scenarioDetails.reduce((sum, detail) => sum + detail.points, 0);

			return {
				id: scenario.id,
				title: scenario.title,
				score: scenarioScore,
				total: scenario.parts.length,
				details: scenarioDetails,
			};
		});

		return {
			maxScore,
			percentage,
			performanceLabel: getPerformanceLabel(percentage),
			ratingCounts,
			scenarioBreakdown,
			totalScore,
		};
	}

	function getPerformanceLabel(percentage) {
		if (percentage >= 85) {
			return "Secure Architect";
		}

		if (percentage >= 60) {
			return "Developing Defender";
		}

		return "Needs Hardening";
	}

	return {
		evaluateGame,
	};
})();
