import request from '@/utils/request'

export default {

    /**
     * 获取课程列表
     */
    getCourseList() {
        return request({
            url: `/eduservice/subject/list`,
            method: 'get'
        })
    },

    /**
     * 添加课程
     */
    saveCourseInfo(courseInfo) {
        return request({
            url: `/eduservice/course/addCourseInfo`,
            method: 'post',
            data: courseInfo
        })
    },
    /**
     * 根据课程id查询基本信息
     */
    getCourseInfo(courseId){
        return request({
            url: `/eduservice/course/getCourseInfo/${courseId}`,
            method: 'get'
        })
    },

     /**
     * 更新课程查询基本信息
     */
    updateCourseInfo(courseInfoVo) {
        return request({
            url: `/eduservice/course/updateCourseInfo`,
            method: 'post',
            data: courseInfoVo
        })
    }
}