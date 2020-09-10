import request from '@/utils/request'


export default {

  /**
   * 生成统计数据
   */
  getChapterVideo(day) {
    return request({
      url: `/staservice/sta/registerCount/${day}`,
      method: 'post'
    })
  },

  /**
   * 图表显示
   */
  getShowData(searchOjb){
    return request({
      url: `/staservice/sta/showData/${searchOjb.begin}/${searchOjb.end}/${searchOjb.type}`,
      method: 'get'
    })
  }
 
}