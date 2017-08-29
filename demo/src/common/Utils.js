var Utils =
{
// 根据坐标计算角度
countRotateAngle:function(pointA, pointB) {
    
    // var aPos    = pointA
    // var bPos    = pointB 

    // var k       = (bPos.y - aPos.y) / (bPos.x - aPos.x)
    // var angle    = 180/Math.PI * Math.atan(k)
    
    // if(aPos.y > bPos.y && aPos.x > bPos.x){
    // }else if(aPos.y > bPos.y && aPos.x < bPos.x){
    //     angle = angle + 180
    // }else if(aPos.y < bPos.y && aPos.x < bPos.x){
    //         angle = angle + 180
    // }else if(aPos.y < bPos.y && aPos.x > bPos.x){
    //         angle = angle + 360
    // }
    
    var o = pointB.x - pointA.x
    var a = pointB.y - pointA.y
    var angle = Math.atan(o / a) * 180 / Math.PI
    if (a < 0) {
        if (o < 0)
            angle = 180 + Math.abs(angle);
        else
            angle = 180 - Math.abs(angle);
    }

    return angle
},

// 获取方向
getDirection: function(srcP, dstP){
    var result = null
    if(srcP.x > dstP.x){
        result = MoveDirection.LEFT
    }else if(srcP.x < dstP.x){
        result = MoveDirection.RIGHT
    }else if(srcP.y > dstP.y){
        result = MoveDirection.DOWN
    }else if(srcP.y < dstP.y){
        result = MoveDirection.UP
    }else{
        result = MoveDirection.NONE
    }
    return result
},
//字符串格式化
StringFormat: function () {
    if (arguments.length == 0)
    return null;
    var str = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
    var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
    str = str.replace(re, arguments[i]);
    }
    return str;
},

// val为经json直接序列化后的C#的DateTime类型的数据
FormatTime: function (val, format) {
    if (!val) {
    return "";
    }

    var re = /-?\d+/;
    var m = re.exec(val);
    var d = new Date(parseInt(m[0]));
    // 按【2012-02-13 09:09:09】的格式返回日期

    var defaultFormat = "yyyy-MM-dd hh:mm:ss";
    if (format && typeof format == "string") {
        defaultFormat = format;
    }
    return d.Format(defaultFormat);
},

//判断是否是有效的日期格式字符串
    IsDataString: function (strData) {
    /// <summary>
    /// 编辑/新增
    /// </summary>
    /// <param name="strData">需要校验的字符串</param>
    /// <returns></returns>

    //日期格式正则
    var dataFilter = /^([1-9]\d{3}-((0?[1-9])|(1[0-2]))-((0[1-9])|([1-2]?\d)|(3[0-1])))?$/
    return dataFilter.test(strData);
},

//判断是否是有效的日期时间格式字符串
    IsDataTimeString: function (strDataTime) {
    /// <summary>
    /// 判断是否是有效的日期时间格式字符串
    /// </summary>
    /// <param name="strDataTime">需要校验的字符串</param>
    /// <returns></returns>

    //日期时间格式正则
    var timeFilter = /^[1-9][0-9]-(0?[1-9]|1[0|1|2])-(0?[1-9]|[1|2][0-9]|3[0|1])s(0?[1-9]|1[0-9]|2[0-3]):(0?[0-9]|[1|2|3|4|5][0-9]):(0?[0-9]|[1|2|3|4|5][0-9])$/;
    return timeFilter.test(strDataTime);
},

/// <summary>
///将时间转换为c#需要的反序列化的格式 （默认处理时区）
/// <summary>
/// <param name="strDateTime">时间</param>
/// <param name="isDoOffset">bool类型，true处理时区，false处理时区</param>
GetDateSerializeString: function (strDateTime,isDoOffset) {
    var dataFilter = /^([1-9]\d{3}-((0?[1-9])|(1[0-2]))-((0[1-9])|([1-2]?\d)|(3[0-1])))$/
    if (dataFilter.test(strDateTime)) {
    strDateTime = strDateTime.replace(/-/g, "/");
    var localOffset = new Date().getTimezoneOffset() * 60000;//时区偏差
    if (typeof (localOffset) != undefined && isDoOffset == false) {
    localOffset = 0;
    }
    return "\/Date(" + (new Date(strDateTime).valueOf() - localOffset) + ")\/";
    }
    else {
    return null;
    }
},

//文字超长省略显示
OverflowFormatter: function (value) {
    return "<div class='OverflowFormatter'>" + $.trim(value) + "</div>"
},

//json时间格式转字符串
JsonDateFormatter: function (strJsonTime) {
    if (!strJsonTime || strJsonTime == "") {
        return "";
    }
    var date;
    //newtonsoft类型
    if (strJsonTime.indexOf("T") > 0) {
        strJsonTime = strJsonTime.replace("T", " ");
        date = new Date(Date.parse(strJsonTime.replace(/-/g, "/")));
    }
    else if (strJsonTime.indexOf("Date") > 0) {
        //微软类型
        var re = /-?\d+/;
        var m = re.exec(strJsonTime);
        date = new Date(parseInt(m[0]));
    }
    if (date) {
        return date.Format("yyyy-MM-dd");
    }
    else {
        return "";
    }
},
}
