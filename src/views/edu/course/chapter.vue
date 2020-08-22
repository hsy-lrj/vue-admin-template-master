<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="提交审核" />
    </el-steps>

    <el-button type="text" @click="openChapter()">添加章节</el-button>
    <!-- 章节 -->
    <ul class="chanpterList">
      <li v-for="chapter in chapterNestedList" :key="chapter.id">
        <p>
          {{ chapter.title }}
          <span class="acts">
            <el-button style type="text" @click="openVideo(chapter.id)">添加小节</el-button>
            <el-button style type="text" @click="editChapter(chapter.id)">修改章节</el-button>
            <el-button type="text" @click="removeChapter(chapter.id)">删除章节</el-button>
          </span>
        </p>
        <!-- 视频 -->
        <ul class="chanpterList videoList">
          <li v-for="video in chapter.videoVoList" :key="video.id">
            <p>
              {{ video.title }}
              <span class="acts">
                <el-button type="text" @click="editVideo(video.id)">编辑</el-button>
                <el-button type="text" @click="removeVideo(video.id)">删除</el-button>
              </span>
            </p>
          </li>
        </ul>
      </li>
    </ul>
    <div>
      <el-button @click="previous">上一步</el-button>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="next">下一步</el-button>
    </div>
    <!-- 添加和修改章节表单 -->
    <el-dialog :visible.sync="dialogChapterFormVisible" title="添加章节">
      <el-form :model="chapter" label-width="120px">
        <el-form-item label="章节标题">
          <el-input v-model="chapter.title" />
        </el-form-item>
        <el-form-item label="章节排序">
          <el-input-number v-model="chapter.sort" :min="0" controls-position="right" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogChapterFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加和修改课时表单 -->
    <el-dialog :visible.sync="dialogVideoFormVisible" title="添加小节">
      <el-form :model="video" label-width="120px">
        <el-form-item label="小节标题">
          <el-input v-model="video.title" />
        </el-form-item>
        <el-form-item label="小节排序">
          <el-input-number v-model="video.sort" :min="0" controls-position="right" />
        </el-form-item>
        <el-form-item label="是否免费">
          <el-radio-group v-model="video.free">
            <el-radio :label="true">免费</el-radio>
            <el-radio :label="false">默认</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上传视频">
          <!-- TODO -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVideoFormVisible = false">取 消</el-button>
        <el-button :disabled="saveVideoBtnDisabled" type="primary" @click="saveOrUpdateVideo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import chapter from "@/api/edu/chapter";
import video from "@/api/edu/video";

export default {
  data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用
      courseId: "", // 所属课程
      chapterNestedList: [], // 章节嵌套课时列表
      chapter: {
        //用于封装章节的数据
        title: "",
        sort: 0,
      },
      video: {
        // 课时对象
        title: "",
        sort: 0,
        free: 0,
        videoSourceId: "",
      },
      dialogChapterFormVisible: false, //表示章节弹框的值
      dialogVideoFormVisible: false, // 是否显示课时表单
      chapterId: {},
    };
  },

  created() {
    //获取讲师的id
    if (this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id;
      this.getChapterVideo();
    }
  },

  methods: {
    //=================================小节操作===================================
    saveOrUpdateVideo() {
      if (!this.video.id) {
        this.addVideo();
      } else {
        this.updateVideo();
      }
    },
    /**
     * 修改小节信息
     */
    updateVideo() {     
      
      video.updateVideoById(this.video).then((respose) => {
        //关闭弹框
        this.dialogVideoFormVisible = false;
        //提示信息
        this.$message({
          type: "success",
          message: "修改小节成功!",
        });
        //刷新界面
        this.getChapterVideo();
      });
    },

    /**
     * 回写小节信息
     */
    editVideo(videoid) {
      //显示弹框
      this.dialogVideoFormVisible = true;
      this.video.id = videoid;
      video.getVideoById(videoid).then((respose) => {
        this.video = respose.data.eduVideo;
      });
    },
    /**
     * 删除小节
     */
    removeVideo(videoId) {
      this.$confirm("此操作将永久删除此小节, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        video.deleteVideo(videoId).then((respose) => {
          //提示信息
          this.$message({
            type: "success",
            message: "删除小节成功!",
          });
          //刷新界面
          this.getChapterVideo();
        });
      });
    },

    /**
     * 添加小节弹框显示
     */
    openVideo(chapterId) {
      this.video = {};
      //显示弹框
      this.dialogVideoFormVisible = true;
      //设置章节id
      this.video.chapterId = chapterId;
    },
    //添加小节
    addVideo() {
      //设置课程id
      this.video.courseId = this.courseId;
      video.addVideo(this.video).then((respose) => {
        //关闭弹框
        this.dialogVideoFormVisible = false;
        //提示信息
        this.$message({
          type: "success",
          message: "添加小节成功!",
        });
        //刷新界面
        this.getChapterVideo();
      });
    },

    //=================================章节操作===================================

    /**
     * 删除章节的方法
     */
    removeChapter(chapterid) {
      this.$confirm("此操作将永久删除此章节, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        chapter.deleteChapterVideoById(chapterid).then((respose) => {
          //提示信息
          this.$message({
            type: "success",
            message: "删除章节成功!",
          });
          //刷新界面
          this.getChapterVideo();
        });
      });
    },
    /**
     * 保存或更新按钮的方法
     */
    saveOrUpdate() {
      if (!this.chapter.id) {
        this.saveChapterVideoById();
      } else {
        this.updateChapterVideoById();
      }
    },
    /**
     * 编辑章节的弹框显示和数据回写
     */
    editChapter(chapterid) {
      //显示弹窗
      this.dialogChapterFormVisible = true;
      //数据回写
      chapter.getChapterById(chapterid).then((respose) => {
        this.chapter = respose.data.eduChapter;
      });
    },
    /**
     * 修改章节
     */
    updateChapterVideoById() {
      this.chapter.courseId = this.courseId;
      chapter.updateChapterById(this.chapter).then((respose) => {
        //关闭弹框
        this.dialogChapterFormVisible = false;
        //提示信息
        this.$message({
          type: "success",
          message: "修改章节成功!",
        });
        //刷新界面
        this.getChapterVideo();
      });
    },
    /**
     * 显示弹框
     */
    openChapter() {
      this.dialogChapterFormVisible = true;
      this.chapter.title = "";
      this.chapter.sort = 0;
    },
    /**
     * 添加章节
     */
    saveChapterVideoById() {
      //设置课程id到章节中
      this.chapter.courseId = this.courseId;

      chapter.addChapter(this.chapter).then((respose) => {
        //关闭弹框
        this.dialogChapterFormVisible = false;
        //提示信息
        this.$message({
          type: "success",
          message: "添加章节成功!",
        });
        //刷新界面
        this.getChapterVideo();
      });
    },
    /**
     * 根据课程id查询章节和小节
     */
    getChapterVideo() {
      chapter.getChapterVideo(this.courseId).then((respose) => {
        this.chapterNestedList = respose.data.chapterVoList;
      });
    },
    /**
     * 上一步方法
     */
    previous() {
      this.$router.push({ path: "/course/info/" + this.courseId });
    },
    next() {
      this.$router.push({ path: "/course/publish/" + this.courseId });
    },
  },
};
</script>
<style scoped>
.chanpterList {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}
.chanpterList li {
  position: relative;
}
.chanpterList p {
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #ddd;
}
.chanpterList .acts {
  float: right;
  font-size: 14px;
}

.videoList {
  padding-left: 50px;
}
.videoList p {
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #ddd;
}
</style>