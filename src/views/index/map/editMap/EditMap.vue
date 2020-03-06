<template>
  <div class="MapWraaper">
    <div class="left">
      <div id="hello">
        <div id="dbmap"></div>
        <div id="result">
          <el-button type="primary" @click="getResult()">获取结果</el-button>
        </div>
      </div>
    </div>
    <div class="right">
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
        <span>中心位置</span>
        <div>
          <span>124.3645654,36.254671184</span>
        </div>
      </div>
      <div>
        <span>图片</span>
        <div>
          <div>
            <el-button type="primary" @click="editLocation()">编辑位置</el-button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
let BMap = window.BMap;
let BMapLib = window.BMapLib;
export default {
  name: "dbmap",

  data() {
    return {
      map: null,
      drawingManager: null,
      overlays: []
    };
  },

  mounted() {
    this.map = new BMap.Map("dbmap", {
      enableMapClick: false // 禁止底图点击事件
    });
    this.map.centerAndZoom(new BMap.Point(117.06, 36.67), 18);
    this.map.enableScrollWheelZoom();

    var styleOptions = {
      strokeColor: "red", //边线颜色。
      fillColor: "red", //填充颜色。当参数为空时，圆形将没有填充效果。
      strokeWeight: 3, //边线的宽度，以像素为单位。
      strokeOpacity: 0.8, //边线透明度，取值范围0 - 1。
      fillOpacity: 0.6, //填充的透明度，取值范围0 - 1。
      strokeStyle: "solid" //边线的样式，solid或dashed。
    };
    //实例化鼠标绘制工具
    this.drawingManager = new BMapLib.DrawingManager(this.map, {
      isOpen: false, //是否开启绘制模式
      enableDrawingTool: true, //是否显示工具栏
      drawingToolOptions: {
        anchor: "BMAP_ANCHOR_TOP_RIGHT", //位置
        offset: new BMap.Size(5, 5) //偏离值
      },
      polygonOptions: styleOptions //多边形的样式
    });
    //添加鼠标绘制工具监听事件，用于获取绘制结果
    this.drawingManager.addEventListener(
      "overlaycomplete",
      this.overlaycomplete
    );
  },

  methods: {
    overlaycomplete(e) {
      this.overlays = e.overlay.to;
    },
    getResult() {
      //获取结果
      console.log("点坐标", this.overlays);
    },
    editLocation(){ //编辑位置
     
    }
  }
};
</script>

<style lang="less" scoped>
.MapWraaper {
  width: 100%;
  height: 100%;
  // background-color: #000;
  display: flex;
  .left {
    height: 100%;
    flex: 1;
    border: 1px solid #e7e7e7;
    margin: 0 10px;
    #hello {
      width: 100%;
      height: 100%;
      #dbmap {
        width: 100%;
        height: 100%;
      }
      #result {
        position: absolute;
        left: 300px;
        bottom: 10px;
      }
    }
  }
  .right {
    flex: 0 0 250px;
    border: 1px solid #e7e7e7;
    margin-right: 10px;
    flex: 0 0 250px;
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
        // flex: 1;
        width: 160px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #e7e7e7;
        border-right: 1px solid #e7e7e7;
        overflow: hidden;
      }
    }
    .scenarioProperties {
      background-color: #475669;
      color: #fff;
      text-indent: 10px;
    }
  }

  //   dl,
  //   dt,
  //   dd,
  //   ul,
  //   li {
  //     margin: 0;
  //     padding: 0;
  //     list-style: none;
  //   }
  //   p {
  //     font-size: 12px;
  //   }
  //   dt {
  //     font-size: 14px;
  //     font-family: "微软雅黑";
  //     font-weight: bold;
  //     border-bottom: 1px dotted #000;
  //     padding: 5px 0 5px 5px;
  //     margin: 5px 0;
  //   }
  //   dd {
  //     padding: 5px 0 0 5px;
  //   }
  //   li {
  //     line-height: 28px;
  //   }
}
</style>