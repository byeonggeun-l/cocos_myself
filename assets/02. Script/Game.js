
cc.Class({
    extends: cc.Component,

    properties: {
        firstStageScriptPrefab: cc.Prefab,
        secondStageScriptPrefab: cc.Prefab,

        scoreDisplay: cc.Label,

        scoreAudio: {
            type: cc.AudioClip,
            default: null,
        },

        pageView: cc.PageView,
    },

    onLoad: function () {
        // 득점 초기화.
        this.score = 0;

        // 현재 스테이지.
        this.thisStage = "FirstStage";

        this.firstScene = null;
        this.secondScene = null;

        this.firstScene = cc.instantiate(this.firstStageScriptPrefab);
        this.node.addChild(this.firstScene);
        this.firstScene.getComponent('FirstStageScript').game = this;

        this.pageView._enabled = false;

    },

    getRandom: function (min, max) {
        return Math.round(Math.random() * (max - min) + min);
    },

    onPicked: function () {
        this.score += 1;
        if (this.thisStage === "FirstStage")
            this.scoreDisplay.string = "Score : " + this.score + " / 5";
        else
            this.scoreDisplay.string = "Score : " + this.score + " / 9999999";
        
        cc.audioEngine.playEffect(this.scoreAudio, false);
        if (this.thisStage === 'FirstStage' && this.score == 5) {
            this.thisStage = "SecondPage";
            this.score = 0;
            
            // Renew.
            this.scoreDisplay.string = "Score : " + this.score + " / 9999999";

            this.firstScene.destroy();
            this.firstScene = null;            

            this.pageView.enabled = true;
            this.pageView.setCurrentPageIndex(1);            
            
            this.secondScene = cc.instantiate(this.secondStageScriptPrefab);
            this.node.addChild(this.secondScene);
            this.secondScene.getComponent('SecondStageScript').game = this;
        }        
    },
});
