<template>
  <div class="editBuildingWrapper">
    <el-button type='primary' class="editBtn" size='mini' @click="startEdit()">编辑</el-button>
    <div class="left" id="imgBoxWrapper">
      <div id="imgBox" class="div-rows-col" @mousewheel="theZoom($event)">
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583733137772&di=05428e7b4019bc6010e565289bf030bd&imgtype=0&src=http%3A%2F%2Fimg2.xafc.com%2Fbuilding%2F20180115%2F5a5c3d0f906c2.jpg" alt="">
        <canvas id="canvas" :width="canvasW" :height="canvasH" @click='startDraw($event)' @mousemove="draw($event)"></canvas>
        <canvas id="canSave" :width="canvasW" :height="canvasH" @click='startDraw($event)'></canvas>
      </div>
    </div>
    <div class="right">
      <div class="scenarioPropertiesWrapper">
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
            <el-upload class="avatar-uploader" :action="getIp" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <!-- <i class="el-icon-plus avatar-uploader-icon"></i> -->
              <el-button type="primary">点击上传</el-button>
            </el-upload>
          </div>
        </div>
        <div class="saveBtn">
          <el-button type="primary" @click="savePoints()">保存位置</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getOffset, getObjStr } from "@/utils/publictool.js";
import { updateAreaBuild } from "@/apis/bmap.js";
import { getKey, setKey } from "@/utils/local.js";
import { ip } from "@/apis/upload.js";
import $ from "jquery";
import "webpack-jquery-ui";
import "webpack-jquery-ui/css";
export default {
  data() {
    return {
      pointX: 0, //鼠标点
      pointY: 0,
      pointArr: [], // 存放坐标的数组
      savaPointArr: [], //存放坐标和缩放比的数组
      can: {}, //画布1
      ctx: {},
      canSave: {}, //画布2
      ctxSave: {},
      oIndex: -1, //判断数遍是否移动到起始点处
      flag: false, // 控制是否可以绘制
      // 鼠标滚动参数
      imgBoxW: 1000, //图片盒子宽
      imgBoxH: 600, //图片盒子高
      scaleSize: 1, //初始化缩放率
      bigBoxW: 0, //大盒子宽
      bigBoxH: 0, //大盒子高
      canvasW: 1000,
      canvasH: 600,
      canvasL: 0,
      canvasT: 0,
      bgX: 0, //图片盒子在大盒子内的X坐标
      bgY: 0, //图片盒子在大盒子内的Y坐标
      startX: 0, //图片盒子拖动之前位置
      startY: 0,
      endX: 0,
      endY: 0,
      bgcImg: ""
    };
  },
  created() {
    // 初始化点位
    if (getKey("currentMsg").points || getKey("currentMsg").points !== "null") {
      this.pointArr = getKey("currentMsg").points;
    }
    // 初始化背景图片
    if (
      getKey("currentMsg").allMsg.backgroundUrl ||
      getKey("currentMsg").allMsg.backgroundUrl !== "null"
    ) {
      this.bgcImg = getKey("currentMsg").allMsg.backgroundUrl;
    }
  },
  mounted() {
    this.initNs();
    this.initCanvas();
    let that = this;
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
    //初始化视图
    this.drawctxSave();
  },
  computed: {
    getIp() {
      return ip;
    }
  },
  beforeUpdate() {},
  updated() {
    this.$nextTick(function() {
      this.drawctxSave(); //视图改变，马上触发
    });
  },
  methods: {
    initCanvas() {
      //初始化
      this.can = document.getElementById("canvas");
      this.ctx = this.can.getContext("2d");
      this.canSave = document.getElementById("canSave");
      this.ctxSave = this.canSave.getContext("2d");
      this.ctx.strokeStyle = "rgba(102,168,255,.5)"; //线条颜色
      this.ctx.lineWidth = 2; //线条粗细
      this.ctxSave.strokeStyle = "rgba(102,168,255,.5)"; //线条颜色
      this.ctxSave.lineWidth = 2; //线条粗细
      this.ctxSave.fillStyle = "rgba(161,195,255,0.5)";
    },
    //编辑按钮
    startEdit() {
      document.getElementById("canvas").style.cursor = "crosshair"; //改变鼠标样式
      this.pointArr = [];
      this.savePointArr = [];
      this.ctxSave.clearRect(0, 0, this.canvasW, this.canvasH);
      this.flag = true;
    },
    //画布点击事件
    startDraw(e) {
      if (this.flag) {
        if (e.offsetX || e.layerX) {
          this.pointX = e.offsetX == undefined ? e.layerX : e.offsetX;
          this.pointY = e.offsetY == undefined ? e.layerY : e.offsetY;
          var piX, piY;
          if (this.oIndex > 0 && this.pointArr.length > 0) {
            piX = this.pointArr[0].x;
            piY = this.pointArr[0].y;
            //画点
            this.makearc(
              this.ctx,
              piX,
              piY,
              this.GetRandomNum(4, 4),
              0,
              180,
              "rgba(102,168,255,1)"
            );
            this.pointArr.push({
              x: piX,
              y: piY
            });
            this.canvasSave(this.pointArr); //保存点线同步到另一个canvas
            this.saveCanvas(); //生成画布
          } else {
            piX = this.pointX;
            piY = this.pointY;
            this.makearc(
              this.ctx,
              piX,
              piY,
              this.GetRandomNum(4, 4),
              0,
              180,
              "rgba(102,168,255,1)"
            );
            this.pointArr.push({ x: piX, y: piY });
            this.savaPointArr.push({ x: piX, y: piY, size: this.scaleSize });
            this.canvasSave(this.pointArr); //保存点线同步到另一个canvas
          }
        }
      }
    },
    //画布移动事件
    draw(e) {
      if (this.flag) {
        if (e.offsetX || e.layerX) {
          this.pointX = e.offsetX == undefined ? e.layerX : e.offsetX;
          this.pointY = e.offsetY == undefined ? e.layerY : e.offsetY;
          var piX, piY;
          /*清空画布*/
          this.ctx.clearRect(0, 0, this.can.width, this.can.height);
          /*鼠标下跟随的圆点*/
          this.makearc(
            this.ctx,
            this.pointX,
            this.pointY,
            this.GetRandomNum(4, 4),
            0,
            180,
            "rgba(102,168,255,1)"
          );

          if (this.pointArr.length > 0) {
            if (
              this.pointX > this.pointArr[0].x - 15 &&
              this.pointX < this.pointArr[0].x + 15 &&
              (this.pointY > this.pointArr[0].y - 15 &&
                this.pointY < this.pointArr[0].y + 15)
            ) {
              if (this.pointArr.length > 1) {
                piX = this.pointArr[0].x;
                piY = this.pointArr[0].y;
                this.ctx.clearRect(0, 0, this.can.width, this.can.height);
                this.makearc(
                  this.ctx,
                  this.piX,
                  this.piY,
                  this.GetRandomNum(4, 4),
                  0,
                  180,
                  "rgba(102,168,255,.5)"
                );
                this.oIndex = 1;
              }
            } else {
              piX = this.pointX;
              piY = this.pointY;
              this.oIndex = -1;
            }
            /*开始绘制*/
            this.ctx.beginPath();
            this.ctx.moveTo(this.pointArr[0].x, this.pointArr[0].y);
            if (this.pointArr.length > 1) {
              for (var i = 1; i < this.pointArr.length; i++) {
                this.ctx.lineTo(this.pointArr[i].x, this.pointArr[i].y);
              }
            }
            this.ctx.lineTo(piX, piY);
            this.ctx.fillStyle = "rgba(161,195,255,0.5)"; //填充颜色
            this.ctx.fill(); //填充
            this.ctx.stroke(); //绘制
          }
        }
      }
    },
    makearc(ctx, x, y, r, s, e, color) {
      //清空画布
      ctx.clearRect(0, 0, 199, 202); //清空指定矩形内的矩形（左上x坐标，左上y坐标，宽，高）
      ctx.beginPath(); //起始一条路径，或重置当前路径
      ctx.fillStyle = color;
      ctx.arc(x, y, r, s, e); //创建弧/曲线（用于创建圆形或部分圆）
      ctx.fill(); //填充当前绘图（路径）
    },
    GetRandomNum(Min, Max) {
      //生成圆点
      var Range = Max - Min;
      var Rand = Math.random();
      return Min + Math.round(Rand * Range);
    },
    // 存储已生成的点线
    canvasSave(pointArr) {
      this.ctxSave.clearRect(0, 0, this.ctxSave.width, this.ctxSave.height);
      this.ctxSave.beginPath();
      if (pointArr.length > 1) {
        this.ctxSave.moveTo(pointArr[0].x, pointArr[0].y);
        for (var i = 1; i < pointArr.length; i++) {
          this.ctxSave.lineTo(pointArr[i].x, pointArr[i].y);
          this.ctxSave.fillStyle = "rgba(161,195,255,0.5)"; //填充颜色
          //ctxSave.fill();
          this.ctxSave.stroke(); //绘制
        }
        this.ctxSave.closePath();
      }
    },
    //绘画完成
    saveCanvas() {
      this.ctx.clearRect(0, 0, this.can.width, this.can.height);
      this.ctxSave.closePath(); //结束路径状态，结束当前路径，如果是一个未封闭的图形，会自动将首尾相连封闭起来
      this.ctxSave.fill(); //填充
      this.ctxSave.stroke(); //绘制
      document.getElementById("canvas").style.cursor = "default"; //改变鼠标样式
      this.flag = false;
    },
    //鼠标滚动事件
    theZoom(e) {
      this.initCanvas();
      var $b = document.getElementById("imgBoxWrapper"), //大盒子
        i = document.getElementById("imgBox"), //小盒子
        img = i.style;
      //鼠标坐标
      let l = getOffset($b);
      let x = e.pageX;
      let y = e.pageY;
      //相对坐标
      x = x - l.left;
      y = y - l.top;
      var p = e.wheelDelta / 1200;
      var ns = this.scaleSize;
      ns += p;
      ns = ns < 1 ? 1 : ns > 10 ? 10 : ns; //可以缩小到0.1,放大到5倍

      //计算位置，以鼠标所在位置为中心
      //以每个点的x、y位置，计算其相对于图片的位置，再计算其相对放大后的图片的位置
      this.bgX =
        this.bgX - (x - this.bgX) * (ns - this.scaleSize) / this.scaleSize;
      this.bgY =
        this.bgY - (y - this.bgY) * (ns - this.scaleSize) / this.scaleSize;
      //设置放大的宽度和新坐标
      img.width = this.imgBoxW * ns + "px";
      img.height = this.imgBoxH * ns + "px";
      //设置放大之后的画布大小
      this.canvasW = this.imgBoxW * ns;
      this.canvasH = this.imgBoxH * ns;
      console.log(ns, this.scaleSize);
      // 处理放大之后的画布点数组
      this.pointArr = this.pointArr.map(item => {
        item.y = item.y + item.y * (ns - this.scaleSize) / this.scaleSize;
        item.x = item.x + item.x * (ns - this.scaleSize) / this.scaleSize;
        return { x: item.x, y: item.y };
      });
      img.top = this.bgY + "px";
      img.left = this.bgX + "px";

      // 放大之后重新绘制在ctxSave
      this.scaleSize = ns; //更新倍率
    },
    drawctxSave() {
      if (this.pointArr.length > 0) {
        this.ctxSave.clearRect(0, 0, this.canvasW, this.canvasH);
        this.ctxSave.beginPath();
        this.ctxSave.moveTo(this.pointArr[0].x, this.pointArr[0].y);
        for (let i = 1; i < this.pointArr.length; i++) {
          this.ctxSave.lineTo(this.pointArr[i].x, this.pointArr[i].y);
        }
        this.ctxSave.strokeStyle = "rgba(102,168,255,.5)"; //线条颜色
        this.ctxSave.lineWidth = 2; //线条粗细
        this.ctxSave.fillStyle = "rgba(161,195,255,0.5)";
        this.ctxSave.closePath();
        this.ctxSave.fill();
        this.ctxSave.stroke();
      }
    },
    //初始化小盒子居中
    initNs() {
      this.bigBoxH = parseInt(
        document.getElementById("imgBoxWrapper").offsetHeight
      );
      this.bigBoxW = parseInt(
        document.getElementById("imgBoxWrapper").offsetWidth
      );
      this.bgX = -(this.imgBoxW - this.bigBoxW) / 2;
      this.bgY = -(this.imgBoxH - this.bigBoxH) / 2;
      document.getElementById("imgBox").style.left = this.bgX + "px";
      document.getElementById("imgBox").style.top = this.bgY + "px";
    },
    // 保存按钮
    savePoints() {
      console.log(this.savaPointArr);
      let arr = this.savaPointArr.map(item => {
        return {
          x: item.x / item.size,
          y: item.y / item.size
        };
      });
      //点坐标/缩放比为原始坐标
      updateAreaBuild({
        regionId: getKey("currentMsg").currentId,
        points: getObjStr(arr)
      })
        .then(res => {
          if (res.httpStatus == 200) {
            // this.pointArr = this.overlays;
            setKey("currentMsg", {
              currentId: getKey("currentMsg").currentId,
              points: arr
            });
            this.$message({
              type: "success",
              message: "保存成功"
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
      // console.log(getKey("currentMsg"));
    },
    // 上传
    // 上传成功
    handleAvatarSuccess(res, file) {
      console.log(res, file)
    },
    // 上传之前
    beforeAvatarUpload(file) {
      console.log(file);
      // const isJPG = file.type === "image/jpeg";
      // const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isJPG) {
      //   this.$message.error("上传图片只能是 JPG 格式!");
      // }
      // if (!isLt2M) {
      //   this.$message.error("上传图片大小不能超过 2MB!");
      // }
      // return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="less" scoped>
.editBuildingWrapper {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  .editBtn {
    position: absolute;
    left: 40px;
    top: -53px;
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
      canvas {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
      }
      #canvas {
        z-index: 1;
      }
    }
  }
  .right {
    flex: 0 0 350px;
    border: 1px solid #e7e7e7;
    margin-right: 10px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 0 50px 0;
    .scenarioPropertiesWrapper {
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
      .saveBtn {
        border-bottom: 1px solid #e7e7e7;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>