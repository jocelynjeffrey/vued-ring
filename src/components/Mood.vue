<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="echarts">
      <IEcharts
        :option="gauge"
        style="width: 100%; height: 100%;"
        @ready="onReady">
      </IEcharts>
      <button v-on:click="show = !show">
        Toggle
      </button>
      <transition name="fade">
        <h1 v-if="show">{{ mood }}</h1>
      </transition>
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
      show: true,
      moodVariable: null,
      gauge: {
        backgroundColor: '#171C21',
        series: [
          {
            name: 'Mood',
            type: 'gauge',
            min: 0,
            max: 100,
            axisLine: {
              lineStyle: {
                color: [[0.2, '#4A6182'], [0.4, '#005B99'], [0.6, '#F7567C'], [0.8, '#FFBF3F'], [1, '#15AC8D']],
                width: 25,
                shadowColor: '#fff',
                shadowBlur: 10,
              },
            },
            detail: {
              offsetCenter: [0, '50%'],
              textStyle: {
                fontWeight: 'bolder',
                color: '#fff',
              },
            },
            data: [{ value: 50, name: '' }],
          },
        ],
      },
    };
  },
  computed: {
    mood() {
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
   height: 450px;
 }

 .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>

