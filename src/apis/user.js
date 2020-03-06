/**
 *  用 户
 */

import req from '@/utils/request'

//添加用户
export const addUser = params => req.post ('/user/addUser',params)
// 获取项目列表 查询 单个用户站点权限 （指定站点 和 指定单位） 授权
export const getProjects = params =>req.get('/user/listAuthSitesByTypeAll',params)

// 查询 单个用户站点权限（指定站点）
export const getSitesByTypeSite = params =>req.get('/user/listAuthSitesByTypeSite',params)

