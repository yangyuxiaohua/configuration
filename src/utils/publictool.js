// import moment from 'moment'
//原生js注册
export function addEvent(obj, sType, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(sType, fn, false);
    } else {
        obj.attachEvent('on' + sType, fn);
    }
}
export function removeEvent(obj, sType, fn) {
    if (obj.removeEventListener) {
        obj.removeEventListener(sType, fn, false);
    } else {
        obj.detachEvent('on' + sType, fn);
    }
}
export function prEvent(ev) {
    var oEvent = ev || window.event;
    if (oEvent.preventDefault) {
        oEvent.preventDefault();
    }
    return oEvent;
}
/*添加滑轮事件*/
export function addWheelEvent(obj, callback) {
    if (window.navigator.userAgent.toLowerCase().indexOf("firefox") != -1) {
        addEvent(obj, "DOMMouseScroll", wheel);
    } else {
        addEvent(obj, "mousewheel", wheel);
    }

    function wheel(ev) {
        var oEvent = prEvent(ev),
            delta = oEvent.detail ? oEvent.detail > 0 : oEvent.wheelDelta < 0;
        callback && callback.call(oEvent, delta);
        return false;
    }
}

//滚动缩放图片相关函数
export function getOffset(o) {
    var left = 0,
        top = 0;
    while (o != null && o != document.body) {
        top += o.offsetTop;
        left += o.offsetLeft;
        o = o.offsetParent;
    }
    return {
        left: left,
        top: top
    };
}
//获取所有的子节点
export function getChildNode(parent) {
    return document.getElementById(parent).children
}
// 事件戳格式化
export function getTime(time) {
    let str = ''
    let date = new Date(time)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    str = `${year}-${month}-${day}`
    return str
}
// 上传文件
export function upload() {
    console.log(111)
}

//数组排序
export function compare(property) {
    return function (a, b) {
        var value1 = parseInt(a[property]);
        var value2 = parseInt(b[property]);
        return value1 - value2;
    }
}
// 截取某一串字符串
export function getStr(str, word) {

    if (str.indexOf(word) !== -1) {

        str = str.substr(str.lastIndexOf(word) + word.length)

    }
    return str
}
//将数组深度转字符串或转回数组
export function getObjStr (obj){
     if(typeof obj == 'string'){
         console.log('字符串')
       return JSON.parse(JSON.parse(new String(JSON.stringify(obj)).toString())) 
    }else{
        console.log('不是字符串')
        return new String(JSON.stringify(obj)).toString()
     }
}