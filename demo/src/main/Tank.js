var Tank =  BaseObject.extend({
	// 上次坐标
	_lastTile:null,
	// 现在的坐标
	_thisTile:null,
	// 血量
	_blood:null,
	// 移动速度
	_speed:null,
	// 方向
	_direction:null,
	ctor:function(params) {
		this._super(params);
	},
	// 方法用于确定判断坦克移动的方向，主要判断是否为斜向移动
	locate:function() {

	},
	// 方法则是控制坦克坐标移动
	move:function(pos) {
	
	},
	changeDirection:function(pos) {
		var rotate = Utils.countRotateAngle(this._position, pos)
		this.setRotation(rotate)
		this._direction = Utils.getDirection(this._position, pos)
	},
	// 方法用来构建子弹对象并加入到子弹集合中
	fire:function() {
	},
	// 用来判断坦克是否撞墙（
	impactOnWall:function() {

	},
	// 判断坦克是否重叠
	impactOnTank:function(){

	},
	// 检测是否中弹
	superFire:function() {

	},
	// 吃东西
	eat:function() {

	}
})