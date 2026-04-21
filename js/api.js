const GameAPI = (() => {
    const STORAGE_KEY = "architecture-design-game-state";
    const SELECTION_KEY = "architecture-design-game-selection";
    const DATA_PATH = "../data/scenarios.json";

    async function fetchScenarios() {
        if (typeof window !== "undefined" && window.SCENARIO_DATA) {
            return window.SCENARIO_DATA;
        }

        const response = await fetch(DATA_PATH, { cache: "no-store" });

        if (!response.ok) {
            throw new Error("Unable to load scenario data.");
        }

        return response.json();
    }

    function saveState(state) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }

    function loadState() {
        const rawState = localStorage.getItem(STORAGE_KEY);

        if (!rawState) {
            return null;
        }

        try {
            return JSON.parse(rawState);
        } catch (error) {
            localStorage.removeItem(STORAGE_KEY);
            return null;
        }
    }

    function clearState() {
        localStorage.removeItem(STORAGE_KEY);
    }

    function saveScenarioSelection(scenarioIds) {
        localStorage.setItem(SELECTION_KEY, JSON.stringify(scenarioIds));
    }

    function loadScenarioSelection() {
        const rawSelection = localStorage.getItem(SELECTION_KEY);

        if (!rawSelection) {
            return null;
        }

        try {
            const parsedSelection = JSON.parse(rawSelection);
            return Array.isArray(parsedSelection) ? parsedSelection : null;
        } catch (error) {
            localStorage.removeItem(SELECTION_KEY);
            return null;
        }
    }

    function clearScenarioSelection() {
        localStorage.removeItem(SELECTION_KEY);
    }

    return {
        clearScenarioSelection,
        clearState,
        fetchScenarios,
        loadScenarioSelection,
        loadState,
        saveScenarioSelection,
        saveState,
    };
})();