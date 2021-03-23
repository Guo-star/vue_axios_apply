<template>
  <div class="main">
    <!-- 1 -->
    <div class="flex-main">
      <h2 class="title">1</h2>
      <div class="content">
        <!-- <p class="notice">This is notice content.</p> -->
        <p class="notice">
          This is notice content.This is notice content.This is notice
          content.This is notice content.This is notice content.
        </p>
      </div>
    </div>
    <br />
    <!-- 2 -->
    <div class="flex-main">
      <h2 class="title">2</h2>
      <div class="content">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="日期" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
        </el-table>
      </div>
    </div>
    <br />
    <div class="flex-main">
      <h2 class="title">2</h2>
      <div class="content">
        <i-Table :columns="columns" :data="tableData"></i-Table>
      </div>
    </div>
    <br />
    <!-- 4 -->
    <div class="flex-direction-main">
      <div class="title"></div>
      <div class="content">
        <div class="notice">1</div>
        <div class="notice">2</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Table } from "view-design";

export default {
  name: "Flex",
  components: {
    iTable: Table,
  },
  data() {
    return {
      columns: [
        { title: "日期", key: "date" },
        { title: "姓名", key: "name" },
        { title: "地址", key: "address" },
      ],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.flex-main {
  width: 40vw;
  background-color: #ccc;
  display: flex;
  margin: 0 auto;
  .title {
    width: 10vw;
    border-right: 1px solid #fff;
  }
  .content {
    flex: 1;
    // width: 0;
    .notice {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
.flex-direction-main {
  display: flex;
  flex-direction: column;
  height: 200px;
  width: 40vw;
  background-color: #ccc;
  margin: 0 auto;
  .title {
    height: 30px;
    border-bottom: 1px solid #fff;
  }
  .content {
    flex: 1;
    overflow: auto;
    .notice {
      background-color: #fff;
      width: 100px;
      height: 200px;
    }
  }
}
</style>
