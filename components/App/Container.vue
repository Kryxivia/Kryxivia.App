<script setup>
  const { isConnect, account } = useUser()
  // check if route contains "/app/marketplace"
  const route = useRoute()

  watchEffect(() => {
    console.log(isConnect.value, account.value)
  })
</script>

<template>
  <div class="app-container">
    <div class="app-wrapper">
      <slot v-if="isConnect" />
      <div v-else="isConnect" class="need-log">
        <div>
          <h1>Hello! Don't forget to log in ☺</h1>
          <p>Sorry, you must be logged in with a wallet to access the applications.</p>
          <button class="bn bn-log" @click="$modal.open('connect')">Connect your wallet</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  :root {
    --padding-ct:calc(10px + 2 * (100vw - 320px) / 1080);
    --header-app-height:calc(55px + 5 * (100vw - 320px) / 1080);
  }
  .app-container{padding:var(--padding);padding-top:0;padding-left:calc(var(--padding) / 2);width:calc(100% - var(--width-panel));left:var(--width-panel);height:calc(var(--vh, 100vh) - var(--header-height));top:var(--header-height)}
  .app-wrapper{height:100%;background-color:var(--bg-2);border-radius:var(--corner-3);box-shadow:0 0 0 1px rgba(var(--color-1-rgb),.04) inset, var(--bs-1), 0 10px 50px rgba(0,0,0,.5), 0 0 0 1px rgba(0,0,0,.4), 0 0 50px rgba(var(--bg-3-rgb),1) inset}
  .container-scroll{height:100%;width:100%;}
  .app-wrapper #smooth{height:100%;}
  .app-wrapper #smooth .scroll-content{padding-top:calc(var(--header-app-height) + var(--padding-ct));}
  .app-wrapper #smooth .scrollbar-track{position:absolute;}
  .mob .app-wrapper #smooth{padding-top:calc(var(--header-app-height) + var(--padding-ct));overflow-y:scroll;max-height:100%;}
  .need-log{position:absolute;width:100%;height:100%;display:flex;align-items:center;justify-content:center;text-align:center;}
  .need-log h1{font-family:var(--font-2);color:var(--color-3);font-size:calc(20px + 5 * (100vw - 320px) / 1080);}
  .need-log > * > * + *{margin-top:calc(15px + 5 * (100vw - 320px) / 1080);}

  @media screen and (max-width: 1084px) {
    .app-container {
      left: 0;
      width: 100%;
      padding-left: var(--padding);
      height: auto;
    }
    .need-log {
      position: relative;
      padding: var(--padding);
    }
  }
</style>