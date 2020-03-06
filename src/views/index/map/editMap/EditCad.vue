<template>
  <div class="editCadWrapper">
    <div class="iconList" @click="clickIcon">
      <span><img src="../../../../assets/imgs/01.jpg" alt="" class="nav-imgs mozgat img1" id="img1" data-name='img1'></span>
      <span><img src="../../../../assets/imgs/02.jpg" alt="" class="nav-imgs mozgat img2" data-name='img2'></span>
      <span><img src="../../../../assets/imgs/03.jpg" alt="" class="nav-imgs mozgat img3" data-name='img3'></span>
    </div>
    <div class="left" id="imgBoxWrapper">
      <div id="imgBox" class="div-rows-col" @mousewheel="theZoom($event)">
        <img src="@/assets/imgs/微信截图_20200218103048.png" alt="">
        <div id="iconBox">
          <!-- <img src="../../../../assets/imgs/01.jpg" alt="" class="icon" id="icon1">
          <img src="../../../../assets/imgs/01.jpg" alt="" class="icon" id="icon2"> -->
          <img :src="item.path" v-for="item in iconList" :key="item.id" :style="{left:item.x+'px',top:item.y+'px'}">
        </div>
      </div>
    </div>
    <div class="right">
      <div class="scenarioProperties">场景属性</div>
      <div>
        <span>属性名</span>
        <div><span>属性值</span></div>
      </div>
      <div>
        <span>场景类型</span>
        <div><span>图片型</span></div>
      </div>
      <div>
        <span>图片</span>
        <div><el-button type="primary">点击上传</el-button></div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import "webpack-jquery-ui";
import "webpack-jquery-ui/css";
import {
  // addEvent,
  // removeEvent,
  // prEvent,
  // addWheelEvent
  getOffset
  // getChildNode
} from "@/utils/publictool.js";
export default {
  data() {
    return {
      imgBoxW: 1000, //图片盒子宽
      imgBoxH: 600, //图片盒子高
      scaleSize: 1, //初始化缩放率
      bigBoxW: 0, //大盒子宽
      bigBoxH: 0, //大盒子高
      iconList: [], //cad内的图标位置信息
      bgX: 0, //图片盒子在大盒子内的X坐标
      bgY: 0, //图片盒子在大盒子内的Y坐标
      startX: 0, //图片盒子拖动之前位置
      startY: 0,
      endX: 0,
      endY: 0
    };
  },
  created() {
    this.iconList = [
      {
        id: 1,
        path:
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582629781782&di=d490d840863d30343df27f62455225b7&imgtype=0&src=http%3A%2F%2Fpic175.nipic.com%2Ffile%2F20180711%2F24144945_161350611036_2.jpg",
        x: 156,
        y: 200
      },
      {
        id: 2,
        path: "https://icweiliimg6.pstatp.com/weili/l/872998720548110343.webp",
        x: 156,
        y: 220
      },
      {
        id: 3,
        path: "https://icweiliimg6.pstatp.com/weili/l/872998720548110343.webp",
        x: 156,
        y: 240
      },
      {
        id: 4,
        path: "https://icweiliimg6.pstatp.com/weili/l/872998720548110343.webp",
        x: 186,
        y: 200
      },
      {
        id: 5,
        path: "https://icweiliimg6.pstatp.com/weili/l/872998720548110343.webp",
        x: 586,
        y: 500
      }
    ];
  },
  mounted() {
    //初始化缩放比例
    let that = this;
    this.initNs();
    console.log(this.bgX);
    console.log(this.bgY);
    //图片盒子可以拖拽
    $("#imgBox").draggable({
      start: function(event) {
        console.log("图片盒子被拖拽", event);
        that.startX = event.pageX;
        that.startY = event.pageY;
        console.log("startx", that.startX);
        console.log("starty", that.startY);
        console.log(that);
      },
      stop: function(event) {
        that.endX = event.pageX;
        that.endY = event.pageY;
        console.log("endx", that.endX);
        console.log("endy", that.endY);
        that.bgX = that.bgX + that.endX - that.startX;
        that.bgY = that.bgY + that.endY - that.startY;
        console.log("that.bgX", that.bgX);
        console.log("that.bgY", that.bgX);
      }
    });
    //拖拽
    $(".nav-imgs").draggable({
      helper: "clone", //如果设置为 "clone"，元素将被克隆，且克隆将被拖拽
      revert: "invalid", //如果设置为 "invalid"，还原仅在 draggable 未放置在 droppable 上时发生
      // opacity: 0.7, //不透明度
      // scope: 'drop', //一个“default”与droppable带有相同的scope值的draggable会被该droppable接受
      appendTo: "#imgBox",
      start: function(event, ui) {
        console.log("拖拽开始", event, ui);
      },
      stop: function(event, ui) {
        console.log("拖拽结束", event, ui);
        console.log("拖拽结束", ui.position);
      }
    });
    //拖动复制到指定的div当中
    $("#imgBox").droppable({
      drop: function(event, ui) {
        var ct = $(this);
        var item = $(ui.draggable);
        var origPos;
        var ctPos = ct.offset();

        if (item.is(".tapad")) {
          origPos = ui.offset;
          ct.append(item);
        } else {
          origPos = ui.offset;
          item = item.clone();
          ct.append(item);
          item.removeClass("ui-draggable");
          item.addClass("tapad");
          item.draggable({
            start: function() {
              console.log("再次拖拽");
              $("#imgBox").draggable({ disabled: true });
            },
            stop: function(event, ui) {
              console.log("再次拖拽结束");
              $("#imgBox").draggable({
                disabled: false
              });
              console.log(ui.position);
            }
          });
        }
        item.css({
          top: origPos.top - ctPos.top - 1,
          left: origPos.left - ctPos.left - 1
        });
      }
    });
    console.log(
      "小盒子初始位置",
      document.getElementById("imgBox").offsetTop,
      document.getElementById("imgBox").offsetLeft
    );
    console.log(
      "小盒子初始大小",
      document.getElementById("imgBox").offsetHeight,
      document.getElementById("imgBox").offsetWidth
    );
  },
  methods: {
    clickIcon() {
      alert(11);
    },
    theZoom(e) {
      console.log("滚动之前的位置", this.bgX, this.bgY);
      var $b = document.getElementById("imgBoxWrapper"), //大盒子
        i = document.getElementById("imgBox"), //小盒子
        img = i.style;
      //鼠标坐标
      let l = getOffset($b);
      let x = e.pageX;
      let y = e.pageY;
      console.log("原生鼠标坐标", x, y);
      //相对坐标
      x = x - l.left;
      y = y - l.top;
      console.log("大盒子相对body坐标", l);
      var p = e.wheelDelta / 1200;
      console.log(13351545112, p);
      var ns = this.scaleSize;
      ns += p;
      ns = ns < 1 ? 1 : ns > 10 ? 10 : ns; //可以缩小到0.1,放大到5倍

      console.log("鼠标相对大盒子坐标", x, y);
      //计算位置，以鼠标所在位置为中心
      //以每个点的x、y位置，计算其相对于图片的位置，再计算其相对放大后的图片的位置
      this.bgX =
        this.bgX - (x - this.bgX) * (ns - this.scaleSize) / this.scaleSize;
      this.bgY =
        this.bgY - (y - this.bgY) * (ns - this.scaleSize) / this.scaleSize;
      // this.bgX = this.bgX - (x-this.bgX) *(ns-1) / 1
      // this.bgY = this.bgY - (x-this.bgY) *(ns-1) / 1
      console.log("点相对图片坐标", x - this.bgX);
      console.log(this.bgY);
      //设置放大的宽度和新坐标
      img.width = this.imgBoxW * ns + "px";
      img.height = this.imgBoxH * ns + "px";
      // 用一下图片高度的一半*变化率
      this.iconList = this.iconList.map(item => {
        console.log(11111111111);
        item.y =
          // 20 * (ns - this.scaleSize) / this.scaleSize +
          item.y + item.y * (ns - this.scaleSize) / this.scaleSize;
        item.x = item.x + item.x * (ns - this.scaleSize) / this.scaleSize;
        console.log((ns - this.scaleSize) / this.scaleSize);
        return { id: item.id, path: item.path, x: item.x, y: item.y };
      });
      console.log(this.iconList);
      console.log(
        "小盒子缩放之后的",
        ns,
        document.getElementById("imgBox").offsetHeight,
        document.getElementById("imgBox").offsetWidth
      );

      console.log(22222222222);
      img.top = this.bgY + "px";
      img.left = this.bgX + "px";
      console.log(
        "图片高度",
        i.offsetHeight,
        "图片宽度",
        i.offsetWidth,
        "变化率",
        (ns - this.scaleSize) / this.scaleSize,
        this.iconList[0].x,
        this.iconList[0].y
      );
      console.log(
        "小盒子缩放之后的",
        ns,
        document.getElementById("imgBox").offsetTop,
        document.getElementById("imgBox").offsetLeft
      );
      //缩放之后改变图标对于图片的相对位置

      this.scaleSize = ns; //更新倍率
    },
    //初始化图片坐标
    initNs() {
      this.bigBoxH = parseInt(
        document.getElementById("imgBoxWrapper").offsetHeight
      );
      this.bigBoxW = parseInt(
        document.getElementById("imgBoxWrapper").offsetWidth
      );
      this.bgX = -(this.imgBoxW - this.bigBoxW) / 2;
      // this.scaleSize = this.bigBoxW / this.imgBoxW;
      // this.bgX = 100;
      this.bgY = -(this.imgBoxH - this.bigBoxH) / 2;
      document.getElementById("imgBox").style.left = this.bgX + "px";
      document.getElementById("imgBox").style.top = this.bgY + "px";

      console.log(this.bgX);
      console.log(this.bgY);
    }
  }
};
</script>

<style lang="less" scoped>
.editCadWrapper {
  width: 100%;
  height: 100%;
  // background-color: #000;
  display: flex;
  position: relative;
  .iconList {
    width: 90%;
    height: 36px;
    border: 1px solid #e7e7e7;
    position: absolute;
    left: 20px;
    top: -58px;
    background-color: #fff;
    z-index: 10;
    display: flex;
    align-items: center;
    img {
      width: 30px;
      height: 30px;
      margin-left: 10px;
    }
  }
  .left {
    height: 100%;
    flex: 1;
    border: 1px solid #e7e7e7;
    margin: 0 10px;
    overflow: hidden;
    position: relative;

    #imgBox {
      width: 1000px;
      height: 600px;
      position: absolute;
      border: none;
      img {
        width: 100%;
        height: 100%;
      }
      #iconBox {
        width: 0;
        height: 0;
        img {
          position: absolute;
          width: 10px;
          height: 10px;
          left: 0;
          top: 0;
          z-index: 100;
        }
      }
      .mozgat {
        cursor: move;
        margin-bottom: 7px;
        position: absolute;
        // z-index: 100000;
        width: 30px;
        height: 30px;
      }
    }
  }
  .right {
    flex: 0 0 250px;
    border: 1px solid #e7e7e7;
    margin-right: 10px;
    border-radius: 5px;
    &>div {
      height: 50px;
      display: flex;
      align-items: center;
      &>span{
        display: inline-block;
        height: 100%;
        width: 90px;
        border-bottom: 1px solid #e7e7e7;
        border-right: 1px solid #e7e7e7;
        line-height: 50px;
        text-indent: 10px;
      }
      &>div{
        height: 100%;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
         border-bottom: 1px solid #e7e7e7;
        border-right: 1px solid #e7e7e7;
      }
    }
    .scenarioProperties {
      background-color: #475669;
      color: #fff;
      text-indent: 10px;
    }
  }
}
</style>