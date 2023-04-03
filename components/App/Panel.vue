<script setup>
  import gsap from 'gsap'

  const localePath = useLocalePath()

  /** Load user exemple */
  const { currency, isConnect, address, balance, perso, isConnectLoading } = useUser()
  const { kxa: price_kxa, kxs: price_kxs } = usePriceToken()

  /** Balance KXA to USD */
  const kxaToUsd = computed(() => formatPrice(balance.value.kxa * price_kxa.value[currency.value]))

  /** Balance KXS to USD */
  const kxsToUsd = computed(() => formatPrice(balance.value.kxs * price_kxs.value[currency.value]))

  /** Navigation dApp */
  const nav = [
    {
      title: 'app-staking.title',
      link: '/app/staking',
      icon: 'staking'
    },
    {
      title: 'app-marketplace.title',
      link: '/app/marketplace',
      icon: 'marketplace'
    },
    {
      title: 'app-nft-viewer.title',
      link: '/app/nft-viewer',
      icon: 'nft-viewer'
    },
    {
      title: 'app-bridge.title',
      link: '/app/bridge',
      icon: 'bridge'
    }
  ]

  onMounted(() => {
    const tl = gsap.timeline()
    tl
      .fromTo('.panel .top, .panel .chain-1', 1.5, {y:-50,opacity:0}, {y:0,opacity:1,ease:'power3.inOut'}, 'a')
      .fromTo('.panel .tok, .panel .chain-2', 1.5, {y:-80,opacity:0}, {y:0,opacity:1,ease:'power3.inOut'}, 'a')
      .fromTo('.panel .nav', 1.5, {y:-110,opacity:0}, {y:0,opacity:1,ease:'power3.inOut'}, 'a')
      .fromTo('.app-container', 1.5, {x:110,opacity:0}, {x:0,opacity:1,ease:'power3.inOut'}, 'a')
  })

  watchEffect(() => {
    console.log('isConnectLoading', isConnectLoading.value)
  })

</script>

<template>
  <aside class="panel-wrapper">
    <div class="panel">
      <template v-if="isConnect">
        <div class="top">
          <div class="avatar"></div>
          <div class="perso">{{ address }}</div>
        </div>
        <div class="chain chain-1"></div>
        <div class="bottom tok">
          <ul class="token">
            <li class="kxa">
              <a>
                <img src="/img/tokens/kxa-shape.png" alt="KXA">
                <div class="n">KXA</div>
                <strong>
                  <div class="perso">{{ balance.kxa.toFixed(2) }}</div>
                  <small>{{ kxaToUsd }}</small>
                </strong>
              </a>
            </li>
            <li class="kxs">
              <a>
                <img src="/img/tokens/kxs-shape.png" alt="KXS">
                <div class="n">KXS</div>
                <strong>
                  <div class="perso">{{ balance.kxs }}</div>
                  <small>{{ kxsToUsd }}</small>
                </strong>
              </a>
            </li>
          </ul>
        </div>
      </template>
      <template v-else-if="isConnectLoading === false">
        <div class="top top-log">
          <button class="bn bn-log" @click="$modal.open('connect')">Connect your wallet</button>
        </div>
      </template>
      <template v-else>
        <div class="top top-log">
          <button class="bn bn-log" @click="$modal.open('connect')">Helllo</button>
        </div>
      </template>
      <div class="chain chain-2"></div>
      <div class="bottom nav"> 
        <ul>
          <li v-for="li in nav">
            <NuxtLink :to="localePath(li.link)" @click="$navigation.close()">
              <Icon v-if="li.icon" :icon="li.icon" />
              <span>{{ $t(li.title) }}</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<style>
  :root{
    --header-height:calc(var(--padding) * 3);
    --width-panel:calc(var(--padding) + 250px + 20 * (100vw - 320px) / 1080);
  }
  .panel-wrapper{padding:var(--padding);padding-right:0;padding-top:0;position:fixed;top:var(--header-height);width:var(--width-panel);height:calc(var(--vh, 100vh) - var(--header-height));}
  .panel{--gap:calc(14px + 5 * (100vw - 320px) / 1080);min-height:100%;display:flex;flex-direction:column;}
  .panel > *:not(.chain){border-radius:var(--corner-3);background-color:var(--bg-2);z-index:5;box-shadow:0 0 0 1px rgba(var(--color-1-rgb),.04) inset, var(--bs-1), 0 10px 25px rgba(0,0,0,.5), 0 0 0 1px rgba(0,0,0,.4), 0 0 35px rgba(var(--bg-3-rgb),1) inset;}
  .panel .chain{height:calc(var(--padding) / 2);width:100%;z-index:1;display:flex;align-items:center;justify-content:space-between;padding:0 calc(var(--padding) / 2)}
  .panel .chain:before, .panel .chain:after{content:'';background:url(/img/chain.png) no-repeat;background-size:8px auto;display:block;height:100%;flex:1;}
  .panel .chain:after{background-position:center right;}
  .panel .top{--av:calc(35px + 4 * (100vw - 320px) / 1080);--p:calc(var(--gap) / 1.5);display:flex;align-items:center;padding:var(--p);}
  .panel .top .avatar{border:1px solid rgba(var(--color-4-rgb),.2);width:var(--av);height:var(--av);min-width:var(--av);background:radial-gradient(var(--bg-3), var(--bg-1));margin-right:calc(var(--p) - 3px);border-radius:var(--corner-1)}
  .panel .top .address{margin-bottom:5px;opacity:.7;font-size:11px;width:calc(100% - var(--av) - var(--p) * 2);overflow:hidden;text-overflow:ellipsis;}
  .panel .top .perso{font-size:calc(15px + 3 * (100vw - 320px) / 1080);font-family:var(--font-2);width:100%;overflow:hidden;text-overflow:ellipsis;}
  .panel .bottom{--size:calc(13px + 2 * (100vw - 320px) / 1080);;}
  .panel ul{font-size:var(--size);font-weight:bold;}
  .panel li + li{border-top:1px solid rgba(var(--color-1-rgb),.05)}
  .panel li a{color:var(--color-1);display:flex;align-items:center;padding:var(--gap) calc(var(--gap) * 1.2) calc(var(--gap) - 1px);border-width:1px 0 1px 0;}
  .panel li svg{transform:scale(1.1);stroke:rgba(var(--color-4-rgb),.5);transition:stroke var(--transi-b);fill:transparent;margin-right:var(--gap);top:-1px;width:calc(var(--size) * 1.2);}
  .panel li a span{left:0;transition:left var(--transi-b);}
  .panel li a:hover svg{stroke:var(--color-4)}
  .panel li a.router-link-active svg{stroke:var(--color-2)}
  .panel li:first-child a{border-top-right-radius:var(--radius-2);}
  .panel li:last-child a{border-bottom-left-radius:var(--radius-2);}
  .panel li a:hover,
  .panel li a.router-link-active{background-color:rgba(var(--bg-3-rgb),.3);}
  .panel li a.router-link-active{color:var(--color-3);}
  .panel li a:before{background:linear-gradient(to right, rgb(var(--c, var(--color-2-rgb))), transparent);border-radius:inherit;content:'';transition:opacity var(--transi-b), width var(--transi-b);width:30%;height:100%;opacity:0;position:absolute;left:0;top:0}
  .panel li a:hover:before{opacity:.05;width:100%}
  .panel li a.router-link-active:before{opacity:.15;width:100%}
  .panel .token li a{display:flex;padding:16px 17px 14px;}
  .panel .token li.kxa{--c:var(--kxa-rgb);}
  .panel .token li.kxs{--c:var(--kxs-rgb);}
  .panel .token li img{width:10px;top:-1px;transform:scale(2);margin-right:15px;}
  .panel .token li strong{margin:-3px 0;margin-left:auto;text-align:right;font-size:13px;color:rgb(var(--c))}
  .panel .token li small{font-size:12px;margin-top:3px;font-weight:normal;display:block;color:var(--color-4);opacity:.7}
  .panel .bn-log{width:100%;}
</style>