<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">闪购</el-breadcrumb-item>
      <el-breadcrumb-item>闪购商品</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="formInline" class="user-search">
      <!-- <el-form-item label="搜索：">
        <el-input size="small" v-model="formInline.id" placeholder="请输入id"></el-input>
      </el-form-item> -->
      <el-form-item>
        <!-- <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button> -->
        <el-button size="small" type="primary" icon="el-icon-plus" @click="handleEdit()">添加</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table size="small" :data="listData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
      <!-- <el-table-column align="center" type="selection" width="60">
      </el-table-column> -->
      <el-table-column sortable prop="productId" label="商品id" width="80">
      </el-table-column>
      <el-table-column sortable prop="flashPromotionSessionId" label="编号" width="120">
      </el-table-column>
      <el-table-column sortable prop="flashPromotionId" label="闪购促销id" width="120">
      </el-table-column>
      <el-table-column sortable prop="flashPromotionPrice" label="限时购价格" width="120">
      </el-table-column>
      <el-table-column sortable prop="flashPromotionCount" label="限时购数量" width="120">
      </el-table-column>
      <el-table-column sortable prop="flashPromotionLimit" label="每人限购数量" width="120">
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="300">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
    <!-- 编辑界面 -->
    <el-dialog :title="title" :visible.sync="editFormVisible" width="30%" @click="closeDialog">
      <el-form label-width="120px" :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="商品id" prop="productId">
          <el-input size="small" type="number" v-model="editForm.productId" auto-complete="off" placeholder="请输入商品id"></el-input>
        </el-form-item>
        <el-form-item label="编号" prop="flashPromotionSessionId">
          <el-input size="small" type="number" v-model="editForm.flashPromotionSessionId" auto-complete="off" placeholder="请输入编号"></el-input>
        </el-form-item>
        <el-form-item label="闪购促销id" prop="flashPromotionId">
          <el-input size="small" type="number" v-model="editForm.flashPromotionId" auto-complete="off" placeholder="请输入闪购促销id"></el-input>
        </el-form-item>
        <el-form-item label="限时购价格" prop="flashPromotionPrice">
          <el-input size="small" min=0 type="number" v-model="editForm.flashPromotionPrice" auto-complete="off" placeholder="请输入限时购价格"></el-input>
        </el-form-item>
        <el-form-item label="限时购数量" prop="flashPromotionCount">
          <el-input size="small" min=0 type="number" v-model="editForm.flashPromotionCount" auto-complete="off" placeholder="请输入限时购数量"></el-input>
        </el-form-item>
        <el-form-item label="每人限购数量" prop="flashPromotionLimit">
          <el-input size="small" min=0 type="number" v-model="editForm.flashPromotionLimit" auto-complete="off" placeholder="请输入每人限购数量"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitForm('editForm')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getGoodsList,addGoods,delGoods, editGoods,getOne } from '../../api/goods'
import Pagination from '../../components/Pagination'
export default {
  data() {
    return {
      nshow: true, //switch开启
      fshow: false, //switch关闭
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      title: '添加',
      editForm: {
        id:null,
        productId:0,
        flashPromotionSessionId:0,
        flashPromotionId:0,
        flashPromotionPrice:0,
        flashPromotionCount:0,
        flashPromotionLimit:0
      },
      // rules表单验证
      rules: {
        // dealerShortName: [
        //   { required: true, message: '请输入经销商名称', trigger: 'blur' }
        // ],
        // dealerCode: [{ required: true, message: '请输入经销商代码', trigger: 'blur' }]
      },
      //搜索条件
      formInline: {
        current: 1,
        size: 10,
      },
      listData: [], //用户数据
      // 分页参数
      pageparm: {
        current: 1,
        size: 10,
        total: 10
      }
    }
  },
  // 注册组件
  components: {
    Pagination
  },
  /**
   * 数据发生改变
   */

  /**
   * 创建完毕
   */
  created() {
    this.getdata(this.formInline)
    // console.log('页面创建完成');
  },

  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {
    getdata(parameter) {
      getGoodsList(parameter).then(res=>{
        console.log('打印响应')
        console.log(res);
        this.listData = res.data.page.records
        this.pageparm.total = res.data.page.total
       
      }).catch(err=>{
        console.log(err)
      })
      this.pageparm.current = this.formInline.page
      this.pageparm.size = this.formInline.size
    },
    // 分页插件事件
    callFather(parm) {
      if(!parm.pageSize){
        parm.pageSize=10
      }
      this.formInline.current = parm.currentPage
      this.formInline.size = parm.pageSize
      this.getdata(this.formInline)
    },
    // 搜索事件
    search() {
      console.log('点击了搜索?');
      if(this.formInline.id){
        getOne(this.formInline.id).then(res=>{
        console.log('打印响应体de ');
        console.log(res);
      })
      }else{
        this.getdata(this.formInline)
      }
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      console.log('点击编辑')
      console.log(row);
      this.editFormVisible = true
      if (row != undefined && row != 'undefined') {
        this.title = '修改'
        this.editForm.id = row.id
        this.editForm.productId = row.productId
        this.editForm.flashPromotionSessionId = row.flashPromotionSessionId
        this.editForm.flashPromotionId = row.flashPromotionId
        this.editForm.flashPromotionPrice = row.flashPromotionPrice
        this.editForm.flashPromotionCount = row.flashPromotionCount
        this.editForm.flashPromotionLimit = row.flashPromotionLimit
      } 
      else {
        this.title = '添加'
        this.editForm.productId = ''
        this.editForm.flashPromotionSessionId = ''
        this.editForm.flashPromotionId ='' 
        this.editForm.flashPromotionPrice = ''
        this.editForm.flashPromotionCount = ''
        this.editForm.flashPromotionLimit = ''
      }
    },
    // 编辑、增加页面保存方法
    submitForm(editData) {
      console.log('保存方法');
      console.log(this.editForm)
      this.$refs[editData].validate(valid => {
        if (valid) {
          if(this.editForm.id){
            editGoods(this.editForm)
            .then(res => {
              this.editFormVisible = false
              this.loading = false
              if (res.code==1) {
                this.getdata(this.formInline)
                this.$message({
                  type: 'success',
                  message: '修改成功！'
                })
              } else {
                this.$message({
                  type: 'info',
                  message: res.msg
                })
              }
            })
            .catch(err => {
              this.editFormVisible = false
              this.loading = false
              this.$message.error('修改失败，请稍后再试！')
            })
          }else{
            addGoods(this.editForm)
            .then(res => {
              this.editFormVisible = false
              this.loading = false
              if (res.code==1) {
                this.getdata(this.formInline)
                this.$message({
                  type: 'success',
                  message: '保存成功！'
                })
              } else {
                this.$message({
                  type: 'info',
                  message: res.msg
                })
              }
            })
            .catch(err => {
              this.editFormVisible = false
              this.loading = false
              this.$message.error('保存失败，请稍后再试！')
            })
          }
       
        } else {
          return false
        }
      })
    },
    // 删除公司
    deleteUser(index, row) {
      console.log('删除数据?')
      console.log(row)
      this.$confirm('确定要删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delGoods({id:row.id})
            .then(res => {
              console.log('打印删除响应体',res)
              if (res.code==1) {
                this.$message({
                  type: 'success',
                  message: '已删除!'
                })
                this.getdata(this.formInline)
              } else {
                this.$message({
                  type: 'info',
                  message: res.msg
                })
              }
            })
            .catch(err => {
              this.loading = false
              this.$message.error('删除失败，请稍后再试！')
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 关闭编辑、增加弹出框
    closeDialog() {
      this.editFormVisible = false
    }
  }
}
</script>

<style scoped>
.user-search {
  margin-top: 20px;
}
.userRole {
  width: 100%;
}
</style>

 
 