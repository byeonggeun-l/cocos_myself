
cc.Class({
    extends: cc.Component,

    properties: {
        firstStagePlayerPrefab: cc.Prefab,
        firstStageStarPrefab: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        // 플레이어, 별 객체.
        this.Player = null;
        this.Star = null;

        // Add First Stage Player.
        this.Player = cc.instantiate(this.firstStagePlayerPrefab);
        this.node.addChild(this.Player);
        this.Player.setPosition(cc.v2(-450, -150));

        // Add First Stage Star Schedule
        // 별의 지속시간 설정.
        this.starDuration = 3.0;
        // 스테이지에서 별은 계속 생성이 된다.
        cc.director.getScheduler().schedule(this.spawnNewStar, this, this.starDuration);

    },    

    spawnNewStar: function () {
        // 프리팹을 사용하여 새 노드 생성.
        // instantiate = 객체 복사 함수.(프리팹을 넣어도 된다.)
        this.Star = cc.instantiate(this.firstStageStarPrefab);
        this.node.addChild(this.Star);
        this.Star.setPosition(this.getNewStarPosition());
        // 스타 프리팹을 만들고, 
        // 겟 컴포넌트를 통해 Star 를 구하고,
        // 해당 프리팹의 game 변수 안에 나 자신(Game.js)의 참조를 넣는다. 
    },    

    getNewStarPosition: function () {
        // 지면보다는 높고, Canvas의 높이보단 아래로.
        var maxY = this.game.node.height / 2;        
        var randY = this.game.getRandom(0, maxY) - 110;
        
        // 현재 캔버스 넓이는 960이다.
        // 960에 딱 맞게 Star 인스턴스가 끝 쪽에 생성이 되면 
        // 짤려 보일 수도 있다. 그래서 -60 을 한다. 
        var maxX = this.game.node.width - 60;
        // 또한 캐릭터는 -450 ~ +450 위치에 있으므로,
        // 최솟값 0, 최댓값 900의 결과값에서 -450 을 빼줘야,
        // -450 ~ +450 안에서 랜덤값을 얻을 수 있다.
        var randX = this.game.getRandom(0, maxX) - 450;

        // 랜덤 좌표 반환.
        return cc.v2(randX, randY);
    },

    collision: function () {
        if (this.Star.getBoundingBox().intersects(this.Player.getBoundingBox())) {
            // 메인게임에 플레이어가 별을 획득했다는 것을 알려주자!
            this.game.onPicked();

            // 별을 먹었으면 해당 별을 없애자.
            this.Star.destroy();
            this.Star = null;
        }
    },

    update(dt) {
        // 별이 생성되는 시간으로 인해 아직 별이 생성이 되지 않은 상황에서
        // 충돌 감지를 방지한다.
        if (this.Star != null)
            this.collision();
    },
});
