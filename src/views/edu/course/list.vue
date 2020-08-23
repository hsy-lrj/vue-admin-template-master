<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="courseQuery.title" placeholder="课程标题" />
      </el-form-item>

     <el-form-item>
        <el-input v-model="courseQuery.teacherId" placeholder="课程讲师ID" />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="pageCourseCondition()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- 表格 -->
    <el-table :data="list" border fit highlight-current-row>
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">{{ (page - 1) * limit + scope.$index + 1 }}</template>
      </el-table-column>

      <el-table-column prop="teacherId" label="课程讲师ID" width="180" />

      <el-table-column label="课程状态" width="80">
        <template slot-scope="scope">{{ scope.row.level==="Draft"?'未发布':'已发布' }}</template>
      </el-table-column>

      <el-table-column prop="title" label="课程标题" />

      <el-table-column prop="buyCount" label="销售数量" width="100" />

      <el-table-column prop="lessonNum" label="总课时" width="80" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/course/info/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改课程信息</el-button>
          </router-link>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeCourseById(scope.row.id)"
          >删除课程信息</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="pageCourseCondition"
    />
  </div>
</template>
<script>
//引入调用teacher.js文件
import course from "@/api/edu/course.js";
export default {
  //写核心代码的位置
  data() {
    return {
      list: null, //查询结果返回的数据
      page: 1, //当前的页数
      limit: 5, //每页的记录数
      total: 0, //总记录数
      courseQuery:{}//条件封装对象
    };
  },
  created() {
    //页面渲染之前执行，调用methods方法
    this.pageCourseCondition();
  },
  methods: {
    /**
     * 删除方法
     */
    removeCourseById(courseId){
      this.$confirm("此操作将永久删除课程信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        }).then(() => {
        course
          .removeCourseById(courseId)
          .then((response) => {
            //成功
            //提示信息
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.pageCourseCondition();
          })
      });
    },
    /**
     * 课程列表方法
     */
    pageCourseCondition(page = 1) {
      this.page = page;
      course
        .pageCourseCondition(this.page, this.limit,this.courseQuery)
        .then((response) => {
           //请求成功
          //Response接口返回的数据
          this.list = response.data.records;
          this.total = response.data.total;
        })
    },
    /**
     * 清空数据方法
     */
    resetData(){
      this.courseQuery={}
      this.pageCourseCondition()
    }
  },
};
</script>