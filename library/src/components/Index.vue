<template>
  <div id="bg-wrap">
    <div id="bg">
    </div>
    <div class="search-control">
        <v-selection v-if="synFlag" :selections="searchWays" @on-change="changeWay"></v-selection>
        <input type="text" v-model="searchContent" title="输入搜索词" @keyup.enter="emitSearchParams">
        <button type="submit" title="搜索" @click="emitSearchParams"></button>
    </div>
  </div>
</template>

<script>
  import VSelection from './basic/selection'
  export default {
    name: 'index',
    components: {
      VSelection
    },
    data() {
      return {
        searchContent: '',
        searchWay: 0,
        synFlag: true,
        searchWays: [{
            label: '所有字段',
            value: 0
          },
          {
            label: '题名关键词',
            value: 1
          },
          {
            label: '题名(精确)',
            value: 2
          },
          {
            label: '作者',
            value: 3
          },
          {
            label: '出版社',
            value: 4
          },
          {
            label: 'ISBN',
            value: 5
          },
          {
            label: '索书号',
            value: 6
          },
          {
            label: '条形码',
            value: 7
          }
        ]
      }
    },
    methods: {
      // 背景居中
      resize() {
        // 背景图片尺寸
        var imgWidth = 2400,
          imgHeight = 1600;
        // 图片宽高比
        var imgRatio = imgWidth / imgHeight;
        var $bgWrap = document.getElementById("bg-wrap");
        var $bg = document.getElementById("bg");

        if (!$bgWrap || !$bg) {
          return;
        }
        var offsetLeft = 0,
          offsetTop = 0;

        // 浏览器viewport尺寸
        var winWidth = window.innerWidth,
          winHeight = window.innerHeight - 80;

        $bgWrap.style.width = winWidth + "px";
        $bgWrap.style.height = winHeight + "px";

        // 浏览器viewport宽高比
        var winRatio = winWidth / winHeight;

        if (winHeight < 500 || winWidth < 920 || winRatio < 1) {
          if (winHeight < 500) {
            $bgWrap.style.height = "500px";
          }
          if (winWidth < 920) {
            $bgWrap.style.width = "920px";
          }
          return;
        }

        if (winWidth > imgWidth) {
          $bg.style.width = imgWidth + "px";
          $bg.style.height = imgHeight + "px";
        } else {
          if (winRatio > imgRatio) {
            // 屏幕宽高比大于图片宽高比，屏幕高度不足，图片向上偏移
            offsetLeft = 0;
            offsetTop = (Math.ceil(winWidth / imgRatio) - winHeight) / 2;
            $bg.style.width = winWidth + "px";
            $bg.style.height = winWidth / imgRatio + "px";
            $bg.style.top = -offsetTop + "px";
            $bg.style.left = offsetLeft + "px";
          } else if (winRatio < imgRatio) {
            // 屏幕宽高比小于图片宽高比，屏幕宽度不足，图片向左偏移
            offsetLeft = (Math.ceil(winHeight * imgRatio) - winWidth) / 2;
            offsetTop = 0;
            $bg.style.width = winHeight * imgRatio + "px";
            $bg.style.height = winHeight + "px";
            $bg.style.top = offsetTop + "px";
            $bg.style.left = -offsetLeft + "px";
          }
        }
      },
      // 搜索方式改变
      changeWay(wayIndex) {
        this.searchWay = wayIndex;
      },
      // 传递搜索参数
      emitSearchParams() {
        if (this.searchContent != '') {
          this.$router.push({
            name: 'Books',
            params: {
              searchWay: this.searchWay,
              searchContent: this.searchContent
            }
          });
        }
      }
    },
    activated() {
      // 搜索页搜索内容为空跳转到主页
      if (this.$route.params.emptyContent == 'yes') {
        this.searchWay = 0;
        this.searchContent = '';
        // 刷新 v-selection 组件
        this.synFlag = false;
        setTimeout(() => {
          this.synFlag = true;
        }, 10);
      }
      window.onresize = this.resize;
    },
    mounted() {
      this.resize();
    }
  }

</script>

<style scoped>
  /*  背景*/

  #bg-wrap {
    height: 100%;
    width: 100%;
    margin: auto;
    position: relative;
    max-width: 1920px;
    min-width: 920;
    min-height: 500px;
    overflow: hidden;
  }

  #bg {
    z-index: -1;
    position: absolute;
    top: 0;
    overflow: hidden;
    width: 100%;
    height: 100%;
    max-width: 1920px;
    background-image: url("../assets/bg.jpg");
    background-repeat: no-repeat;
    background-color: #666;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }

  @media only screen and (min-height:806px) and (orientation:landscape),
  screen and (min-width:1433px) and (orientation:landscape) {
    #bgBox,
    #bgDiv {
      max-width: 2400px;
      max-height: 1600px;
    }
  }
  /* 搜索 */

  .search-control {
    position: absolute;
    top: 100px;
    left: 200px;
  }

  .search-control input {
    position: relative;
    top: 10px;
    margin-left: 20px;
    padding-left: 10px;
    padding-right: 40px;
    height: 44px;
    width: 400px;
    border: none;
    font-size: 16px;
  }

  .search-control button {
    background-image: url(../assets/search.png);
    background-repeat: no-repeat;
    background-position: center;
    width: 40px;
    height: 40px;
    border: none;
    background-color: #fff;
    position: relative;
    top: 25px;
    left: -45px;
  }

</style>
