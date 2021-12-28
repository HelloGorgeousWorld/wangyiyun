<template>
  <div>
    <van-search v-model="value" placeholder="请输入搜索关键词" shape="round" @input="inputFn"/>
    <div class="search_wrap" v-if="resultList.length === 0">
      <p class="hot_title">热门搜索</p>
      <div class="hot_name_wrap">
        <span 
        class="hot_item" 
        v-for="(obj, index) in hotArr" :key="index"
        @click="fn(obj.first)">{{obj.first}}</span>
      </div>
    </div>
    <div class="search_wrap" v-else>
      <p class="hot_title">最佳匹配</p>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <SongItem v-for="obj in resultList"
        :name = "obj.name"
        :author = "obj.artists[0].name"
        :id="obj.id"
        :key="obj.id">
        </SongItem>
      </van-list>
    </div>
  </div>
</template>

<script>
// import { nanoid } from 'nanoid'
import { hotSearchAPI, searchResultListAPI} from '@/api'
import SongItem from '@/components/SongItem'
export default {
  data() {
    return {
      value: '',
      hotArr: [], //热搜关键字
      resultList: [],
      loading: false,
      finished: false,
      page: 1,
      timer: null
    };
  },
  components: {SongItem},
  async created(){
    const res = await hotSearchAPI()
    console.log(res)
    this.hotArr = res.data.result.hots
  },
  methods: {
    async getListFn(){
      return await searchResultListAPI({
        keywords: this.value,
        limit: 30,
        offset: (this.page - 1) * 30
      })
    },
    async fn(val){
      this.finished = false //重置finished的状态
      this.value = val
      const res = await this.getListFn()
      console.log(res)
      this.resultList = res.data.result.songs
      this.loading = false
    },
    async inputFn(){
      if(this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
      this.page = 1
      this.finished = false
      if (this.value.length === 0){
        this.resultList = []
        return
      }
      const res = await this.getListFn()
      if(res.data.result.songs === undefined){//没有数据
        this.resultList = []
        return
      }
      this.resultList = res.data.result.songs
      this.loading = false
      },400)
    },
    async onLoad(){//触底事件，内部自动把loading改成true
      this.page++;
      const res = await this.getListFn();
      if(res.data.result.songs === undefined){//没有更多数据
        this.finished = true;
        return
      }
      this.resultList = [...this.resultList, ...res.data.result.songs];
      // for (var index in this.resultList) {
      //   this.resultList[index].id = nanoid()
      // }
      // 加载状态结束
      this.loading = false
    }
  },
}
</script>

<style scoped>
/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}
.van-cell{
  border-bottom: 1px solid lightgray;
}
</style>