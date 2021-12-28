import request from '@/utils/request.js'
export const recommendMusic = params => request({
    url: '/personalized',
    params
})
export const newMusic = params => request({
    url: '/personalized/newsong',
    params
})