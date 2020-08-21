import request from '@/utils/request'

export default {

    /**
     * 查询所有讲师
     */
    findAll() {
        return request({
            url: `/eduservice/edu_teacher/findAll`,
            method: 'get'
        })
    },
    /**
     * 查询讲师列表（条件查询分页）
     * 当前页，每页记录数，条件对象
     */
    getTeacherListPage(page, limit, teacherQuery) {
        return request({
            //url: '/eduservice/user/login' + page + '/' + limit,
            url: `/eduservice/edu_teacher/pageTeacherCondition/${page}/${limit}`,
            method: 'post',
            //teacherQuery条件对象，后端使用RequestBody获取数据
            data: teacherQuery
        })
    },
    /**
     * 删除讲师
     */
    removeTeacherById(id) {
        return request({
            url: `/eduservice/edu_teacher/removeteacher/${id}`,
            method: 'delete'
        })
    },
    /**
     * 新增讲师
     */
    saveTeacher(teacher) {
        return request({
            url: `/eduservice/edu_teacher/save`,
            method: 'post',
            data: teacher
        })
    },
    /**
     * 根据id回写讲师数据
     */
    getTeacherInfo(id) {
        return request({
            url: `/eduservice/edu_teacher/findById/${id}`,
            method: 'get'
        })
    },
    /**
     * 修改讲师数据
     */
    updateTeacher(teacher) {
        return request({
            url: `/eduservice/edu_teacher/updateTeacher`,
            method: 'post',
            data: teacher
        })
    }

}