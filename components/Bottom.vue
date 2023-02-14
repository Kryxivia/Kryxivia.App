<template>
  <div id="b">
    <div class="left bars">
      <div>
        <div class="txt">{{ $t('bottom.sound') }}</div>
        <Sound />
      </div>
      <div class="ln ln-space"></div>
      <div class="logo">
        <a href="https://opensea.io/collection/kryxivia" target="_blank">
          <img src="/img/opensea.svg" laoding="lazy" alt="OpenSea">
        </a>
      </div>
      <div class="ln ln-right-hide">
        <div class="arrow-right"></div>
      </div>
    </div>
    <div class="mouse">
      <div class="txt">{{ $t('bottom.scroll') }}</div>
      <div class="pointer"></div>
    </div>
    <div class="right bars">
      <div class="ln ln-left-hide">
        <div class="arrow-left"></div>
      </div>
      <div class="logo">
        <div>
          <div class="txt">{{ $t('bottom.powered') }}</div>
          <img src="/img/erc20.svg" laoding="lazy" alt="Ethereum ERC20 Chain">
        </div>
        <div class="cross"></div>
        <div>
          <div class="txt">{{ $t('bottom.developed') }}</div>
          <img src="/img/unity.svg" laoding="lazy" alt="Unity">
        </div>
      </div>
    </div>
  </div>
</template>