var LNode = cc.Node.extend({
	ctor:function() {
		this._super();
		this.init();
		this.bindTouch(cc.EventListener.TOUCH_ONE_BY_ONE)
	},
        // 绑定点击
    bindTouch:function (event) {
        var touchListener = cc.EventListener.create({
            event:event,
            swallowTouches:false,
            onTouchBegan:this.onTouchBegan,
            onTouchMoved:this.onTouchMoved,
            onTouchEnded:this.onTouchEnded
        });

        cc.eventManager.addListener(touchListener, this);    
    },
    onTouchBegan:function(touch, event){
    	cc.log(touch, event)
        return true
    },
    onTouchMoved:function(touch, event) {

    },
    onTouchEnded:function(touch, event) {
   	}
   })