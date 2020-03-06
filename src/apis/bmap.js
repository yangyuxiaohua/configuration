/**
 *  百度地图
 */
import req from '@/utils/request'
// 添加一个站点位置
export const addArea = params => req.post('/area/addArea', params)
// 删除一个站点位置
export const deletedArea = params => req.post('/area/deletedArea', params)
// 修改一个站点位置
export const updateArea = params => req.post('/area/updateArea', params)
// 添加一层楼
export const addFloor = params => req.post('/floor/addFloor', params)
// 删除一层楼
export const deletedFloor = params => req.post('/floor/deletedFloor', params)
// 修改一层楼
export const updateFloor = params => req.post('/floor/updateFloor', params)