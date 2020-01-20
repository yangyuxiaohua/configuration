<template>
    <!-- Dtu管理 -->
    <div class="unitWrapper">
        <div class="title">
            <Title>
                <template #TitleBox>设备管理</template>
            </Title>
        </div>
        <div class="unitContainer">
            <div class="left">
                <div class="searchUnit">
                    <el-input placeholder="请输入内容" v-model="searchUnit" clearable size="small">
                    </el-input>
                    <el-button size="mini" type="primary">搜索</el-button>
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
                <div class="addEquip">
                    <el-button type="primary">批量导入</el-button>
                    <el-button type="primary">增加设备</el-button>
                </div>
                <div class="equipments">
                    <el-table :data="tableData" stripe style="width: 100%">
                        <el-table-column prop="system" label="设备名称">
                        </el-table-column>
                        <el-table-column prop="resource" label="项目名称">
                        </el-table-column>
                        <el-table-column prop="url" label="地址码">
                        </el-table-column>
                        <el-table-column prop="icon" label="厂商">
                        </el-table-column>
                        <el-table-column prop="icon" label="设备类型">
                        </el-table-column>
                        <el-table-column prop="icon" label="物联系统">
                        </el-table-column>
                        <el-table-column prop="icon" label="生产时间/创建时间/到期寿命">
                        </el-table-column>
                        <el-table-column prop="icon" label="型号">
                        </el-table-column>
                        <el-table-column prop="icon" label="管理区域">
                        </el-table-column>
                        <el-table-column prop="address" label="操作">
                            <template slot-scope="scope">

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
      //企业类型选择
      enterpriseTypeNum: 0,
      enterpriseTypeList: ["政企", "维保", "伙伴", "监管"],
      searchUnit: "", //搜索单位
      unitTotal: 90, //单位分页总数
      unitPagingCount: 5, //单位分页显示页码数
      //控制新增单位
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
      //设备数据
      tableData: []
    };
  },
  methods: {}
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
      .addEquip {
        padding: 0 0 0 20px;
      }
      .equipments {
        margin-top: 13px;
      }
    }
  }
}
</style>
