<template>
  <div class="app-contant relative">
    <!-- 顶部信息 -->
    <HeaderCard
      class="box-border"
      :style="isShowSelectBox ? 'border-radius: 6px 6px 0 0;' : ''"
    >
      <HeaderInfo
        :isShow="isShowSelectBox"
        :selectState="isShowSelectBox"
        @on-select="showSelectBox"
        v-loading="loading"
        :title-info="projectBaseInfo"
      />
    </HeaderCard>

    <!-- 主体信息 -->
    <BodyCard
      v-loading="loading"
      :style="isShowSelectBox ? 'opacity: 0.3' : '1'"
      style="padding: 13px 16px"
      class="box-border"
    >
      <!-- 查看告警 设备列表 -->
      <BodyCardHeader @click="showDialog" />

      <!-- 项目连接图部分 -->
      <div class="line_map_box flex items-center w-full justify-around">
        <!-- 项目连接图 -->
        <ConnectionDiagram
          v-for="(item, index) in connectionDiagramData"
          :key="index"
          :connection-data="item"
        />
      </div>
    </BodyCard>

    <!-- 选择项目 -->
    <SelectProject
      :project-data-list="projectDataList"
      @resetting="resetting"
      @serach-project="serachProject"
      v-loading="loading"
      @on-checked-project="(code: string) => getMyProjectInfo({ code })"
      :isShow="isShowSelectBox"
      :checkedActive="currentProjectCode"
    />

    <!-- 展示设备选择 -->
    <el-dialog width="80%" top="13vh" v-model="showDeviceList" :show-close="false">
      <template #title="{ titleId }">
        <div class="my-header flex justify-between items-center">
          <div :id="titleId" class="dialog_tile">设备列表</div>
          <div @click="showDeviceList = false" class="dialog_close cursor-pointer"></div>
        </div>
      </template>
      <DeviceList
        v-loading="listLoading"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
        :device-data="deviceData"
      />
    </el-dialog>

    <!-- 告警列表 -->
    <el-dialog width="80%" top="13vh" v-model="showAlarmList" :show-close="false">
      <template #title="{ titleId }">
        <div class="my-header flex justify-between items-center">
          <div :id="titleId" class="dialog_tile">实时告警</div>
          <div @click="showAlarmList = false" class="dialog_close cursor-pointer"></div>
        </div>
      </template>
      <AlarmList
        v-loading="listLoading"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
        @serachAlarmList="serachAlarmList"
        :alarm-data="alarmData"
      />
    </el-dialog>

    <!--  -->
  </div>
</template>

<script setup lang="ts">
import HeaderCard from "@/components/common/Header_card.vue";
import BodyCard from "@/components/common/Body_card.vue";
import HeaderInfo from "./component/HeaderInfo.vue";
import BodyCardHeader from "./component/BodyCardHeader.vue";
import ConnectionDiagram from "./component/ConnectionDiagram.vue";
import SelectProject from "./component/SelectProject.vue";
import DeviceList from "./component/deviceList/DeviceList.vue";
import AlarmList from "./component/AlarmList/AlarmList.vue";
import { useData } from "./useData";
import { onMounted } from "vue";

const {
  loading,
  listLoading,
  getMyProjectInfo,
  projectDataList,
  projectBaseInfo,
  connectionDiagramData,
  getMyProjectData,
  showSelectBox,
  isShowSelectBox,
  resetting,
  serachProject,
  currentProjectCode,
  showDeviceList,
  showDialog,
  showAlarmList,
  alarmData,
  deviceData,
  serachAlarmList,
  handleSizeChange,
  handleCurrentChange,
} = useData();

/** 获取数据 */
onMounted(() => {
  getMyProjectInfo({ code: currentProjectCode.value });
  getMyProjectData();
});
</script>

<style lang="scss" scoped>
// 项目连接图
.line_map_box {
  margin-top: 6vh;
}
.box-border {
  transition: all 0.5s;
}
</style>
