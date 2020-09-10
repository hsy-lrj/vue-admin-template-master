<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="标题">
        <el-input v-model="banner.name" />
      </el-form-item>
      <el-form-item label="banner排序">
        <el-input-number v-model="banner.sort" controls-position="right" min="0" />
      </el-form-item>
       <!-- banner图片 -->
      <el-form-item label="banner图片">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API+'/eduoss/fileoss/upload'"
          class="avatar-uploader"
        >
          <img :src="courseInfo.cover" />
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
//引入调用teacher.js文件
import banner from "@/api/edu/banner.js";
import ImageCropper from "@/components/ImageCropper";
import PanThumb from "@/components/PanThumb";
export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      banner: {
        title: "",
        sort: 0,
        imageUrl: 1,
        linkUrl: "",
      },
      BASE_API: process.env.BASE_API, // 接口API地址
      imagecropperShow: false, // 是否显示上传组件
      imagecropperKey: 0, // 上传组件id
      saveBtnDisabled: false, // 保存按钮是否禁用,
    };
  },
  created() {
    this.init();
  },
  watch: {
    $route(to, from) {
      //表示路由变化的方式，当路由变化，方法就会执行
      this.init();
    },
  },
  methods: {
    //关闭弹窗
    close() {
      this.imagecropperShow = false;
      //关闭弹窗后让唯一标识加1
      this.imagecropperKey=this.imagecropperKey+1
    },
    //更换成功
    cropSuccess(data) {  
      this.imagecropperShow = false;
      this.teacher.avatar = data.url;
      this.imagecropperKey=this.imagecropperKey+1
    },
    init() {
      //路径中有id
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id;
        this.getTeacherInfo(id);
      } else {
        //路径中没有id
        this.teacher = {};
      }
    },
    saveOrUpdate() {
      this.saveBtnDisabled = true;
      //根据teacher中是否有id进行判断是修改还是添加
      if (this.teacher.id) {
        //修改
        this.updateTeacher();
      } else {
        //添加
        this.saveData();
      }
    },
    /**
     * 保存方法
     */
    saveData() {
      teacher.saveTeacher(this.teacher).then((response) => {
        //成功
        //提示信息
        this.$message({
          type: "success",
          message: "添加成功!",
        });
        //回到列表页面  路由跳转
        this.$router.push({ path: "/teacher/list" });
      });
    },
    /**
     * 回写方法
     */
    getTeacherInfo(id) {
      teacher.getTeacherInfo(id).then((response) => {
        this.teacher = response.data.teacher;
      });
    },
    /**
     * 修改方法
     */
    updateTeacher() {
      teacher.updateTeacher(this.teacher).then((response) => {
        //提示信息
        this.$message({
          type: "success",
          message: "修改成功!",
        });
        //回到列表页面  路由跳转
        this.$router.push({ path: "/teacher/list" });
      });
    },
     //上传成功的方法
    handleAvatarSuccess(rep, file) {
      this.courseInfo.cover = rep.data.url;
    },
    //上传之前的方法
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
    },
  },
};
</script>