<template>
  <div class="dashboard">
    <div class="firstRow">
      <div>
        <i class="el-icon-user"></i>
        <div>
          <span>用户量</span>
          <span>4567</span>
        </div>
      </div>
      <div>
        <i class="el-icon-goods"></i>
        <div>
          <span>商品额</span>
          <span>4567</span>
        </div>
      </div>
      <div>
        <i class="el-icon-bell"></i>
        <div>
          <span>消息数量</span>
          <span>4567</span>
        </div>
      </div>
    </div>
    <div class="secendRow">
      <div id="lineChart"></div>
    </div>
    <div class="thirdRow">
      <div id="pieChart"></div>
      <div id="barChart"></div>
      <div id="radarChart"></div>
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts";
export default {
  name: "",
  data() {
    return {};
  },
  methods: {
    initLineChart() {
      var chartDom = document.getElementById("lineChart");

      var lineChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: "折线图",
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: "line",
          },
        ],
      };
      window.addEventListener("resize", function () {
        lineChart.resize();
      });
      option && lineChart.setOption(option);
    },
    initPieChart() {
      var chartDom = document.getElementById("pieChart");
      var pieChart = echarts.init(chartDom);

      var option = {
        title: {
          text: "Referer of a Website",
          subtext: "Fake Data",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          bottom: "bottom",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "Search" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union " },
              { value: 300, name: "Video" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      window.addEventListener("resize", function () {
        pieChart.resize();
      });
      option && pieChart.setOption(option);
    },
    initBarChart() {
      var chartDom = document.getElementById("barChart");
      var barChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: "柱状图",
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
          },
        ],
      };
      window.addEventListener("resize", function () {
        barChart.resize();
      });
      option && barChart.setOption(option);
    },
    initRadarChart() {
      var chartDom = document.getElementById("radarChart");
      var radarChart = echarts.init(chartDom);
      var option;

      option = {
        // title: {
        //   text: "雷达图",
        // },
        legend: {
          data: ["Allocated Budget", "Actual Spending"],
        },
        radar: {
          radius: "50%",
          center: ["50%", "50%"],
          // shape: 'circle',
          indicator: [
            { name: "Sales" },
            { name: "Administration" },
            { name: "Information Technology" },
            { name: "Customer Support" },
            { name: "Development" },
            { name: "Marketing" },
          ],
        },
        series: [
          {
            name: "Budget vs spending",
            type: "radar",
            data: [
              {
                value: [4200, 3000, 20000, 35000, 50000, 18000],
                name: "Allocated Budget",
              },
              {
                value: [5000, 14000, 28000, 26000, 42000, 21000],
                name: "Actual Spending",
              },
            ],
          },
        ],
      };
      window.addEventListener("resize", function () {
        radarChart.resize();
      });
      option && radarChart.setOption(option);
    },
    initAllChart() {
      this.initLineChart();
      this.initPieChart();
      this.initBarChart();
      this.initRadarChart();
    },
  },
  created() {},
  mounted() {
    this.initAllChart();
  },
};
</script>
<style lang="scss" scoped>
.dashboard {
  background-color: #f2f2f2;
  width: 100%;
  div > div {
    background-color: white;
  }
}
.firstRow {
  display: flex;
  > div {
    flex: 1;
    margin: 15px;
    box-sizing: border-box;
    height: 130px;
    user-select: none;
    flex-direction: row;
    position: relative;
    display: flex;
    font-family: "Microsoft YaHei";
    i {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      font-size: 80px;
      cursor: pointer;
    }
    div {
      font-size: 25px;
      flex: 1;
      display: flex;
      flex-direction: column;
      :first-child {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: flex-end;
      }
      :last-child {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: flex-start;
      }
    }
  }

  // :nth-child(2) {
  //   height: 100px;
  //   line-height: 100px;
  //   position: relative;
  //   font-size: 80px;
  //   i {
  //     margin-left: 10px;
  //     cursor: pointer;
  //   }
  //   span {
  //     position: absolute;
  //     right: 20px;
  //   }
  // }
  // :last-child {
  //   height: 100px;
  //   line-height: 100px;
  //   position: relative;
  //   font-size: 80px;
  //   i {
  //     margin-left: 10px;
  //     cursor: pointer;
  //   }
  //   span {
  //     position: absolute;
  //     right: 20px;
  //   }
  // }
}
.secendRow {
  display: flex;
  div {
    flex: 1;
    margin: 0 15px;
    box-sizing: border-box;
    height: 400px;
    background-color: white;
    padding: 15px 0 0 15px;
  }
}
.thirdRow {
  display: flex;
  div {
    flex: 1;
    margin: 10px 15px;
    box-sizing: border-box;
    height: 400px;
    background-color: white;
    padding: 15px 0 10px 15px;
  }
}
</style>
