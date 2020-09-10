import request from '@/utils/request'

export default {

    /**
     * 分页查询
     */
    pageBanner(page,limit) {
        return request({
            url: `/cmsservice/banneradmin/pageBanner/${page}/${limit}`,
            method: 'get'
        })
    },
    /**
     * 根据id删除banner
     */
    remove(id) {
        return request({
            url: `/cmsservice/banneradmin/remove/${id}`,
            method: 'delete'
        })
    },
    /**
     * 添加banner
     */
    addBanner(crmBanner) {
        return request({
            url: `/cmsservice/banneradmin/addBanner`,
            method: 'post',
            data: crmBanner
        })
    },
    /**
     * 根据id获取banner
     */
    get(id) {
        return request({
            url: `/cmsservice/banneradmin/get/${id}`,
            method: 'get'
        })
    },
    /**
     * 根据id修改banner
     */
    updateBannerById(crmBanner) {
        return request({
            url: `/cmsservice/banneradmin/updateBannerById`,
            method: 'post',
            data: crmBanner
        })
    }

}