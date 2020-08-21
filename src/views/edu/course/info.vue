<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="最终发布" />
    </el-steps>

    <el-form label-width="120px">
      <el-form-item label="课程标题">
        <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写" />
      </el-form-item>

      <!-- 所属分类 TODO -->
      <el-form-item label="课程分类">
        <!-- 一级分类 -->
        <el-select
          v-model="courseInfo.subjectParentId"
          placeholder="请选择"
          @change="OnesubjectChanged"
        >
          <el-option
            v-for="subjectOne in subjectOneList"
            :key="subjectOne.id"
            :label="subjectOne.title"
            :value="subjectOne.id"
          />
        </el-select>
        <!-- 二级分类 -->
        <el-select v-model="courseInfo.subjectId" placeholder="请选择">
          <el-option
            v-for="subject in subjectTwoList"
            :key="subject.value"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>
      </el-form-item>
      <!-- 课程讲师 TODO -->
      <el-form-item label="课程讲师">
        <el-select v-model="courseInfo.teacherId" placeholder="请选择">
          <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"
          />
        </el-select>
      </el-form-item>
      <!-- 总课时数 -->
      <el-form-item label="总课时">
        <el-input-number
          :min="0"
          v-model="courseInfo.lessonNum"
          controls-position="right"
          placeholder="请填写课程的总课时数"
        />
      </el-form-item>
      <!-- 课程简介-->
      <el-form-item label="课程简介">
        <el-input v-model="courseInfo.description" />
      </el-form-item>
      <!-- 课程封面 TODO -->
      <el-form-item label="课程封面">
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
      <!-- 课程价格 -->
      <el-form-item label="课程价格">
        <el-input-number
          :min="0"
          v-model="courseInfo.price"
          controls-position="right"
          placeholder="免费课程请设置为0元"
        />元
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next">保存并下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import course from "@/api/edu/course";
import teacher from "@/api/edu/teacher";
import subject from "@/api/edu/subject";
import Tinymce from "@/components/Tinymce";

export default {
  components: { Tinymce }, //富文本编辑器Tinymce
  data() {
    return {
      courseInfo: {
        title: "",
        subjectId: "", //二级分类
        subjectParentId: "", //一级分类
        teacherId: "",
        lessonNum: 0,
        description: "",
        cover: "/static/01.jpg",
        price: 0,
      },
      teacherList: [],
      courseId: "",
      subjectOneList: [], //一级分类数组
      subjectTwoList: [], //二级分类数组
      saveBtnDisabled: false, // 保存按钮是否禁用
      BASE_API: process.env.BASE_API, // 接口API地址
    };
  },
  
  created() {
    if (this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id;
      this.getCourseInfo();
    } else {
      //初始化讲师
      this.getteacherList();
      //初始化课程分类
      this.getOneSubjectList();
    }
  },
watch: {
    $route(to, from) {
       this.courseInfo = {};
    },
  },
  methods: {
    init() {
      //路径中有id
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id;
        this.getTeacherInfo(id);
      } else {
        //路径中没有id
        this.courseInfo = {};
      }
    },
    //根据课程id查询
    getCourseInfo() {
      course.getCourseInfo(this.courseId).then((response) => {
        //在courseInfo课程基本信息中，包含一级分类id，二级分类id
        this.courseInfo = response.data.courseInfoVo;
        //1.查询所有的分类，包括一级，二级
        subject.getSubjectList().then((response) => {
          //2.获取所有的一级分类
          this.subjectOneList = response.data.list;
          //3.把所有的一级id进行遍历，比较当前的courseInfoVo里面的一级id是否相等
          for (var i = 0; i < this.subjectOneList.length; i++) {
            //获取每一个一级分类;
            var oneSubject = this.subjectOneList[i];
            //比较
            if (this.courseInfo.subjectParentId == oneSubject.id) {
              //获取一级分类的所有二级分类
              this.subjectTwoList = oneSubject.children;
            }
          }
        });
        this.getteacherList();
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
    //获取所有讲师列表
    getteacherList() {
      teacher.findAll().then((response) => {
        this.teacherList = response.data.items;
      });
    },
    //获取所有一级分类
    getOneSubjectList() {
      subject.getSubjectList().then((response) => {
        this.subjectOneList = response.data.list;
      });
    },
    //当点击一级分类时，会触发change，显示对于的二级分类
    OnesubjectChanged(value) {
      //value是一级分类的id值
      //遍历所有的分类，包括一级，二级
      for (let i = 0; i < this.subjectOneList.length; i++) {
        //每一个一级的分类
        let onesubject = this.subjectOneList[i].id;
        //判断所有一级分类的id是否与点击的id一样
        if (onesubject === value) {
          //从一级分类获取到所有的二级分类
          this.subjectTwoList = this.subjectOneList[i].children;
          //把二级分类的值清空
          this.courseInfo.subjectId = "";
        }
      }
    },
    //保存并下一步，所执行的方法
    next() {
      this.saveBtnDisabled = true;
      if (this.$route.params && this.$route.params.id) {
        this.updateData();
      } else {
        this.saveData();
      }
    },
    //修改方法
    updateData() {
      course.updateCourseInfo(this.courseInfo).then((response) => {
        this.$message({
          type: "success",
          message: "修改成功!",
        });
        this.$router.push({
          path: "/course/chapter/" + this.courseId,
        });
      });
    },
    // 保存方法
    saveData() {
      course.saveCourseInfo(this.courseInfo).then((response) => {
        this.$message({
          type: "success",
          message: "保存成功!",
        });
        this.$router.push({
          path: "/course/chapter/" + response.data.courseId,
        });
      });
    },
  },
};
</script>
<style scoped>
.tinymce-container {
  line-height: 29px;
}
</style>