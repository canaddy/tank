var MainScene = cc.Scene.extend({
	onEnter:function() {
		this._super();
		this.loadLayer();
	},
	loadLayer:function() {
		var layer = new MainLayer();

		this.addChild(layer);
	}
})