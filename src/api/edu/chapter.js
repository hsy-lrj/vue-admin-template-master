import request from '@/utils/request'


export default {

  /**
   * 查询所有的章节和小节
   */
  getChapterVideo(courseId) {
    return request({
      url: `/eduservice/chapter/getChapterVideo/${courseId}`,
      method: 'get'
    })
  },
   /**
   * 根据id添加
   */
  addChapter(eduChapter) {
    return request({
      url: `/eduservice/chapter/addChapter`,
      method: 'post',
      data: eduChapter
    })
  },
  /**
   * 根据id查询
   */
  getChapterById(id) {
    return request({
      url: `/eduservice/chapter/getChapterById/${id}`,
      method: 'get'
    })
  },
  /**
   * 根据id更新
   */
  updateChapterById(eduChapter) {
    return request({
      url: `/eduservice/chapter/updateChapterById`,
      method: 'post',
      data:eduChapter
    })
  },/**
  * 根据id删除
  */
 deleteChapterVideoById(chapterId) {
   return request({
     url: `/eduservice/chapter/deleteChapterById/${chapterId}`,
     method: 'delete'
   })
 },
 
}