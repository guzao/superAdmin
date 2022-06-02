<template>
  <!-- 查询 -->
  <div class="search_box">
    <!-- 查询框 -->
    <div class="serach_title_box flex items-center">
      <div class="left flex">
        <div class="search_label">设备</div>
        <input
          v-model.trim="searchKey"
          @keydown.enter="serachCardData"
          placeholder="输入项目关键词搜索"
          type="text"
        />
      </div>
      <div
        @click="filterChange"
        class="right flex flex-1 justify-end cursor-pointer select-none items-center"
      >
        <span class="filter_icon"></span>
        <span class="tips">{{ isListOpenFilter ? "收起筛选" : "展开筛选" }}</span>
      </div>
    </div>

    <!-- 筛选条件 -->
    <div v-show="isListOpenFilter" class="filter_box flex items-center cursor-pointer">
      <div class="select_label">项目</div>
      <div class="select_value">上海浦江科技广场</div>
      <span class="flex flex-1 justify-end">
        <el-icon><CaretBottom /></el-icon>
      </span>
    </div>

    <!-- 数据列表 -->
    <el-collapse-transition>
      <div v-show="isListOpen" class="list_card scrollbar">
        <div class="title">共找到{{ cardList.length }}个项目</div>
        <!-- 卡片 -->
        <productCard @card-click="pathJumpingDetection" :card-list="cardList" />
      </div>
    </el-collapse-transition>

    <!-- bottom -->
    <div
      @click="listChange"
      class="bottom_action flex items-center justify-center cursor-pointer select-none"
    >
      <el-icon size="90">
        <ArrowDownBold v-if="!isListOpen" />
        <ArrowUpBold v-if="isListOpen" />
      </el-icon>
      <span>{{ isListOpen ? "收起" : "展开" }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import productCard from "./Card.vue";
import { userSearchBoxData } from "./SearchBox";
const {
  isListOpen,
  cardList,
  listChange,
  getIndexSearch,
  searchKey,
  isListOpenFilter,
  filterChange,
  pathJumpingDetection,
} = userSearchBoxData();

const serachCardData = () => {
  if (!searchKey.value.trim()) {
    getIndexSearch({ key: searchKey.value, type: 1 });
    return;
  }
  getIndexSearch({ key: searchKey.value, type: 2 });
  isListOpen.value = true;
};

onMounted(getIndexSearch);
</script>

<style lang="scss" scoped>
@import "../../../../styles/variable.scss";
.search_box {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 300px;
  height: 80px;
  background: #f4f4f4;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);

  // 筛选条件框
  .serach_title_box {
    height: 40px;
    background: rgba(255, 255, 255, 1);
    border-radius: 6px 6px 0 0;
    padding: 0 14px;
    box-sizing: border-box;

    .left {
      .search_label {
        height: 17px;
        font-size: 12px;
        font-weight: 400;
        color: #000000;
        line-height: 17px;
      }

      input {
        margin-left: 6px;
        width: 133px;
        height: 17px;
        font-size: 12px;
        font-weight: 400;
        text-align: left;
        line-height: 17px;
        outline: none;
        &::placeholder {
          color: rgba(0, 0, 0, 0.3);
        }
      }
    }

    .right {
      .filter_icon {
        content: url(../../../../icons/svg/filter.svg);
        margin-right: 4px;
        height: 12px;
        width: 12px;
      }
      .tips {
        font-size: 12px;
        font-weight: 400;
        text-align: right;
        color: #000000;
        line-height: 17px;
      }
    }
  }

  .filter_box {
    width: 300px;
    height: 40px;
    background: #ffffff;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    box-sizing: border-box;
    padding: 0 14px;
    .select_label {
      line-height: 40px;
      margin-right: 4px;
    }
    .select_value {
      line-height: 40px;
      font-size: 12px;
      font-weight: 400;
      text-align: left;
      color: rgba(0, 0, 0, 0.3);
    }
  }

  //查询的列表
  .list_card {
    max-height: 435px;
    background-color: #f4f4f4;
    padding: 0 9px;
    box-sizing: border-box;
    overflow-y: auto;
    .title {
      line-height: 17px;
      font-size: 12px;
      font-weight: 400;
      text-align: left;
      color: rgba(0, 0, 0, 0.5);
      line-height: 17px;
      margin: 10px 0;
    }
  }

  .bottom_action {
    border-radius: 0 0 6px 6px;
    height: 40px;
    background: #ffffff;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    box-sizing: border-box;
    & > span {
      margin-left: 5px;
    }
  }
}
</style>
