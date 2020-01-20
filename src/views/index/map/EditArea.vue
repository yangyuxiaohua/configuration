<template>
  <div class="editAreaWrapper">
    <div class="layerMenu" v-show="layerMenu"></div>
    <div class="layerMenuControl" @click="layerMenuClick()" title="点击展开结构图">
      <i class="el-icon-s-fold" />
    </div>
    <div class="toolIcon">
      <div class="toolIconList"></div>
    </div>
    <div class="editAreaContainer">
      <div class="left"></div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      layerMenu: true
    };
  },
  methods: {
    layerMenuClick() {
      this.layerMenu = this.layerMenu === true ? false : true;
    }
  }
};
</script>

<style lang="less" scoped>
.editAreaWrapper {
  width: 100%;
  height: 100%;
  // .toolIcon{
  //   width: 80%;
  // }
  display: flex;
  flex-direction: column;
  .layerMenu {
    width: 286px;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: #1f2129;
  }
  .layerMenuControl {
    width: 30px;
    height: 30px;
    position: absolute;
    left: 290px;
    top: 10px;
    font-size: 30px;
    cursor: pointer;
  }
  .toolIcon {
    display: flex;
    justify-content: center;
    padding-top: 10px;
    .toolIconList {
      width: 90%;
      height: 36px;
      border: 1px solid #e7e7e7;
    }
  }
  .editAreaContainer {
    flex: 1;
    width: 100%;
    padding: 20px 0;
    // background-color: #f4f4f4;
    display: flex;
    .left {
      height: 100%;
      flex: 1;
      border: 1px solid #e7e7e7;
    }
    .right {
      flex: 0 0 250px;
      border: 1px solid #e7e7e7;
    }
  }
}
</style>
