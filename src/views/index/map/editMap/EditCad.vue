<template>
  <div class="editCadWrapper">
    <div class="iconList">
      <div class='chosedIconBox '>
        <!-- <img src="../../../../assets/imgs/01.jpg" alt="" class="nav-imgs mozgat img1" id="img1" data-name='img1'>
        <img src="../../../../assets/imgs/02.jpg" alt="" class="nav-imgs mozgat img2" data-name='img2'>
        <img src="../../../../assets/imgs/03.jpg" alt="" class="nav-imgs mozgat img3" data-name='img3'> -->

        <div v-for="(item,index) in draggableIconList" :key="index" class="iconBox nav-imgs mozgat">
          <img :src="item.icon" alt="" class="nav-imgs mozgat" @mousedown="chosedDraggableImg(item)">
        </div>
      </div>
      <div class="unfold">
        <el-select v-model="iconValue" placeholder="请选择图标类型" @change="chosedIcon()">
          <el-option v-for="item in IconOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="left" id="imgBoxWrapper">
      <div id="imgBox" class="div-rows-col" @mousewheel="theZoom($event)">
        <img src="@/assets/imgs/微信截图_20200218103048.png" alt="">
        <div id="iconBox">
          <img :src="item.path" v-for="item in iconList" :key="item.id" :style="{left:item.x+'px',top:item.y+'px'}">
        </div>
      </div>
    </div>
    <div class="right">
      <div class="rightTop">
        <div class="scenarioProperties">场景属性</div>
        <div>
          <span>属性名</span>
          <div>
            <span>属性值</span>
          </div>
        </div>
        <div>
          <span>场景类型</span>
          <div>
            <span>图片型</span>
          </div>
        </div>
        <div>
          <span>图片</span>
          <div>
            <el-button type="primary">点击上传</el-button>
          </div>
        </div>

      </div>

      <div class="rightBottom" v-show="showEquipSelect">
        <div class="scenarioProperties">
          <p>衔接场景</p>
        </div>
        <div class="saveBtn">
          <el-button type="primary" @click="savePoints()">保存</el-button>
        </div>
        <div class="shoseEquip">
          <el-select v-model="equipValue" placeholder="请选择图标类型">
            <el-option v-for="item in equipOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import $ from "jquery";
import "webpack-jquery-ui";
import "webpack-jquery-ui/css";
import { getOffset } from "@/utils/publictool.js";
import { getKey } from "@/utils/local.js";
import { listNormalIcons, imgIp } from "@/apis/upload";
import { getListDevices } from "@/apis/equipment";
import { addFloorDevice,listFloorDevice } from "@/apis/cadMap";
export default {
  data() {
    return {
      showIconBox: true,
      hideIconBox: false,
      IconOptions: [], // 图标类型下拉框
      draggableIconList: [], // 用于拖拽的图标数组
      iconValue: "", // 图标类型value
      equipValue: "", // 衔接设备value
      currentIcon: {}, // 当前拖拽图标参数
      equipOptions: [], //衔接设备下拉框
      imgBoxW: 1000, //图片盒子宽
      imgBoxH: 600, //图片盒子高
      scaleSize: 1, //初始化缩放率
      bigBoxW: 0, //大盒子宽
      bigBoxH: 0, //大盒子高
      iconList: [], //cad内的图标位置信息
      iconLists: [], //储存拖拽到cad内图片的
      bgX: 0, //图片盒子在大盒子内的X坐标
      bgY: 0, //图片盒子在大盒子内的Y坐标
      showEquipSelect: false,
      currentIconX: 0,
      currentIconY: 0
    };
  },
  created() {
   
    // 获取cad上显示的设备图标
    this.getListFloorDevice()
    // 获取通用图标数组
    listNormalIcons()
      .then(res => {
        console.log(res);
        if (res.httpStatus == 200) {
          this.IconOptions = res.result.map(item => {
            return {
              value: item.iotSystem,
              label: item.iotSystemName,
              icons: item.icons
            };
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  mounted() {
    //初始化缩放比例
    let that = this;
    this.initNs();
    // this.draggableImg();
    //图片盒子可以拖拽
    $("#imgBox").draggable({
      start: function(event) {
        that.startX = event.pageX;
        that.startY = event.pageY;
      },
      stop: function(event) {
        that.endX = event.pageX;
        that.endY = event.pageY;
        that.bgX = that.bgX + that.endX - that.startX;
        that.bgY = that.bgY + that.endY - that.startY;
      }
    });
    //拖拽

    // console.log(
    //   "小盒子初始位置",
    //   document.getElementById("imgBox").offsetTop,
    //   document.getElementById("imgBox").offsetLeft
    // );
    // console.log(
    //   "小盒子初始大小",
    //   document.getElementById("imgBox").offsetHeight,
    //   document.getElementById("imgBox").offsetWidth
    // );
  },
  updated() {
    this.$nextTick(this.draggableImg);
  },
  methods: {
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
      console.log("点相对图片坐标", x - this.bgX);
      console.log(this.bgY);
      //设置放大的宽度和新坐标
      img.width = this.imgBoxW * ns + "px";
      img.height = this.imgBoxH * ns + "px";
      // 用一下图片高度的一半*变化率
      this.iconList = this.iconList.map(item => {
        console.log(11111111111);
        item.y = item.y + item.y * (ns - this.scaleSize) / this.scaleSize;
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
    },
    //选择图标类型
    chosedIcon() {
      this.draggableIconList = this.IconOptions.filter(item => {
        return item.value == this.iconValue;
      })[0].icons;
      this.draggableIconList = this.draggableIconList.map(item => {
        return {
          deleted: item.deleted,
          deviceStatus: item.deviceStatus,
          deviceTypeCode: item.deviceTypeCode,
          deviceTypeId: item.deviceTypeId,
          deviceTypeName: item.deviceTypeName,
          enable: item.enable,
          icon: imgIp + item.icon,
          parentId: item.parentId,
          system: item.system
        };
      });
      console.log(this.draggableIconList);
      console.log(this.iconValue);
    },
    // 开启图片拖拽
    draggableImg() {
      let _this = this;
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
          _this.currentIconX = ui.position.left;
          _this.currentIconY = ui.position.top;
          // 用了之后再次拖拽失效
          _this.getDevicesList();
          _this.showEquipSelect = true;
          console.log(event, ui);
          console.log("拖拽结束", ui.position);
          console.log(this, _this);
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
              // start: function() {
              //   console.log("再次拖拽");
              //   $("#imgBox").draggable({ disabled: true });
              // },
              // stop: function(event, ui) {
              //   console.log("再次拖拽结束");
              //   $("#imgBox").draggable({
              //     disabled: false
              //   });
              //   console.log(ui.position);
              // }
            });
          }
          item.css({
            top: origPos.top - ctPos.top - 1,
            left: origPos.left - ctPos.left - 1
          });
        }
      });
    },
    //选中拖拽图标
    chosedDraggableImg(icon) {
      console.log("12341231234");
      this.currentIcon = icon;
    },
    // 拖拽结束之后请求衔接的场景
    getDevicesList() {
      console.log(
        this.currentIcon.deviceTypeCode,
        getKey("currentMsg").currentId
      );
      getListDevices({
        deviceTypeCode: this.currentIcon.deviceTypeCode,
        floorId: getKey("currentMsg").currentId
      })
        .then(res => {
          if (res.httpStatus == 200) {
            this.equipOptions = res.result.map(item => {
              return {
                value: item.deviceId,
                label: item.position + item.mac
              };
            });
            console.log(this.equipOptions);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 绑定value
    chosedEquip() {},
    // 保存点位
    savePoints() {
      console.log(getKey("currentMsg"));
      let { areaId, buildId, factoryId, regionId, siteId, system } = getKey(
        "currentMsg"
      ).allMsg;
      if (this.equipValue) {
        addFloorDevice({
          floorId: getKey("currentMsg").currentId,
          areaId,
          buildId,
          factoryId,
          regionId,
          siteId,
          system,
          deviceId: this.equipValue,
          x: this.currentIconX,
          y: this.currentIconY
        })
          .then(res => {
            console.log(res);
            if (res.httpStatus == 200) {
              this.$message({
                type: "success",
                message: "操作成功"
              });
            } else {
              this.$message({
                type: "warning",
                message: "网络请求失败"
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$message({
          type: "warning",
          message: "请选择衔接场景"
        });
      }
    },
    // 获取图标列表
    getListFloorDevice() {
      console.log(getKey("currentMsg").currentId)
      listFloorDevice({
        floorId: getKey("currentMsg").currentId
      })
        .then(res => {
          console.log('图标列表',res);
          if(res.httpStatus == 200){
            //  this.iconList = res.result
          }
        })
        .catch(err => {
          console.log(err);
        });
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
    height: 50px;
    border: 1px solid #e7e7e7;
    position: absolute;
    left: 20px;
    top: -58px;
    background-color: #fff;
    z-index: 10;
    display: flex;
    align-items: center;
    .chosedIconBox {
      display: flex;
      img {
        width: 30px;
        height: 30px;
        margin-left: 10px;
      }
      .iconBox {
        width: 40px;
        height: 50px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        align-items: center;
        justify-content: center;
      }
    }
    .unfold {
      position: absolute;
      right: 10px;
      .el-select {
        width: 150px;
      }
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
    display: flex;
    flex-direction: column;
    // justify-content: space-between;
    .rightTop {
      // flex: 0 0 350px;
      border: 1px solid #e7e7e7;
      margin-right: 10px;
      // flex: 0 0 400px;
      border: 1px solid #e7e7e7;
      margin-right: 10px;
      border-radius: 5px;
      & > div {
        height: 50px;
        display: flex;
        align-items: center;
        & > span {
          display: inline-block;
          height: 100%;
          width: 90px;
          border-bottom: 1px solid #e7e7e7;
          border-right: 1px solid #e7e7e7;
          line-height: 50px;
          text-indent: 10px;
        }
        & > div {
          height: 100%;
          width: 260px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid #e7e7e7;
        }
      }
      .scenarioProperties {
        background-color: #475669;
        color: #fff;
        text-indent: 10px;
        width: 352px;
      }
    }
    .rightBottom {
      margin-top: 80px;
      & > div {
        height: 50px;
        width: 350px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #e7e7e7;
        border-right: 1px solid #e7e7e7;
        border-left: 1px solid #e7e7e7;
      }
      .saveBtn,
      .shoseEquip {
        justify-content: center;
      }
      .scenarioProperties {
        background-color: #475669;
        width: 352px;
        color: #fff;
        text-indent: 10px;
      }
    }
  }
}
</style>