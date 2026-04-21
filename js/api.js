const GameAPI = (() => {
    const STORAGE_KEY = "architecture-design-game-state";
    const SELECTION_KEY = "architecture-design-game-selection";
    const DATA_PATH = "../data/scenarios.json";

    function getAvailableStorages() {
        const storages = [];

        [window.localStorage, window.sessionStorage].forEach((storage) => {
            try {
                const probeKey = "architecture-design-game-probe";
                storage.setItem(probeKey, "1");
                storage.removeItem(probeKey);
                storages.push(storage);
            } catch (error) {
                // Ignore unavailable browser storage providers.
            }
        });

        return storages;
    }

    function writeToStorages(key, value) {
        const serializedValue = JSON.stringify(value);

        getAvailableStorages().forEach((storage) => {
            storage.setItem(key, serializedValue);
        });
    }

    function readFromStorages(key) {
        for (const storage of getAvailableStorages()) {
            const rawValue = storage.getItem(key);

            if (rawValue) {
                return rawValue;
            }
        }

        return null;
    }

    function removeFromStorages(key) {
        getAvailableStorages().forEach((storage) => {
            storage.removeItem(key);
        });
    }

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
        writeToStorages(STORAGE_KEY, state);
    }

    function loadState() {
        const rawState = readFromStorages(STORAGE_KEY);

        if (!rawState) {
            return null;
        }

        try {
            return JSON.parse(rawState);
        } catch (error) {
            removeFromStorages(STORAGE_KEY);
            return null;
        }
    }

    function clearState() {
        removeFromStorages(STORAGE_KEY);
    }

    function saveScenarioSelection(scenarioIds) {
        writeToStorages(SELECTION_KEY, scenarioIds);
    }

    function loadScenarioSelection() {
        const rawSelection = readFromStorages(SELECTION_KEY);

        if (!rawSelection) {
            return null;
        }

        try {
            const parsedSelection = JSON.parse(rawSelection);
            return Array.isArray(parsedSelection) ? parsedSelection : null;
        } catch (error) {
            removeFromStorages(SELECTION_KEY);
            return null;
        }
    }

    function clearScenarioSelection() {
        removeFromStorages(SELECTION_KEY);
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