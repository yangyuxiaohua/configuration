/**
 *  dtu
 */
import req from '@/utils/request'

//文件上传
export const upload = params => req.post('/upload', params)