//game logic
// api: The variable name for the api object. Will be made in the HTML file.
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
        for (var i = 0; i < selections.length; i++) {
            this.selected.push(selections[i]);
            // getSelectPoints(ID, selection): Returns the points associated with the selection based on the specified scenario.
            pointSum += api.getPoints(this.scenID, selections[i]);
        }
        // getMaxPoints(scenarioID): Returns the maximum amount of point that can be gotten for the specified scenario.
        this.score = (pointSum/api.getMaxPoints(this.scenID)*100.0);
    }

    addResultsToUser() {
        // addCompletedScenario(...): Adds an entry to a table that will store completed scenarios.
        api.addCompletedScenario(this.playerID, this.scenID, this.selected, this.score);
    }
}
// The following should probably go into the HTML file.
// var test = new LiveScenario();