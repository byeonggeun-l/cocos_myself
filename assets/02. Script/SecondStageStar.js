
cc.Class({
    extends: cc.Component,

    properties: {
        hpProgressBarPrefab: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        // 타이머 초기화.
        this.timer = 0;
        // 별 지속시간.ddddddddddddd
        this.starDuration = 10.0;

        this.HPProgressBar = null;


        // Add HP Progress Bar.
        this.HPProgressBar = cc.instantiate(this.hpProgressBarPrefab);
        this.node.addChild(this.HPProgressBar);
        this.HPProgressBar.setPosition(cc.v2(this.node.x, this.node.y + 40));


    },
    
    onAttacked: function () {
    },

    update(dt) {
        // this.starDuration 후 삭제.
        if (this.timer > this.starDuration) {
            this.node.destroy();
            return;
        }
        this.timer += dt;
    },
});
