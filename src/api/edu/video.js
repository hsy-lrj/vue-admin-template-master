import request from '@/utils/request'

export default {
/**
 * 添加小节
 */
addVideo(eduVideo) {
    return request({
      url: `/eduservice/video/addVideo`,
      method: 'post',
      data: eduVideo
    })
  },
 
  /**
   * 删除小节
   */
  deleteVideo(id) {
    return request({
      url: `/eduservice/video/deleteVideo/${id}`,
      method: 'delete'
    })
  },
  /**
   * 根据id查询小节
   */
  getVideoById(id) {
    return request({
      url: `/eduservice/video/getVideoById/${id}`,
      method: 'get'
    })
  },
  /**
   * 根据id修改小节
   */
  updateVideoById(eduVideo){
    return request({
      url: `/eduservice/video/updateVideoById`,
      method: 'post',
      data:eduVideo
    })
  },
  /**
   * 删除视频
   */
  removeVideo(videoId){
    return request({
      url: `/eduvod/video/removeVideo/${videoId}`,
      method:'delete',
    })
  }

}