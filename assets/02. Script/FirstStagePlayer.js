
cc.Class({
    extends: cc.Component,

    properties: {
        // Jump Sound.
        jumpAudio: {
            type: cc.AudioClip,
            default: null,
        },

    },
    onLoad: function () {
        this.accLeft = false;
        this.accRight = false;
        this.moveSpeed = 0;

        // // 키보드 입력 이벤트
        //이벤트 키워드, 콜백 함수, this 키워드 자기 자신 가리키기.
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        this.doJumpAction();
    },
    onDestroy() {
        // 키보드 입력 이벤트 삭제
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    doJumpAction: function () {
        // 0.4 4초동안 Y 축으로 300 올라간다.
        const jumpUp = cc.moveBy(0.4, cc.v2(0, 300));
        // 0.4 4초동안 Y 축으로 300 내려간다.
        const jumpDown = cc.moveBy(0.4, cc.v2(0, -300));
        const callback = cc.callFunc(this.playJumpSound, this);
        // sequence 여러 개의 액션을 하나의 액션으로 묶는다.
        // 시퀀스를 무한히 반복한다.
        const rep = cc.repeatForever(cc.sequence(jumpUp, jumpDown, callback));

        this.node.runAction(rep);

    },

    playJumpSound: function () {        
        cc.audioEngine.playEffect(this.jumpAudio, false);
    },

    onKeyDown: function (event) {
        // 키보드 이벤트 처리.
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = true;
                break;
            case cc.macro.KEY.d:
                this.accRight = true;
                break;
        }
    },

    onKeyUp: function (event) {
        // 키보드 이벤트 처리.
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = false;
                break;
            case cc.macro.KEY.d:
                this.accRight = false;
                break;
        }
    },

    update(dt) {
        if (this.accLeft) {
            this.moveSpeed = -350;
        } else if (this.accRight) {
            this.moveSpeed = 350;
        }

        // 플레이어의 위치 업데이트
        this.node.x += this.moveSpeed * dt;
        if (this.node.x < -480) {
            this.node.x = -480;
        } else if (this.node.x > 480) {
            this.node.x = 480;
        }
    },
});
