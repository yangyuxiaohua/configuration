<template>
  <div class="editAreaWrapper">
    <div class="title">
      <Title>
        <template #TitleBox>用户管理</template>
      </Title>
    </div>
    <div class="editAreaContainer">
      <div class="left">
        <div class="donotkonw"></div>
        <div class="searchProject">
          <el-input placeholder="请输入内容" v-model="searchProject" clearable size="small">
          </el-input>
          <el-button size="mini" type="primary">搜索</el-button>
        </div>
        <div class="projects">
          <div class="projectInfor">
            <div class="project">
              <span class="projectName">红河项目</span>
              <span>创建时间：
                <span>2019-02-09</span>
              </span>
            </div>
            <div class="projecttTime">
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
          <div class="projectPaging">
            <el-pagination background layout="prev, pager, next" :total="projectTotal" :pager-count='projectPagingCount'>
            </el-pagination>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="userScreening">
          <div class="enterpriseTypeWrapper">
            <div class="enterpriseType">
              <span :class="{'currentEnterpriseType':index==enterpriseTypeNum}" @click='checkedEnterpriseType(index)' v-for="(item,index) in enterpriseTypeList" :key="item">{{item}}</span>
            </div>
            <el-button type="primary">批量导入</el-button>
          </div>
          <div class="roleWrapper">
            <LinePressing>
              <template #line>角色</template>
              <template #container>
                <div class="companyRole">
                  <span class="companyRoleTit">公司角色：</span>
                  <div class="companyRoleContainer">
                    <span v-for="(item,index) in companyRoleList" :key="index" :class="{'checkedRole' : index===currentCompanyRole}" @click="checkedRole(index,'currentCompanyRole')">{{item}}</span>
                  </div>
                </div>
                <div class="projectRole">
                  <span class="projectRoleTit">项目角色：</span>
                  <div class="projectRoleContainer">
                    <span v-for="(item,index) in projectRoleList" :key="index" :class="{'checkedRole' : index===currentProjectRole}" @click="checkedRole(index,'currentProjectRole')">{{item}}</span>
                    <label>+</label>
                  </div>
                </div>
              </template>
            </LinePressing>
          </div>
          <div class="areaWrapper">
            <LinePressing>
              <template #line>区域</template>
              <template #container>
                <div class="screenArea">
                  <span>全国</span>
                  <el-select v-model="value" clearable placeholder="省/直辖市/自治区/特别行政区" class="province">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                  <el-select v-model="value" clearable placeholder="州/市" class="municipal">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                  <el-select v-model="value" clearable placeholder="区/县" class="county">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                  <el-button type="primary">搜索</el-button>
                </div>
                <div class="importForm">
                  <el-checkbox v-model="importFormChecked"></el-checkbox>
                  <el-button type="primary">Excel导入人员信息</el-button>
                  <el-button type="primary">添加服务区域</el-button>
                </div>
              </template>
            </LinePressing>
          </div>
        </div>
        <div class="userList">
          <div class="addUser">
            <el-button type="primary" @click="dialogAdduserFormVisible = true">新增用户</el-button>
            <el-dialog title="新增用户" :visible.sync="dialogAdduserFormVisible">
              <el-form :model="addUserForm">
                <el-form-item label="账号" :label-width="formLabelWidth">
                  <el-input v-model="addUserForm.account" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名" :label-width="formLabelWidth">
                  <el-input v-model="addUserForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="单位名称" :label-width="formLabelWidth">
                  <el-input v-model="addUserForm.logo" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="单位类型" :label-width="formLabelWidth">
                  <el-input v-model="addUserForm.logo" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="项目名称" :label-width="formLabelWidth">
                  <el-input v-model="addUserForm.logo" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="身份证" :label-width="formLabelWidth">
                  <el-input v-model="addUserForm.logo" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色类型" :label-width="formLabelWidth">
                  <el-input v-model="addUserForm.logo" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色名称" :label-width="formLabelWidth">
                  <el-input v-model="addUserForm.logo" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="权限区域" :label-width="formLabelWidth">
                  <el-input v-model="addUserForm.logo" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="常住地址" :label-width="formLabelWidth">
                  <el-input v-model="addUserForm.logo" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="头像" :label-width="formLabelWidth">
                  <el-input v-model="addUserForm.logo" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机" :label-width="formLabelWidth">
                  <el-input v-model="addUserForm.logo" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                  <el-input v-model="addUserForm.logo" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="描述" :label-width="formLabelWidth">
                  <el-input v-model="addUserForm.logo" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAdduserFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureAddUser()">提 交</el-button>
              </div>
            </el-dialog>
            <div class="searchUser">
              <el-input placeholder="搜索用户" prefix-icon="el-icon-search" v-model="userInput">
              </el-input>
              <el-button type="primary" size="small">搜索</el-button>
            </div>
          </div>
          <div class="userInforList">
            <div class="userInfor">
              <div class="userInforHeader">
                <div class="headPortrait"><img src="" alt=""></div>
                <div class="PersonalInformation">
                  <p>张三</p>
                  <p>项目：
                    <span>红河项目</span>
                  </p>
                  <p>角色：
                    <span>项目负责人</span>
                  </p>
                  <p>权限区域：
                    <span>全国</span>
                  </p>
                  <p>手机
                    <span>1235424415</span>
                  </p>
                  <p>创建时间：
                    <span>2019-09-08</span>
                  </p>
                  <p>项目描述： 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目

                  </p>
                </div>
              </div>
              <div class="personalDescription">
              </div>
            </div>
            <div class="userInfor">
              <div class="userInforHeader">
                <div class="headPortrait"><img src="" alt=""></div>
                <div class="PersonalInformation">
                  <p>张三</p>
                  <p>项目：
                    <span>红河项目</span>
                  </p>
                  <p>角色：
                    <span>项目负责人</span>
                  </p>
                  <p>权限区域：
                    <span>全国</span>
                  </p>
                  <p>手机
                    <span>1235424415</span>
                  </p>
                  <p>创建时间：
                    <span>2019-09-08</span>
                  </p>
                  <p>项目描述： 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目

                  </p>
                </div>
              </div>
              <div class="personalDescription">
              </div>
            </div>
            <div class="userInfor">
              <div class="userInforHeader">
                <div class="headPortrait"><img src="" alt=""></div>
                <div class="PersonalInformation">
                  <p>张三</p>
                  <p>项目：
                    <span>红河项目</span>
                  </p>
                  <p>角色：
                    <span>项目负责人</span>
                  </p>
                  <p>权限区域：
                    <span>全国</span>
                  </p>
                  <p>手机
                    <span>1235424415</span>
                  </p>
                  <p>创建时间：
                    <span>2019-09-08</span>
                  </p>
                  <p>项目描述： 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目

                  </p>
                </div>
              </div>
              <div class="personalDescription">
              </div>
            </div>
            <div class="userInfor">
              <div class="userInforHeader">
                <div class="headPortrait"><img src="" alt=""></div>
                <div class="PersonalInformation">
                  <p>张三</p>
                  <p>项目：
                    <span>红河项目</span>
                  </p>
                  <p>角色：
                    <span>项目负责人</span>
                  </p>
                  <p>权限区域：
                    <span>全国</span>
                  </p>
                  <p>手机
                    <span>1235424415</span>
                  </p>
                  <p>创建时间：
                    <span>2019-09-08</span>
                  </p>
                  <p>项目描述： 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目

                  </p>
                </div>
              </div>
              <div class="personalDescription">
              </div>
            </div>
            <div class="userInfor">
              <div class="userInforHeader">
                <div class="headPortrait"><img src="" alt=""></div>
                <div class="PersonalInformation">
                  <p>张三</p>
                  <p>项目：
                    <span>红河项目</span>
                  </p>
                  <p>角色：
                    <span>项目负责人</span>
                  </p>
                  <p>权限区域：
                    <span>全国</span>
                  </p>
                  <p>手机
                    <span>1235424415</span>
                  </p>
                  <p>创建时间：
                    <span>2019-09-08</span>
                  </p>
                  <p>项目描述： 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目

                  </p>
                </div>
              </div>
              <div class="personalDescription">
              </div>
            </div>
            <div class="userInfor">
              <div class="userInforHeader">
                <div class="headPortrait"><img src="" alt=""></div>
                <div class="PersonalInformation">
                  <p>张三</p>
                  <p>项目：
                    <span>红河项目</span>
                  </p>
                  <p>角色：
                    <span>项目负责人</span>
                  </p>
                  <p>权限区域：
                    <span>全国</span>
                  </p>
                  <p>手机
                    <span>1235424415</span>
                  </p>
                  <p>创建时间：
                    <span>2019-09-08</span>
                  </p>
                  <p>项目描述： 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目

                  </p>
                </div>
              </div>
              <div class="personalDescription">
              </div>
            </div>
            <div class="userInfor">
              <div class="userInforHeader">
                <div class="headPortrait"><img src="" alt=""></div>
                <div class="PersonalInformation">
                  <p>张三</p>
                  <p>项目：
                    <span>红河项目</span>
                  </p>
                  <p>角色：
                    <span>项目负责人</span>
                  </p>
                  <p>权限区域：
                    <span>全国</span>
                  </p>
                  <p>手机
                    <span>1235424415</span>
                  </p>
                  <p>创建时间：
                    <span>2019-09-08</span>
                  </p>
                  <p>项目描述： 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目

                  </p>
                </div>
              </div>
              <div class="personalDescription">
              </div>
            </div>
            <div class="userInfor">
              <div class="userInforHeader">
                <div class="headPortrait"><img src="" alt=""></div>
                <div class="PersonalInformation">
                  <p>张三</p>
                  <p>项目：
                    <span>红河项目</span>
                  </p>
                  <p>角色：
                    <span>项目负责人</span>
                  </p>
                  <p>权限区域：
                    <span>全国</span>
                  </p>
                  <p>手机
                    <span>1235424415</span>
                  </p>
                  <p>创建时间：
                    <span>2019-09-08</span>
                  </p>
                  <p>项目描述： 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目 项目
                  </p>
                </div>
              </div>

            </div>

          </div>
          <div class="userInforPaging">
            <el-pagination background layout="prev, pager, next" :total="projectTotal" :pager-count='projectPagingCount'>
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "../../../components/Title";
import LinePressing from "../../../components/LinePressing";
import { getProjects } from "@/apis/user";
import {getKey} from '@/utils/local'
export default {
  components: {
    Title,
    LinePressing
  },
  data() {
    return {
      searchProject: "",
      projectTotal: 90,
      projectCount: "5",
      enterpriseTypeList: ["政企", "维保", "伙伴", "监管"], //企业类型列表
      enterpriseTypeNum: 0, //控制选中的企业类型
      companyRoleList: ["项目经理", "负责人", "法人"], //公司角色
      projectRoleList: ["项目经理", "负责人", "法人"], //项目角色
      currentCompanyRole: 0, //控制选中的公司角色
      currentProjectRole: 0, //控制选中的项目角色
      userInput: "", //搜索用户
      formLabelWidth: "100px", //对话框表格标题名宽度
      dialogAdduserFormVisible: false, //控制新增用户页面显示，隐藏
      addUserForm: {
        //新增用户表单
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎saagajsdasjsjadjaad"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "", //三级联动value
      importFormChecked: true //导入单选
    };
  },
  created() {
    console.log(getKey('userInfor'))
    getProjects({userId:getKey('userInfor').userId})
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  },
  computed: {
    projectPagingCount() {
      return parseInt(this.projectCount);
    }
  },
  methods: {
    checkedEnterpriseType(index) {
      //选择企业类型
      this.enterpriseTypeNum = index;
    },
    checkedRole(index, type) {
      if (type === "currentCompanyRole") {
        this.currentCompanyRole = index;
      } else {
        this.currentProjectRole = index;
      }
    },
    sureAddUser() {
      //确定添加新增用户
      this.dialogAdduserFormVisible = false;
    }
  }
};
</script>

<style lang="less" scoped>
.editAreaWrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .title {
    width: 100%;
    flex: 0 0 56px;
  }
  .editAreaContainer {
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
      .searchProject {
        margin: 20px 0;
        .el-input {
          width: 143px;
        }
        .el-button {
          margin-left: 10px;
        }
      }
      .projects {
        .projectInfor {
          margin-top: 20px;
          box-sizing: border-box;
          background-color: #fff;
          padding: 30px 10px 10px 10px;
          .project {
            display: flex;
            justify-content: space-between;
            .projectName {
              font-size: 18px;
            }
          }
        }
        .projectPaging {
          width: 100%;
          margin-top: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
    .right {
      flex: 1;
      padding: 0 5px;
      .userScreening {
        .enterpriseTypeWrapper {
          display: flex;
          justify-content: space-between;
          padding: 10px 20px;
          .enterpriseType {
            span {
              cursor: pointer;
              display: inline-block;
              padding: 0 15px;
              margin: 0 5px;
              background-color: #fff;
              line-height: 40px;
              height: 40px;
              border-radius: 5px;
            }
            .currentEnterpriseType {
              background-color: #409eff;
            }
          }
        }
        .roleWrapper {
          .companyRole {
            display: flex;
            .companyRoleTit {
              font-size: 16px;
              line-height: 32px;
            }
            .companyRoleContainer {
              span {
                cursor: pointer;
                display: inline-block;
                padding: 5px 10px;
                margin: 0 5px;
                border: 1px solid #e7e7e7;
                border-radius: 5px;
              }
              .checkedRole {
                border: 1px solid #409eff;
              }
            }
          }
          .projectRole {
            display: flex;
            margin-top: 10px;
            .projectRoleTit {
              font-size: 16px;
              line-height: 32px;
            }
            .projectRoleContainer {
              span {
                cursor: pointer;
                display: inline-block;
                padding: 5px 10px;
                margin: 0 5px;
                border: 1px solid #e7e7e7;
                border-radius: 5px;
              }
              label {
                cursor: pointer;
                padding: 5px 10px;
                background-color: #409eff;
                border-radius: 5px;
              }
              .checkedRole {
                border: 1px solid #409eff;
              }
            }
          }
        }
        .areaWrapper {
          .screenArea {
            span {
              display: inline-block;
              border: 1px solid #e4e4e4;
              width: 60px;
              height: 38px;
              line-height: 38px;
              text-align: center;
              background-color: #fff;
              margin: 0 20px 10px 0;
            }
            .province {
              width: 250px;
              margin: 0 20px 10px 0;
            }
            .municipal {
              margin: 0 20px 10px 0;
              width: 100px;
            }
            .county {
              margin: 0 20px 10px 0;
            }
          }
          .importForm {
            .el-button {
              margin: 0 0 0 20px;
            }
          }
        }
      }
      .userList {
        padding: 10px 0;
        position: relative;
        .addUser {
          height: 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .searchUser {
            display: flex;
            align-items: center;
            .el-input {
              margin: 0 10px;
            }
            .el-button {
              height: 35px;
            }
          }
        }
        .userInforList {
          // padding: 20px 10px;
          padding-bottom: 60px;
          display: flex;
          // justify-content: space-around;
          flex-wrap: wrap;
          .userInfor {
            margin: 20px 20px 0 20px;
            padding: 20px 10px 10px 10px;
            width: 210px;
            padding: 10px 10px 20px 10px;
            background-color: #fff;
            box-shadow: 0 2px 2px #888888;
            .userInforHeader {
              display: flex;
              .headPortrait {
                flex: 0 0 30px;
                img {
                  width: 30px;
                  height: 30px;
                }
              }
              .PersonalInformation {
                flex: 1;
              }
            }
          }
        }
        .userInforPaging {
          width: 100%;
          display: flex;
          justify-content: center;
          position: absolute;
          bottom: 20px;
        }
      }
    }
  }
}
</style>