/**
 * 热更新
 */

var failCount = 0;

var maxFailCount = 0;   //最大错误重试次数

/**

 * 自动更新js和资源

 */

var AssetsManagerLoaderScene = cc.Scene.extend({

    _am: null,

    _progress: null,

    _percent: 0,

    run: function () {

        if (!cc.sys.isNative) {
            this.loadGame();

            return;

        }

        var layer = new cc.Layer();

        this.addChild(layer);

        this._progress = new cc.LabelTTF.create("update____0%", "Arial", 12);

        this._progress.x = cc.winSize.width / 2;

        this._progress.y = cc.winSize.height / 2 + 50;

        layer.addChild(this._progress);

        var storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "./");

        cc.log("storagePath is " + storagePath);

        this._am = new jsb.AssetsManager("res/Manifests/project.manifest", storagePath);

        this._am.retain();

        if (!this._am.getLocalManifest().isLoaded()) {

            cc.log("Fail to update assets, step skipped.");
            this.loadGame();

        } else {

            var that = this;

            //cc.EventListenerAssetsManager

            var listener = new jsb.EventListenerAssetsManager(this._am, function (event) {

                switch (event.getEventCode()) {

                    case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:

                        cc.log("assetsManagerScene : ERROR_NO_LOCAL_MANIFEST  " + event.getMessage());
                        that.loadGame();

                        break;
                    case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
                        cc.log("assetsManagerScene : ERROR_DOWNLOAD_MANIFEST  " + event.getMessage());

                        that.loadGame();

                        break;
                    case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:

                        cc.log("assetsManagerScene : ERROR_PARSE_MANIFEST  " + event.getMessage());

                        that.loadGame();

                        break;
                    case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                        cc.log("assetsManagerScene : NEW_VERSION_FOUND " + event.getMessage());

                        //我们需要更新。。。
                        break;
                    case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:

                        cc.log("assetsManagerScene : ALREADY_UP_TO_DATE " + event.getMessage());
                        //我们不需要更新。。。
                        that.loadGame();

                        break;
                    case jsb.EventAssetsManager.UPDATE_PROGRESSION://更新进度条

                        cc.log("assetsManagerScene : UPDATE_PROGRESSION " + event.getPercent() + "," + event.getMessage());
                        that._percent = event.getPercent();
                        var msg = event.getMessage();
                        if (msg) {
                            cc.log(msg);
                        }
                        that.updateProgress(event.getPercent());

                        break;
                    case jsb.EventAssetsManager.ASSET_UPDATED://资源更新完毕，可能还需要解压缩
                        cc.log("assetsManagerScene : ASSET_UPDATED " + event.getAssetId() + "," + event.getMessage());
                        break;
                    case jsb.EventAssetsManager.ERROR_UPDATING://更新发生错误

                        cc.log("assetsManagerScene : ERROR_UPDATING " + event.getAssetId() + ", " + event.getMessage());

                        that.loadGame();

                        break;
                    case jsb.EventAssetsManager.UPDATE_FINISHED://资源更新完毕

                        cc.log("assetsManagerScene : UPDATE_FINISHED " + event.getMessage());

                        that.loadGame();

                        break;
                    case jsb.EventAssetsManager.UPDATE_FAILED://更新失败

                        cc.log("assetsManagerScene : UPDATE_FAILED " + event.getMessage());

                        failCount++;

                        if (failCount < maxFailCount) {

                            that._am.downloadFailedAssets();
                        }

                        else {

                            cc.log("Reach maximum fail count, exit update process");

                            failCount = 0;

                            that.loadGame();

                        }

                        break;
                    case jsb.EventAssetsManager.ERROR_DECOMPRESS://解压错误

                        cc.log("assetsManagerScene : ERROR_DECOMPRESS " + event.getMessage());

                        that.loadGame();

                        break;

                    default:
                        cc.log("assetsManagerScene : unknown Event" + event.getMessage());
                        that.loadGame();
                        break;

                }

            });

            cc.eventManager.addListener(listener, 1);

            this._am.update();

            cc.director.runScene(this);

        }
    },
    loadGame:function(){
        cc.log("aaaaaaaaaaaaaaaaaa")
        cc.loader.loadJs(["src/updateList.js"], function(){
            cc.log("bbbbbbbbbbbbbbbbbbb")

            cc.loader.loadJs(jsUpdateList, function(){
                cc.log("ccccccccccccccccc")

                cc.director.runScene(new HelloWorldScene());

            });

        });

    },

    updateProgress: function (percent) {
        this._progress.string = "update__" + percent + "__%";
    },

    onExit: function () {

        cc.log("AssetsManager::onExit");

        this._am.release();

        this._super();

    }

});