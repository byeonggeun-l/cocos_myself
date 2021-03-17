
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        // 타이머 초기화.
        this.timer = 0;
        // 별 지속시간.
        this.starDuration = 3.0;
    },

    getPlayerDistance: function () {
        // // 플레이어 노드 위치 구하기.
        // const playerPos = this.game.player.getPosition();
        // // 플레이어 위치를 기준으로 두 점 사이의 거리를 계산한다.
        // const dist = this.node.position.sub(playerPos).mag();
        // return dist;
    },

    onPicked: function () {
        
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
