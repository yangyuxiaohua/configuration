<template>
    <div class="resourceWrapper">
        <div class="title">
            <Title>
                <template #TitleBox>资源管理</template>
            </Title>
        </div>
        <div class="resourceContainer">
            <div class="left">
                <div class="searchSystem">
                    <el-input placeholder="请输入内容" v-model="searchSystem" clearable size="small">
                    </el-input>
                    <el-button size="mini" type="primary">搜索</el-button>
                    <!-- <el-button size="mini" type="primary">新增系统</el-button> -->
                    <el-button size="mini" type="primary" @click="dialogSystemFormVisible = true">新增系统</el-button>
                    <el-dialog title="新增系统" :visible.sync="dialogSystemFormVisible">
                        <el-form :model="systemForm">
                            <el-form-item label="系统名称" :label-width="formLabelWidth">
                                <el-input v-model="systemForm.name" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="系统标识" :label-width="formLabelWidth">
                                <el-input v-model="systemForm.logo" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogSystemFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click="sureSystem()">确 定</el-button>
                        </div>
                    </el-dialog>

                </div>
                <div class="systems">
                    <div class="systemInfor">
                        <div class="system">
                            <span class="systemName">红河项目</span>
                            <span>创建时间：
                                <span>2019-02-09</span>
                            </span>
                        </div>
                        <div class="systemTime">
                            使用期限：
                            <span>2年</span>
                        </div>
                        <div class="owner">业主单位：
                            <span></span>
                        </div>
                        <div class="maintenance">维保单位：
                            <span></span>
                        </div>
                        <div class="regulatory">监管单位：
                            <span></span>
                        </div>
                        <div class="partner">伙伴单位：
                            <span></span>
                        </div>
                    </div>
                    <div class="systemInfor">
                        <div class="system">
                            <span class="systemName">红河项目</span>
                            <span>创建时间：
                                <span>2019-02-09</span>
                            </span>
                        </div>
                        <div class="systemTime">
                            使用期限：
                            <span>2年</span>
                        </div>
                        <div class="owner">业主单位：
                            <span></span>
                        </div>
                        <div class="maintenance">维保单位：
                            <span></span>
                        </div>
                        <div class="regulatory">监管单位：
                            <span></span>
                        </div>
                        <div class="partner">伙伴单位：
                            <span></span>
                        </div>
                    </div>
                    <div class="systemInfor">
                        <div class="system">
                            <span class="systemName">红河项目</span>
                            <span>创建时间：
                                <span>2019-02-09</span>
                            </span>
                        </div>
                        <div class="systemTime">
                            使用期限：
                            <span>2年</span>
                        </div>
                        <div class="owner">业主单位：
                            <span></span>
                        </div>
                        <div class="maintenance">维保单位：
                            <span></span>
                        </div>
                        <div class="regulatory">监管单位：
                            <span></span>
                        </div>
                        <div class="partner">伙伴单位：
                            <span></span>
                        </div>
                    </div>
                    <div class="systemInfor">
                        <div class="system">
                            <span class="systemName">红河项目</span>
                            <span>创建时间：
                                <span>2019-02-09</span>
                            </span>
                        </div>
                        <div class="systemTime">
                            使用期限：
                            <span>2年</span>
                        </div>
                        <div class="owner">业主单位：
                            <span></span>
                        </div>
                        <div class="maintenance">维保单位：
                            <span></span>
                        </div>
                        <div class="regulatory">监管单位：
                            <span></span>
                        </div>
                        <div class="partner">伙伴单位：
                            <span></span>
                        </div>
                    </div>

                    <div class="systemPaging">
                        <el-pagination background layout="prev, pager, next" :total="projectTotal" :pager-count='projectPagingCount'>
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="addResource">
                    <el-button size="mini" type="primary" @click="dialogResourceFormVisible = true">添加资源</el-button>
                    <el-dialog title="新增资源" :visible.sync="dialogResourceFormVisible">
                        <el-form :model="resourceForm">
                            <el-form-item label="系统" :label-width="formLabelWidth">
                                <el-select v-model="resourceForm.region" placeholder="请选择系统">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="资源名称" :label-width="formLabelWidth">
                                <el-input v-model="resourceForm.name" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="url地址" :label-width="formLabelWidth">
                                <el-input v-model="resourceForm.logo" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="图标" :label-width="formLabelWidth">
                                <el-input v-model="resourceForm.icon" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogResourceFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click="sureResource()">确 定</el-button>
                        </div>
                    </el-dialog>
                </div>
                <div class="tableWrapper">
                    <el-table :data="tableData" stripe style="width: 100%">
                        <el-table-column prop="system" label="系统" width="100">
                        </el-table-column>
                        <el-table-column prop="resource" label="资源名称" width="100">
                        </el-table-column>
                        <el-table-column prop="url" label="url地址">
                        </el-table-column>
                        <el-table-column prop="icon" label="图标">
                        </el-table-column>
                        <el-table-column prop="address" label="操作">
                            <template slot-scope="scope">
                                <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" type="primary">修改</el-button> -->
                                <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                                <el-dialog title="修改资源" :visible.sync="dialogResourceFormModifyVisible">
                                    <el-form :model="resourceForm">
                                        <el-form-item label="系统" :label-width="formLabelWidth">
                                            <el-select v-model="resourceForm.region" placeholder="请选择系统">
                                                <el-option label="区域一" value="shanghai"></el-option>
                                                <el-option label="区域二" value="beijing"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="资源名称" :label-width="formLabelWidth">
                                            <el-input v-model="resourceForm.name" autocomplete="off"></el-input>
                                        </el-form-item>
                                        <el-form-item label="url地址" :label-width="formLabelWidth">
                                            <el-input v-model="resourceForm.logo" autocomplete="off"></el-input>
                                        </el-form-item>
                                        <el-form-item label="图标" :label-width="formLabelWidth">
                                            <el-input v-model="resourceForm.icon" autocomplete="off"></el-input>
                                        </el-form-item>
                                    </el-form>
                                    <div slot="footer" class="dialog-footer">
                                        <el-button @click="dialogResourceFormModifyVisible = false">取 消</el-button>
                                        <el-button type="primary" @click="sureModify()">确 定</el-button>
                                    </div>
                                </el-dialog>
                                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                            </template>
                            <!-- <el-button prop='id' size="mini" type="primary" @click='modify(id)'>修改</el-button>
                            <el-button size="mini" type="primary">删除</el-button> -->
                        </el-table-column>
                    </el-table>

                </div>
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
      searchSystem: "",
      projectTotal: 90,
      projectPagingCount: 5,
      tableData: [
        {
          id: 1,
          system: "火灾自动报警系统",
          resource: "资源管理",
          url: "/sksaf/sdjas/skjsak/sjhd",
          icon: "hdjassdbsja"
        },
        {
          id: 2,
          system: "火灾自动报警系统",
          resource: "资源管理",
          url: "/sksaf/sdjas/skjsak/sjhd",
          icon: "hdjassdbsja"
        },
        {
          id: 3,
          system: "火灾自动报警系统",
          resource: "资源管理",
          url: "/sksaf/sdjas/skjsak/sjhd",
          icon: "hdjassdbsja"
        },
        {
          id: 4,
          system: "火灾自动报警系统",
          resource: "资源管理",
          url: "/sksaf/sdjas/skjsak/sjhd",
          icon: "hdjassdbsja"
        }
      ],
      //增加系统对话框
      systemForm: {
        name: "",
        logo: ""
      },
      dialogSystemFormVisible: false,
      formLabelWidth: "100px",
      //增加资源对话框
      dialogResourceFormVisible: false,
      resourceForm: {
        region: "", //下拉框value
        name: "",
        logo: "",
        icon: ""
      },
      //修改资源对话框
      dialogResourceFormModifyVisible: false
    };
  },
  methods: {
    //资源表格操作按钮
    handleEdit(a, b) {
      console.log(a);
      console.log(b);
      this.dialogResourceFormModifyVisible =
        this.dialogResourceFormModifyVisible == false ? true : false;
    },
    //确定修改
    sureModify(){
      console.log(this.resourceForm.icon)
        this.dialogResourceFormModifyVisible = false
    },
    handleDelete(a, b) {
      console.log(a, b);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //增加系统确定函数
    sureSystem() {
      this.dialogSystemFormVisible = false;
      console.log(this.form);
    },
    // 增加资源确定函数
    sureResource() {
      this.dialogResourceFormVisible = false;
      console.log(this.resourceForm.region);
    }
  }
};
</script>

<style lang="less" scoped>
.resourceWrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .title {
    width: 100%;
    flex: 0 0 56px;
  }
  .resourceContainer {
    flex: 1;
    width: 100%;
    background-color: #f4f4f4;
    display: flex;
    font-size: 14px;
    line-height: 20px;
    .left {
      flex: 0 0 370px;
      padding: 0 10px;
      border: 1px solid #e7e7e7;
      .searchSystem {
        margin: 20px 0;
        .el-input {
          width: 143px;
        }
        .el-button {
          margin-left: 10px;
        }
      }
      .systems {
        .systemInfor {
          margin-top: 20px;
          box-sizing: border-box;
          background-color: #fff;
          padding: 30px 10px 10px 10px;
          .system {
            display: flex;
            justify-content: space-between;
            .systemName {
              font-size: 18px;
            }
          }
        }
        .systemPaging {
          margin-top: 20px;
          display: flex;
          .el-pagination {
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
    .right {
      flex: 1;
      padding: 20px 10px;
      box-sizing: border-box;
      .addResource {
        width: 100%;
        height: 52px;
        display: flex;
        align-items: center;
      }
      .tableWrapper {
        width: 100%;
        .el-table__header {
          padding: 0 !important;
        }
        .cell {
          text-align: center;
        }
      }
    }
  }
}
</style>