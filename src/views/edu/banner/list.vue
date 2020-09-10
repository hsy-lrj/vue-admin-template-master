<template>
  <div class="app-container">
    <!-- 表格 -->
    <el-table :data="list" border fit highlight-current-row>
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">{{ (page - 1) * limit + scope.$index + 1 }}</template>
      </el-table-column>

      <el-table-column prop="title" label="标题" width="80" />

      <el-table-column prop="imageUrl" label="图片地址" width="217" />

      <el-table-column label="图片" width="100" 
      v-for="(item,index) in list" 
      v-if="index == 0"
      :key="index">
        <template slot-scope="scope">
          <img :src="scope.row.imageUrl" width="100" height="100" class="head_pic" />
        </template>
      </el-table-column>

      <el-table-column prop="linkUrl" label="链接地址" width="190" />

      <el-table-column prop="sort" label="排序" width="60" />

      <el-table-column prop="gmtCreate" label="创建时间" width="190" />

      <el-table-column prop="gmtModified" label="更新时间" width="190" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/teacher/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="remove(scope.row.id)"
          >删除</el-button>
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
      @current-change="getTeacherListPage"
    />
  </div>
</template>
<script>
//引入调用teacher.js文件
import banner from "@/api/edu/banner.js";
export default {
  //写核心代码的位置
  data() {
    return {
      list: null, //查询结果返回的数据
      page: 1, //当前的页数
      limit: 3, //每页的记录数
      total: 0, //总记录数
    };
  },
  created() {
    //页面渲染之前执行，调用methods方法
    this.pageBanner();
  },
  methods: {
    /**
     * banner列表方法
     */
    pageBanner(page = 1) {
      this.page = page;
      banner
        .pageBanner(this.page, this.limit)
        .then((response) => {
          //请求成功
          //Response接口返回的数据
          this.list = response.data.items;
          this.total = response.data.total;
          console.log(this.list);
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },

    /**
     * 删除banner
     */
    remove(id) {
      this.$confirm("此操作将永久删除讲师记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        banner.remove(id).then((response) => {
          //成功
          //提示信息
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.pageBanner();
        });
      });
    },
  },
};
</script>