/**
 *  分区地图
 */
import req from '@/utils/request'

// 添加一个防火分区
export const addAreaBuild = params => req.post('/area/building/addAreaBuild', params)
// 删除一个防火分区
export const deletedAreaBuild = params => req.post('/area/building/deletedAreaBuild', params)
// 修改一个防火分区
export const updateAreaBuild = params => req.post('/area/building/updateAreaBuild', params)