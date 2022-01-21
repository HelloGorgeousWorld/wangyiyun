**介绍**

网易云音乐项目借助开源的node项目资源，先请求本地的node项目, node服务器伪装请求去拿网易云音乐服务器数据转发回给自己前端。

**启用项目**

1、文件《NeteaseCloudMusicApi》是服务器脚本，node app.js启动本地服务器。

2、文件《music-demo》，npm run serve启动前端项目。