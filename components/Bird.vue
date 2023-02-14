<template>
  <div class="bird-cont">
    <div v-for="n in ['one','two','three','four']" :class="`bird-c bird-c-${n}`">
      <div :class="`bird bird-${n}`" />
    </div>
  </div>
</template>

<style scoped>
  .bird-cont{position:absolute;width:100%;height:100%;left:10%;}
  .bird{background-image:url('/img/bird.svg');animation-duration:var(--dur);animation-delay:var(--del);background-size:auto 100%;width:88px;height:125px;will-change:background-position;animation-name:fly-cycle;animation-timing-function:steps(10);animation-iteration-count:infinite;}
  .light .bird{background-image:url('/img/bird_light.svg');}
  .bird-one{--dur:1s;--del:-0.5s;}
  .bird-two{--dur:0.9s;--del:-0.75s;}
  .bird-three{--dur:1.25s;--del:-0.25s;}
  .bird-four{--dur:1.1s;--del:-0.5s;}
  .bird-c{position:absolute;top:20%;left:-10%;animation-duration:var(--dur);animation-delay:var(--del);transform:scale(0) translateX(-10vw);will-change:transform;animation-name:fly-right-one;animation-timing-function:linear;animation-iteration-count:infinite;}
  .bird-c-one{--dur:15s;--del:0;}
  .bird-c-two{--dur:16s;--del:1s;}
  .bird-c-three{--dur:14.6s;--del:9.5s;}
  .bird-c-four{--dur:16s;--del:10.25s;}

  @keyframes fly-cycle{
    100%{background-position:-900px 0;}
  }
  @keyframes fly-right-one{
    0%{transform:scale(0.3) translateX(-10vw);}
    10%{transform:translateY(2vh) translateX(10vw) scale(0.4);}
    20%{transform:translateY(0vh) translateX(30vw) scale(0.5);}
    30%{transform:translateY(4vh) translateX(50vw) scale(0.6);}
    40%{transform:translateY(2vh) translateX(70vw) scale(0.6);}
    50%{transform:translateY(0vh) translateX(90vw) scale(0.6);}
    60%{transform:translateY(0vh) translateX(110vw) scale(0.6);}
    100%{transform:translateY(0vh) translateX(110vw) scale(0.6);}
  }
  @keyframes fly-right-two{
    0%{transform:translateY(-2vh) translateX(-10vw) scale(0.5);}
    10%{transform:translateY(0vh) translateX(10vw) scale(0.4);}
    20%{transform:translateY(-4vh) translateX(30vw) scale(0.6);}
    30%{transform:translateY(1vh) translateX(50vw) scale(0.45);}
    40%{transform:translateY(-2.5vh) translateX(70vw) scale(0.5);}
    50%{transform:translateY(0vh) translateX(90vw) scale(0.45);}
    51%{transform:translateY(0vh) translateX(110vw) scale(0.45);}
    100%{transform:translateY(0vh) translateX(110vw) scale(0.45);}
  }
</style>