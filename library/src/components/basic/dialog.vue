<template>
  <div>
    <div class="dialog-wrap">
      <div class="dialog-cover"  v-if="isShow" @click="closeMyself"></div>
      <transition name="drop">
        <div class="dialog-content"  v-if="isShow">
          <p class="dialog-close" @click="closeMyself">x</p>
<!--          通过插槽传html数据-->
          <slot>empty</slot>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      isShow: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      closeMyself() {
        this.$emit('on-close');
      }
    }
  }

</script>

<style scoped>
  /*  对话框弹出效果 */

  .drop-enter-active {
    transition: all .5s ease;
  }

  .drop-leave-active {
    transition: all .3s ease;
  }

  .drop-enter {
    transform: translateY(-500px);
  }

  .drop-leave-active {
    transform: translateY(-500px);
  }

  .dialog-wrap {
    position: fixed;
    width: 100%;
    height: 100%;
  }
  /* 背景 */

  .dialog-cover {
    background: #000;
    opacity: .4;
    position: fixed;
    z-index: 5;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  /* 内容 */

  .dialog-content {
    width: 50%;
    min-width: 460px;
    position: fixed;
    max-height: 50%;
    overflow: auto;
    background: #fff;
    top: 20%;
    left: 50%;
    margin-left: -25%;
    z-index: 10;
    border: 2px solid #52c3dd;
    padding: 2%;
    line-height: 1.6;
  }
  
  @media only screen and (max-height: 459px) {
    .dialog-content {
      left: 100px;
      margin-left: 0;
    }
  }
  /* 关闭 */

  .dialog-close {
    position: absolute;
    right: 15px;
    top: 5px;
    width: 20px;
    height: 20px;
    text-align: center;
    cursor: pointer;
  }

  .dialog-close:hover {
    color: #52c3dd;
  }

</style>
