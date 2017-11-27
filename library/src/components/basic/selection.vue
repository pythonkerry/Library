<template>
    <div class="selection-component">
      <div class="selection-show" @click="toggleDrop">
        <span>{{ selections[nowIndex].label }}</span>
        <div class="arrow"></div>
      </div>
      <div class="selection-list" v-if="isDrop">
        <ul>
          <li v-for="(item, index) in selections" @click="chooseSelection(index)">{{ item.label }}</li>
        </ul>
      </div>
    </div>
</template>

<script>
  export default {
    props: {
      selections: {
        type: Array,
        default: [{
          label: 'test',
          value: 0
        }]
      },
      selected: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        isDrop: false,
        nowIndex: 0
      }
    },
    methods: {
      toggleDrop() {
        this.isDrop = !this.isDrop;
      },
      chooseSelection(index) {
        this.nowIndex = index;
        this.isDrop = false;
        this.$emit('on-change', this.nowIndex);
      }
    },
    mounted() {
      this.nowIndex = this.selected;
    }
  }

</script>

<style scoped>
  .selection-component {
    position: relative;
    width: 110px;
    display: inline-block;
  }

  .selection-show {
    box-sizing: border-box;
    position: relative;
    cursor: pointer;
    width: 110px;
    height: 25px;
    border-radius: 3px;
    padding-left: 10px;
    padding-right: 10px;
    background-color: #fff;
    border: 1px solid #e3e3e3;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, .16);
  }

  .selection-show:hover {
    box-shadow: 0 1px 1px 1px rgba(0, 0, 0, .16);
  }

  .selection-show span {
    font-size: 14px;
  }

  .selection-show .arrow {
    position: absolute;
    top: 10px;
    right: 10px;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 5px solid #e3e3e3;
  }

  .selection-list {
    box-sizing: border-box;
    position: absolute;
    top: 25px;
    width: 100%;
    background: #fff;
    border: 1px solid #e3e3e3;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, .16);
  }

  .selection-list ul {
    padding: 0;
  }

  .selection-list li {
    padding: 4px 10px;
    cursor: pointer;
    background: #fff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
  }

  .selection-list li:hover {
    background: #e3e3e3;
  }

</style>
