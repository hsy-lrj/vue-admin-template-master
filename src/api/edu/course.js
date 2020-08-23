import request from '@/utils/request'

export default {
    /**
     * 根据课程id删除课程
     */
    removeCourseById(courseId){
        return request({
            url: `/eduservice/course/deleteCourse/${courseId}`,
            method: 'delete'
        })
    },

    /**
     * 查询所有课程列表
     */
    getCourseList(){
        return request({
            url: `/eduservice/course/getCourseList`,
            method: 'get'
        })
    },
    /**
     * 查询所有课程列表(分页)
     */
    pageCourseList(page, limit){
        return request({
            url: `/eduservice/course/pageCourseList/${page}/${limit}`,
            method: 'get'
        })
    },
    /**
     * 查询所有课程列表(分页，条件)
     */
    pageCourseCondition(page,limit,courseQuery){
        return request({
            url: `/eduservice/course/pageCourseCondition/${page}/${limit}`,
            method: 'post',
            data:courseQuery
        })
    },
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
    },
    /**
     * 根据课程id查询课程确认信息
     */
    selectCoursePublishVoById(courseId) {
        return request({
            url: `/eduservice/course/selectCoursePublishVoById/${courseId}`,
            method: 'get',
        })
    },
    /**
     * 发布课程
     */
    publishCourse(id){
        return request({
            url: `/eduservice/course/publishCourse/${id}`,
            method: 'post',
        })
    }



}