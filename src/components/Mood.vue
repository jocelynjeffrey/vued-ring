<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="echarts">
      <IEcharts
        :option="gauge"
        style="width: 100%; height: 100%;">
      </IEcharts>
    </div>
    <a class="btn" @click="getMood">
      {{ btnText }}
    </a>
    <transition name="fade">
      <h1 class="status" v-if="show">{{ mood }}</h1>
    </transition>
  </div>
</template>

<script>
import IEcharts from 'vue-echarts-v3/src/lite'; // link to full library is src/full
import 'echarts/lib/chart/gauge';
import axios from 'axios';

export default {
  name: 'Mood',
  components: {
    IEcharts,
  },
  data() {
    return {
      msg: 'How are you feeling?',
      btnText: 'get mood',
      show: false,
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
            data: [{ value: 0, name: '' }],
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
    getMood() {
      axios.get('http://localhost:3000/api/v1/temperature')
        .then((response) => {
          this.setMood(response.data.temp);
          this.reset();
        })
        .catch(error => console.log('error from server', error)); // eslint-disable-line
    },
    setMood(num) {
      this.gauge.series[0].data[0].value = num;
      this.moodVariable = num;
      this.show = true;
    },
    reset() {
      setTimeout(
        function() { // eslint-disable-line
          this.show = false;
          this.gauge.series[0].data[0].value = 0;
        }.bind(this),
        1000,
      );
    },
  },
};
</script>

<style lang="scss" scoped>
  .echarts {
    height: 400px;
    margin-bottom: 40px;
  }
  .status {
    font-style: italic;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>

