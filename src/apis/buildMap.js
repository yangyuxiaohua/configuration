/**
 *  建筑地图
 */
import req from '@/utils/request'
// 添加一栋楼
export const addBuild = params => req.post('/building/addBuild', params)
// 删除一栋楼
export const deletedBuild = params => req.post('/building/deletedBuild', params)
// 修改一栋楼
export const updateBuild = params => req.post('/building/updateBuild', params)

