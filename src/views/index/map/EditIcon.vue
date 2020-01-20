<template>
    <div class="editIconWrapper">
        <div class="title">
            <Title>
                <template #TitleBox>编辑图标</template>
            </Title>
        </div>
        <div class="editIconContainer">
            <div class="iconbox">
                <p class="iconTitle">通用</p>
                <ul>
                    <li>
                        <div class="iconChose">
                            <div class="uncheckIcon">
                                <span>未选中</span>
                                <img src="" alt="">
                            </div>
                            <div class="checkIcon">
                                <span>选中</span>
                                <img src="" alt="">
                            </div>
                        </div>
                        <p>设备名称：
                            <span>通用图标</span>
                        </p>
                        <p>设备编码：
                            <span>00001</span>
                        </p>
                        <div class="iconDelete">
                            <i class="el-icon-delete"></i>
                        </div>
                    </li>
                    <li class="uploadIcon">
                        <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import Title from "../../../components/Title";
export default {
  components: {
    Title
  },
  data() {
    return {
      imageUrl: ""
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="less" scoped>
.editIconWrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .title {
    width: 100%;
    flex: 0 0 56px;
  }
  .editIconContainer {
    flex: 1;
    width: 100%;
    background-color: #f4f4f4;
    // display: flex;
    font-size: 14px;
    line-height: 20px;
    padding: 0 0 20px 0;
    box-sizing: border-box;
    overflow: auto;
    .iconbox {
      width: 100%;
      margin-top: 10px;
      .iconTitle {
        background-color: #e4e8f1;
        padding: 3px 5px;
        // margin-bottom: 10px;
      }
      ul {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        padding: 0 0 10px 0;
        // justify-content: space-around;
        li {
          //   width: 90px;
          border: 1px solid #e4e8f1;
          font-size: 12px;
          padding: 10px 5px;
          line-height: 26px;
          margin-left: 20px;
          margin-top: 10px;
          .iconChose {
            display: flex;
            justify-content: space-around;
            .uncheckIcon {
              width: 50%;
              display: flex;
              flex-direction: column;
              align-items: center;
              img {
                width: 32px;
                height: 32px;
                border: 1px solid red;
              }
            }
            .checkIcon {
              width: 50%;
              width: 50%;
              display: flex;
              flex-direction: column;
              align-items: center;
              img {
                width: 32px;
                height: 32px;
                border: 1px solid red;
              }
            }
          }
          .iconDelete {
            line-height: 30px;
            display: flex;
            justify-content: center;
            .el-icon-delete {
              font-size: 20px;
            }
          }
        }
        .uploadIcon {
          width: 90px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 30px;
        }
      }
    }
  }
}
</style>