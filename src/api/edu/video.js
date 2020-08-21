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
  }
}