<template>
  <div class="box coming">
    <p>
      ⚠ This is not yet available, please use our <a style="text-decoration: underline;" target="_blank" href="https://app.kryxivia.io/">current decentralized app</a> or <a style="text-decoration: underline;color:#64acff" href="https://opensea.io/collection/kryxivia" target="_blank">opensea</a> ⚠ 
    </p>
  </div>
</template>
<style scoped>
  .box.coming {
    color: #64acff;
    position: absolute;
    width: 100%;
    z-index: 50;
    top: 0;
    height: 100%;
    background: opacity .5s;
    background-color: rgba(var(--bg-2-rgb),.85);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 20px;
    line-height: 1.2;
  }

  @media screen and (max-width: 1084px) {
    .box.coming {
      align-items: flex-start;
      padding-top: calc(50vh - var(--header-height) - 50px);
    }
  }
</style>
