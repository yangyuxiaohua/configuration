/**
 *  区域列表
 */
import req from '@/utils/request'
// 超级管理员 - 查询区域列表
export const getAreaList = params=>req.get('/regional/listRegional',params)
// 按照用户主键 - 查询区域列表
export const getAreaListByUserId = params=>req.get('/regional/listRegionalByUserId',params)
// 按照用户主键和系统类型 - 查询区域列表
export const getAreaListByUserIdSystem = params=>req.get('/regional/listRegionalByUserIdSystem',params)