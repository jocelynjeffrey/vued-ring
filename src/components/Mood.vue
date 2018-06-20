<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="echarts">
      <IEcharts
        :option="gauge"
        style="width: 100%; height: 100%;"
        @ready="onReady">
      </IEcharts>
      <h1>{{ mood }}</h1>
    </div>
  </div>
</template>

<script>
import IEcharts from 'vue-echarts-v3/src/lite'; // link to full library is src/full
import 'echarts/lib/chart/gauge';

export default {
  name: 'Mood',
  components: {
    IEcharts,
  },
  props: {},
  data() {
    return {
      msg: 'How are you feeling?',
      moodVariable: null,
      loading: true,
      temp: 0,
      gauge: {
        series: [
          {
            name: 'Temperature',
            type: 'gauge',
            detail: { formatter: '{value}' },
            data: [{ value: 50, name: '' }],
          },
        ],
      },
    };
  },
  computed: {
    mood() {
      // return this.moodVariable > 50 ? 'happy' : 'sad';
      switch (true) {
        case this.moodVariable <= 20:
          return 'morose';
        case this.moodVariable <= 40:
          return 'meh';
        case this.moodVariable <= 60:
          return 'okay';
        case this.moodVariable <= 80:
          return 'happy';
        default:
          return 'thrilled';
      }
    },
  },
  methods: {
    refreshData() {
      const temp = (Math.random() * 100).toFixed(2) - 0; // set temp from pi
      this.gauge.series[0].data[0].value = temp;
      this.moodVariable = temp;
    },
    onReady(instance, ECharts) {
      console.log(instance, ECharts); // eslint-disable-line
      console.log(this.gauge.series[0]); // eslint-disable-line
    },
  },
  mounted() {
    this.refreshData();
    setInterval(
      function() { // eslint-disable-line
        this.refreshData();
      }.bind(this),
      3000,
    );
  },
};
</script>
<style scoped>
 .echarts {
   border: 1px solid red;
   height: 450px;
 }
</style>

