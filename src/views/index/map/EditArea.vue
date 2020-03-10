<template>
  <div class="editAreaWrapper">
    <div class="layerMenu" v-show="layerMenu">
      <p class="menuTitle">项目列表</p>
      <div class="menuTrees">
        <el-tree :data="data" node-key="id" default-expand-all :props="defaultProps" :expand-on-click-node='false' @node-click='nodeClick($event)'>
          <span class="custom-tree-node" slot-scope="{node}">
            <span>{{node.label }}</span>
            <span>
              <span class="el-icon-circle-plus-outline operation" @click="clickBtnCircle($event,node.key)">
              </span>
              <span class="el-icon-edit operation" @click="clickBtnEdit($event,node.parent.key)">
              </span>
              <span class="el-icon-remove-outline operation" @click="clickBtnRemove($event,node.key)">
              </span>
            </span>
          </span>
        </el-tree>
      </div>
    </div>
    <div class="layerMenuControl" @click="layerMenuClick()" title="点击展开结构图">
      <i class="el-icon-s-fold" />
    </div>
    <div class="toolIcon">
      <div class="toolIconList">
        <!-- <span><img src="../../../assets/imgs/01.jpg" alt="" class="nav-imgs mozgat img1" id="img1" data-name='img1'></span>
        <span><img src="../../../assets/imgs/02.jpg" alt="" class="nav-imgs mozgat img2" data-name='img2'></span>
        <span><img src="../../../assets/imgs/03.jpg" alt="" class="nav-imgs mozgat img3" data-name='img3'></span> -->
      </div>
    </div>
    <div class="editAreaContainer div-rows-col">
      <!-- <keep-alive><router-view></router-view></keep-alive> -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// import $ from "jquery";
// import "webpack-jquery-ui";
// import "webpack-jquery-ui/css";
export default {
  data() {
    return {
      layerMenu: true, //左边菜单默认展开
      data: [
        //树形菜单数组
        {
          id: 1,
          label: "环球中心",
          url: "/index/map/editArea/editMap",
          children: [
            {
              id: 2,
              url: "/index/map/editArea/editCad",
              label: "办公区",
              children: [
                {
                  id: 3,
                  url: "/index/map/editArea/editBuilding",
                  label: "办公楼N1",
                  children: [
                    {
                      id: 4,
                      url: "/index/map/editArea/editCad",
                      label: "一层"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    layerMenuClick() {
      this.layerMenu = this.layerMenu === true ? false : true;
    },
    //tree添加
    clickBtnCircle(e, key) {
      e.stopPropagation();
      console.log(key);
    },
    // tree 编辑
    clickBtnEdit(e, key) {
      e.stopPropagation();
      console.log(key);
      //判断是否为undefind，是的话则其没有父级
    },
    //tree 删除
    clickBtnRemove(e, key) {
      e.stopPropagation();
      console.log(key);
    },
    // 点击某一个节点
    nodeClick(e) {
      // console.log(e)
      this.$router.history.push(e.url);
    }
  }
};
</script>

<style lang="less">
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
    height: 95%;
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: #f1f1f1;
    overflow-y: auto;
    // color: #e7e7e7;
    .menuTitle {
      font-size: 16px;
      padding: 15px;
    }
    .menuTrees {
      .el-tree {
        // 修改树形样式
        .operation {
          font-size: 14px;
          margin-left: 20px;
        }
        .is-current {
          // background-color: salmon !important;
        }
        .is-focusable {
          // background-color: #262a34;
          background-color: #f1f1f1;
        }
        .el-tree-node__content:hover {
          //   background-color: #262a34;
          // background-color: red;
        }
        .el-tree-node__children:hover {
          // background-color: red;
        }
        .el-tree-node:focus > .el-tree-node__content {
          // background-color: yellow;
        }
        .el-tree-node.is-current > .el-tree-node__content {
          background-color: #c2d6ea !important;
        }
      }
    }
  }
  .layerMenu::-webkit-scrollbar {
    width: 4px;
  }
  .layerMenu::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.2);
  }
  .layerMenu::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
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
    padding-top: 10px;
    .toolIconList {
      width: 90%;
      height: 36px;
      border: 1px solid #e7e7e7;
      display: flex;
      align-items: center;
      margin-left: 20px;
      img {
        width: 30px;
        height: 30px;
        margin-left: 10px;
      }
    }
  }
  .editAreaContainer {
    flex: 1;
    width: 100%;
    padding: 20px 0;
    display: flex;
  }
}
</style>
