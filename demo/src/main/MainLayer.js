var MainLayer = cc.Layer.extend({
	_player:null,
	_map:null,
	_curTile:null,
	ctor:function() {
		this._super();
		this.loadRes();
		this.loadTiledMap();
		this.loadPlayer();
		this.fnForInitPos();
		this.fnForListener();
		return true
	},
	loadRes:function() {
		cc.spriteFrameCache.addSpriteFrames(res.tank_plist);
	},
	// 添加精灵[tiled map]
	loadTiledMap:function() {
		var map = new cc.TMXTiledMap(res.map001_tmx);

		this.addChild(map);
		this._map = map
	},
	loadPlayer:function() {
		var tank = new Tank("#tank0_1.png");

		this.addChild(tank);
		this._player = tank;
	},
	fnForInitPos:function() {
		var players   = this._map.getObjectGroup("objectplayer");
        var playerObj = players.getObject("player1");
        var playerPos = cc.p(playerObj.x + 48, playerObj.y + 48);

        this._curTile = this._getTilePos(playerPos);
        this._updatePlayerPos();

	},
	fnForListener:function() {
		var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function onKeyPressed(keyCode, event) {
                self._onKeyPressed(keyCode, event);
            }
        }, self);       
	},
	_onKeyPressed: function _onKeyPressed(keyCode, event) {
        // if (!this._isMapLoaded || this._succeedLayer.active) return;

        var newTile = cc.p(this._curTile.x, this._curTile.y);
        var mapMoveDir = MoveDirection.NONE;
        switch (keyCode) {
            case cc.KEY.up:
                newTile.y -= 1;
                mapMoveDir = MoveDirection.DOWN;
                break;
            case cc.KEY.down:
                newTile.y += 1;
                mapMoveDir = MoveDirection.UP;
                break;
            case cc.KEY.left:
                newTile.x -= 1;
                mapMoveDir = MoveDirection.RIGHT;
                break;
            case cc.KEY.right:
                newTile.x += 1;
                mapMoveDir = MoveDirection.LEFT;
                break;
            default:
                return;
        }
        this._tryMoveToNewTile(newTile, mapMoveDir);
    },

    _tryMoveToNewTile: function _tryMoveToNewTile(newTile, mapMoveDir) {

        var pos = this._map.getLayer("layer").getPositionAt(newTile);
        this._player.changeDirection(pos);
        
        var mapSize = this._map.getMapSize();
        if (newTile.x < 0 || newTile.x >= mapSize.width) return;
        if (newTile.y < 0 || newTile.y >= mapSize.height) return;

        var arr = [
            newTile,
            cc.p(newTile.x, newTile.y + 1),
            cc.p(newTile.x - 1, newTile.y),
            cc.p(newTile.x - 1, newTile.y + 1), 
        ]

        for (var i = 0; i < arr.length; i++) {
           if (arr[i].y >= mapSize.height || this._map.getLayer("layer").getTileGIDAt(arr[i])) {
                cc.log('This way is blocked!');
                return false;
            }
        }
        // update the player position
        this._curTile = newTile;
        this._updatePlayerPos();

    },
    _updatePlayerPos: function _updatePlayerPos() {
        var pos = this._map.getLayer("layer").getPositionAt(this._curTile);
        this._player.setPosition(pos);
        this._player.move(pos);
    },
    _getTilePos: function _getTilePos(posInPixel) {
        var mapSize = this.getContentSize();
        var tileSize = this._map.getTileSize();

        var x = Math.floor(posInPixel.x / tileSize.width);
        var y = Math.floor((mapSize.height - posInPixel.y) / tileSize.height);

        return cc.p(x, y);
    }
})