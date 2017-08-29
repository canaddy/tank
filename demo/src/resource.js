var res = {
    HelloWorld_png : "res/HelloWorld.png",
    CloseNormal_png : "res/CloseNormal.png",
    CloseSelected_png : "res/CloseSelected.png",
    all_material_png:"res/all_material.png",
    map001_tmx:"res/map001.tmx",
    tank_plist:"res/tank.plist",
    // map01_png:"res/map/map01.png",
    // test_png:"res/fixed-ortho-test2.png",
    // test_tmx:"res/orthogonal-test2.tmx"
};

var g_resources = [
    // res.map001_tmx,
    // res.map01_png,
    // res.all_material_png
];
for (var i in res) {
    g_resources.push(res[i]);
}