<template>
  <div>
    <div id="chartbox2" style="width: 100%; height: 300px"></div>
  </div>
</template>
<script>
import * as Highcharts from "highcharts";
import mockData from "../assets/akl.json";
import dayjs from "dayjs";
import axios from "axios";

export default {
  data() {
    return {};
  },
  mounted() {
    this.getSeries().then((series) => {
      const option = {
        chart: { type: "spline" },
        title: { text: "Seek Auckland IT requires" },
        xAxis: {
          type: "datetime",
          labels: {
            formatter() {
              return dayjs(this.value).format("MM-DD");
            },
          },
        },
        yAxis: {
          title: { text: "Requires" },
        },
        tooltip: { crosshairs: true, shared: true },
        credits: { enabled: false },
        plotOptions: {
          spline: {
            marker: { radius: 4, lineColor: "#666666", lineWidth: 1 },
          },
        },
        series: series,
      };
      Highcharts.chart("chartbox2", option);
    });
  },
  methods: {
    async getSeries() {
      const datas = mockData;

      // use API
      // const res = await axios.get("http://192.168.68.74:11000/akl");
      // const datas = res.data;

      const Developers = {
        name: "Developers/Programmers",
        data: [],
        color: "red",
      };
      const Engineer = { name: "Engineer-software2", data: [], color: "blue" };
      const Testing = {
        name: "Testing & Quality Assurance",
        data: [],
        color: "#00ff00",
      };

      for (let item of datas) {
        const timeStr = item.date; // 修改为标准时间格式: "02/12/2023, 11:03:47  PM"  => "02/12/2023 11:03:47"
        const x = new Date(timeStr).getTime(); // 转换为时间戳
        Developers.data.push([x, item.Developers]);
        Engineer.data.push([x, item.Engineer]);
        Testing.data.push([x, item.Testing]);
      }

      const series = [Developers, Engineer, Testing];
      return series;
    },
  },
};
</script>