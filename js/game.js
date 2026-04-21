//game logic
/*
class LiveScenario {
    constructor(playID) {
        this.playerID = playID;
        this.scenID = "";
        this.selected = [];
        this.score = 0.0;
    }

    setScenario(ID) {
        this.scenID = ID;
    }

    calculateScore(selections) {
        var pointSum = 0.0;
        // temp1: The number of components that the user selected.
        // Will need to properly implement.
        for (var i = 0; i < temp1; i++) {
            this.selected.push(selections[i]);
            // getSelectPoints(ID, selection): Returns the points associated with the selection based on the specified scenario.
            // Will likely be a function implemented in "api.js".
            pointSum += getPoints(this.scenID, selections[i]);
        }
        // getPoints(scenarioID): Returns the maximum amount of point that can be gotten for the specified scenario.
        // Will likely be a function implemented in "api.js".
        this.score = (pointSum/getMaxPoints(this.scenID)*100.0);
    }

    addResultsToUser() {
        // addCompletedScenario(...): Adds an entry to a table that will store completed scenarios.
        // Will likely be a function implemented in "api.js".
        addCompletedScenario(this.playerID, this.scenID, this.selected, this.score);
    }
}
// The following should probably go into the HTML file.
// var test = new LiveScenario();
*/