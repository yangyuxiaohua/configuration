<template>
    <div class="unitWrapper">
        <div class="title">
            <Title>
                <template #TitleBox>资源管理</template>
            </Title>
        </div>
        <div class="unitContainer">
            <div class="left">
                <div class="enterpriseType">
                    <span :class="{'currentEnterpriseType':index==enterpriseTypeNum}" @click='checkedEnterpriseType(index)' v-for="(item,index) in enterpriseTypeList" :key="item">{{item}}</span>
                </div>
                <div class="searchUnit">
                    <el-input placeholder="请输入内容" v-model="searchUnit" clearable size="small">
                    </el-input>
                    <el-button size="mini" type="primary">搜索</el-button>
                    <!-- <el-button size="mini" type="primary">新增系统</el-button> -->
                    <el-button size="mini" type="primary" @click="dialogUnitFormVisible = true">新增单位</el-button>
                    <el-dialog title="新增单位" :visible.sync="dialogUnitFormVisible">
                        <el-form :model="unitForm">
                            <el-form-item label="单位名称" :label-width="formLabelWidth">
                                <el-input v-model="unitForm.name" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="单位类型" :label-width="formLabelWidth">
                                <el-input v-model="unitForm.type" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="单位简介" :label-width="formLabelWidth">
                                <el-input v-model="unitForm.inntroduction" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱" :label-width="formLabelWidth">
                                <el-input v-model="unitForm.email" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="联系方式" :label-width="formLabelWidth">
                                <el-input v-model="unitForm.phone" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogUnitFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click="sureUnit()">确 定</el-button>
                        </div>
                    </el-dialog>

                </div>
                <div class="units">
                    <div class="unitBox">
                        <div class="unit" v-for="(item,index) in unitList" :key="index">
                            <div class="unitInfor">
                                <span class="unitName">{{item.name}}</span>
                                <span class="CreateTime">创建时间：
                                    <span>{{item.CreateTime}}</span>
                                </span>
                            </div>
                            <div class="timeLength">
                                <span>{{item.timeLength}}</span>
                            </div>
                            <div class="unitDescribe">
                                <span>{{item.discripition}}</span>
                            </div>
                        </div>
                    </div>

                    <div class="systemPaging">
                        <el-pagination background layout="prev, pager, next" :total="unitTotal" :pager-count='unitPagingCount'>
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="addArea">
                    <el-button type="primary" @click="dialogAreaFormVisible = true">新增区域</el-button>
                    <el-dialog title="新增区域" :visible.sync="dialogAreaFormVisible">
                        <el-form :model="areaForm">
                            <el-form-item label="业主单位" :label-width="formLabelWidth">
                                <el-input v-model="areaForm.owner" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="区域名称" :label-width="formLabelWidth">
                                <el-input v-model="areaForm.name" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="维保单位" :label-width="formLabelWidth">
                                <el-input v-model="areaForm.maintenance" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="本地服务器ip" :label-width="formLabelWidth">
                                <el-input v-model="areaForm.local" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="监控中心ip" :label-width="formLabelWidth">
                                <el-input v-model="areaForm.monitor" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogAreaFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click="sureArea()">确 定</el-button>
                        </div>
                    </el-dialog>

                </div>
                <div class="areas">
                    <div class="areaList">
                        <div class="area" v-for="(item,index) in areaList" :key="index">
                            <p class="areaName">{{item.name}}</p>
                            <p>创建时间：{{item.createTime}}</p>
                            <p class="operation">
                                <el-button type="primary" icon="el-icon-edit" circle size='mini' @click="dialogAreaModifyFormVisible = true"></el-button>
                                <el-dialog title="修改区域" :visible.sync="dialogAreaModifyFormVisible">
                                    <el-form :model="areaModifyForm">
                                        <el-form-item label="业主单位" :label-width="formLabelWidth">
                                            <el-input v-model="areaModifyForm.owner" autocomplete="off"></el-input>
                                        </el-form-item>
                                        <el-form-item label="区域名称" :label-width="formLabelWidth">
                                            <el-input v-model="areaModifyForm.name" autocomplete="off"></el-input>
                                        </el-form-item>
                                        <el-form-item label="维保单位" :label-width="formLabelWidth">
                                            <el-input v-model="areaModifyForm.maintenance" autocomplete="off"></el-input>
                                        </el-form-item>
                                        <el-form-item label="本地服务器ip" :label-width="formLabelWidth">
                                            <el-input v-model="areaModifyForm.local" autocomplete="off"></el-input>
                                        </el-form-item>
                                        <el-form-item label="监控中心ip" :label-width="formLabelWidth">
                                            <el-input v-model="areaModifyForm.monitor" autocomplete="off"></el-input>
                                        </el-form-item>
                                    </el-form>
                                    <div slot="footer" class="dialog-footer">
                                        <el-button @click="dialogAreaModifyFormVisible = false">取 消</el-button>
                                        <el-button type="primary" @click="sureModifyArea()">确 定</el-button>
                                    </div>
                                </el-dialog>

                                <el-button type="danger" icon="el-icon-delete" circle size='mini' @click="delateArea(item.name)"></el-button>
                            </p>
                        </div>
                    </div>
                    <div class="areaPaging">
                        <el-pagination background layout="prev, pager, next" :total="areaTotal" :pager-count='unitPagingCount'>
                        </el-pagination>
                    </div>
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
      //企业类型选择
      enterpriseTypeNum: 0,
      enterpriseTypeList: ["政企", "维保", "伙伴", "监管"],
      searchUnit: "", //搜索单位
      unitTotal: 90, //单位分页总数
      unitPagingCount: 5, //单位分页显示页码数
      //控制新增单位
      dialogUnitFormVisible: false,
      formLabelWidth: "100px", //对话框宽
      unitForm: {
        name: "",
        type: "",
        inntroduction: "",
        email: "",
        phone: ""
      },
      unitList: [
        {
          name: "业主单位",
          CreateTime: "2017-02-01",
          timeLength: "2年",
          discripition: "asdsjancbcxmbcbc"
        },
        {
          name: "业主单位",
          CreateTime: "2017-02-01",
          timeLength: "2年",
          discripition: "asdsjancbcxmbcbc"
        },
        {
          name: "业主单位",
          CreateTime: "2017-02-01",
          timeLength: "2年",
          discripition: "asdsjancbcxmbcbc"
        },
        {
          name: "业主单位",
          CreateTime: "2017-02-01",
          timeLength: "2年",
          discripition: "asdsjancbcxmbcbc"
        }
      ],
      //新增区域
      dialogAreaFormVisible: false,
      areaForm: {
        owner: "",
        name: "",
        maintenance: "",
        local: "",
        monitor: ""
      },
      areaList: [
        { name: "洪河供电局", createTime: "2018-08-02" },
        { name: "洪河供电局", createTime: "2018-08-02" },
        { name: "洪河供电局", createTime: "2018-08-02" },
        { name: "洪河供电局", createTime: "2018-08-02" },
        { name: "洪河供电局", createTime: "2018-08-02" },
        { name: "洪河供电局", createTime: "2018-08-02" },
        { name: "洪河供电局", createTime: "2018-08-02" },
        { name: "洪河供电局", createTime: "2018-08-02" },
        { name: "洪河供电局", createTime: "2018-08-02" },
        { name: "洪河供电局", createTime: "2018-08-02" },
        { name: "洪河供电局", createTime: "2018-08-02" },
        { name: "洪河供电局", createTime: "2018-08-02" },
        { name: "洪河供电局", createTime: "2018-08-02" },
        { name: "洪河供电局", createTime: "2018-08-02" },
        { name: "洪河供电局", createTime: "2018-08-02" },
        { name: "洪河供电局", createTime: "2018-08-02" }
      ], //区域列表
      areaTotal: 900, //区域分页总数
      //修改区域
      dialogAreaModifyFormVisible: false,
      areaModifyForm: {
        name: "",
        type: "",
        inntroduction: "",
        email: "",
        phone: ""
      }
    };
  },
  methods: {
    //切换企业类型
    checkedEnterpriseType(index) {
      this.enterpriseTypeNum = index;
    },
    //增加单位的确定修改
    sureUnit() {
      console.log(this.unitForm);
      this.dialogUnitFormVisible = false;
    },
    // 增加区域确定函数
    sureArea() {
      this.dialogAreaFormVisible = false;
      console.log(this.areaForm);
    },
    //删除区域
    delateArea(name) {
      console.log(111, name);
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
    //修改区域
    sureModifyArea() {
      this.dialogAreaModifyFormVisible = false;
      console.log(this.areaModifyForm);
    }
  }
};
</script>

<style lang="less" scoped>
.unitWrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .title {
    width: 100%;
    flex: 0 0 56px;
  }
  .unitContainer {
    flex: 1;
    width: 100%;
    background-color: #f4f4f4;
    display: flex;
    font-size: 14px;
    line-height: 20px;
    .left {
      .enterpriseType {
        margin: 20px 0 0 0;
        span {
          display: inline-block;
          padding: 0 15px;
          margin: 0 5px;
          background-color: #fff;
          line-height: 40px;
          height: 40px;
        }
        .currentEnterpriseType {
          background-color: #409eff;
        }
      }
      flex: 0 0 370px;
      padding: 0 10px;
      border: 1px solid #e7e7e7;
      .searchUnit {
        margin: 20px 0;
        .el-input {
          width: 143px;
        }
        .el-button {
          margin-left: 10px;
        }
        .el-dialog {
          .el-input {
            width: 80%;
          }
        }
      }
      .units {
        .unitBox {
          .unit {
            margin-top: 20px;
            box-sizing: border-box;
            background-color: #fff;
            padding: 30px 10px 10px 10px;
          }
        }
      }
      .systemPaging {
        margin-top: 20px;
      }
    }
    .right {
      flex: 1;
      padding: 20px 10px;
      box-sizing: border-box;
      .areas {
        .areaList {
          .area {
            display: inline-block;
            margin: 20px 20px 0 20px;
            padding: 20px 10px 10px 10px;
            width: 210px;
            padding: 10px;
            background-color: #fff;
            box-shadow: 0 2px 2px #888888;
            p {
              line-height: 20px;
            }
            .areaName {
              font-size: 20px;
              line-height: 30px;
            }
            .operation {
              padding: 10px 0;
              display: flex;
              justify-content: flex-end;
            }
          }
        }
        .areaPaging {
          padding: 20px 0;
          display: flex;
          justify-content: center;
        }
      }
    }
  }
}
</style>