<script setup> 
  const { currency, balance } = useUser()
  const { stakeKXA, unStakeKXA, stakedKXA, totalStakedKXA, claimableKXA, claimRewards, totalStakers, unlockedAPR, lockedAPR, isStakedLocked, kxaLockEndTimestampMs, amountLockDays, stakeTxState, unstakeTxState, claimTxState, stakeError, unstakeError, claimError, txHash } = useStake()
  const { kxa: price_kxa } = usePriceToken()
  const kxa = computed(() => balance.value.kxa)

  const stake = ref('')
  const lockStake = ref(false)
  const stake_currency = computed(() => formatPrice(stake.value * price_kxa.value[currency.value]))
  const kxaToUsd = (kxa) => {
    return formatPrice(kxa * price_kxa.value[currency.value])
  }

  // infoBox states
  const isInfoErrorBoxOpen = ref(false)
  const infoBoxErrorMessage = ref('')
  const isInfoTxStateBoxOpen = ref(false)
  const infoBoxTxStateMessage = ref('')

  const closeInfoErrorBox = () => {
    isInfoErrorBoxOpen.value = false
    stakeError.value = ''
    unstakeError.value = ''
    claimError.value = ''
  }

  const closeInfoTxStateBox = () => {
    isInfoTxStateBoxOpen.value = false
    stakeTxState.value.message = ''
    unstakeTxState.value.message = ''
    claimTxState.value.message = ''
  }

// detect staking errors
  watchEffect(() => {
    if (stakeError.value) {
      isInfoErrorBoxOpen.value = true
      isInfoTxStateBoxOpen.value = false
      unstakeError.value = ''
      claimError.value = ''
      infoBoxErrorMessage.value = stakeError.value
    }
  })

  watchEffect(() => {
    if (unstakeError.value) {
      isInfoErrorBoxOpen.value = true
      isInfoTxStateBoxOpen.value = false
      stakeError.value = ''
      claimError.value = ''
      infoBoxErrorMessage.value = unstakeError.value
    }
  })

  watchEffect(() => {
    if (claimError.value) {
      isInfoErrorBoxOpen.value = true
      isInfoTxStateBoxOpen.value = false
      stakeError.value = ''
      unstakeError.value = ''
      infoBoxErrorMessage.value = claimError.value
    }
  })

// detect staking tx state
  watchEffect(() => {
    if (stakeTxState.value.message) {
      isInfoTxStateBoxOpen.value = true
      infoBoxTxStateMessage.value = stakeTxState.value.message
    } else {
      isInfoTxStateBoxOpen.value = false
    }
  })

  watchEffect(() => {
    if (unstakeTxState.value.message) {
      isInfoTxStateBoxOpen.value = true
      infoBoxTxStateMessage.value = unstakeTxState.value.message
    } else {
      isInfoTxStateBoxOpen.value = false
    }
  })

  watchEffect(() => {
    if (claimTxState.value.message) {
      isInfoTxStateBoxOpen.value = true
      infoBoxTxStateMessage.value = claimTxState.value.message
    } else {
      isInfoTxStateBoxOpen.value = false
    }
  })

  /** Percent button */
  const percents = [5,25,50,75,100]
  function percentStake(percent) {
    stake.value = ((percent * kxa.value) / 100).toFixed(5)
  }

</script>

<template>
  <AppContainer>
    <div class="staking">
      <div class="top box">
        <div class="left">
          <h1>Staking Dashboard</h1>
          <div class="desc">
            <p>Stake your KXA tokens and win rewards by showing your commitment and belief in the Kryxivia development and future!</p>
          </div>
        </div>
        <div class="right box">
          <div class="fd">
            <button class="bn" @click="lockStake = !lockStake" style="margin-left: 0;">
              <img :src="lockStake ? '/img/lockClosed.svg' : '/img/lockOpen.svg'" alt="lock">
            </button>
            <img src="/img/tokens/kxa-shape.png" alt="KXA">
            <small>{{ stake_currency }}</small>
            <input v-model="stake" :max="kxa" :min="15000" type="number" placeholder="0.0">
            <button @click="stakeKXA(stake, lockStake)" class="bn">
              <div v-if="stakeTxState.loading" class="spinner">
                <div class="spinner-inner"></div>
              </div>
              <span v-else>Stake now</span>
            </button>
          </div>
          <div class="percent">
            <button v-for="percent in percents" @click="percentStake(percent)">{{ percent }}%</button>
          </div>
          <div class="lock-warning-message" v-if="stake && Number(stake) < 15000">
            <span style="color:red">Not enough KXA. The minimum stake is 15,000 KXA</span>
          </div>
          <div class="lock-warning-message" :style="lockStake ? {display: 'flex'} : {display: 'none'}">
            <img style="width: 17px;" src="/img/importantInfoIcon.svg" alt="lock kxa warning message">
            <span>You're KXA stake will be locked {{ amountLockDays != undefined && `for ${amountLockDays} days` }}</span>
          </div>
        </div>
      </div>
      <div class="bloc">
        <div>
          <div class="box">
            <div class="sub">Total Staked KXA</div>
            <span>{{ Number(totalStakedKXA).toFixed(2) }} KXA</span>
            <small>{{ kxaToUsd(Number(totalStakedKXA)) }}</small>
            <div class="users">Total of users staking KXA : <strong>{{ totalStakers }}</strong></div>
          </div>
        </div>
        <div>
          <div class="box">
            <div class="sub">My Staked KXA</div>
            <span>{{ Number(stakedKXA).toFixed(2) }} KXA</span>
            <small>{{ kxaToUsd(Number(stakedKXA)) }}</small>
            <button @click="unStakeKXA()" class="bn">
              <div v-if="unstakeTxState.loading" class="spinner">
                <div class="spinner-inner"></div>
              </div>
              <p v-else>Withdraw</p>
            </button>
          </div>
        </div>
        <div>
          <div class="box">
            <div class="sub">My Claimable Rewards</div>
            <span>{{ claimableKXA.toFixed(2) }} KXA</span>
            <small>{{ kxaToUsd(claimableKXA) }}</small>
            <button @click="claimRewards" class="bn">
              <div v-if="claimTxState.loading" class="spinner">
                <div class="spinner-inner"></div>
              </div>
              <p v-else>Claim rewards</p>
            </button>
          </div>
        </div>
      </div>
      <div v-if="isInfoErrorBoxOpen" class="infoBox">
        <h2 style="color:red;">
          <strong>Error:</strong> {{ infoBoxErrorMessage }}
        </h2>
        <button class="bn" @click="closeInfoErrorBox">
          close
        </button>
      </div>
      <div v-if="isInfoTxStateBoxOpen" class="infoBox">
        <h2 style="text-overflow: ellipsis;white-space:nowrap;width:80%;">
          {{ infoBoxTxStateMessage }} 
          <a style="text-decoration:underline;" target="_blank" :href="'https://etherscan.io/tx/' + txHash" v-if="infoBoxTxStateMessage.includes('Successfully')">{{ txHash }}</a>
        </h2>
        <div v-if="claimTxState.loading || unstakeTxState.loading || stakeTxState.loading" class="spinner" style="margin-right:10px;">
          <div class="spinner-inner"></div>
        </div>
        <button v-else class="bn" @click="closeInfoTxStateBox">
          close
        </button>
      </div>
      <div class="box box-smooth">
        <Smooth :footer="false" :delegate="false">
          <div class="content">
            <div v-if="Number(stakedKXA) > 0">
              <h2>Your staked KXAs are {{ isStakedLocked ? "locked" : "unlocked" }}, your current APR is: {{ isStakedLocked ? lockedAPR : unlockedAPR }}%</h2>
              <div class="p">
                <p>Depending on whether your KXAs are locked or unlocked, your APR varies. If you wish to lock your KXAs, make sure you withdraw them before you lock tokens in your new stake.</p>
              </div>
            </div>
            <div v-if="Number(stakedKXA) > 0">
              <h2>Unlock Date: {{ isStakedLocked ? `${new Date(kxaLockEndTimestampMs).toDateString()} (in ${msToFormatedDays(kxaLockEndTimestampMs - Date.now())} days)` : "Your KXA tokens are unlocked" }} </h2>
              <div class="p">
                <p>Date at which your KXA will be unlocked.</p>
              </div>
            </div>
            <h2>Default KXA APR: {{ unlockedAPR }}%</h2>
            <div class="p">
              <p>By default, if you decide to be able to withdraw your stake at any time, the rewards rate is up to <span style="font-weight: bold;">5% APR</span>.</p>
            </div>
            <h2>Locked KXA APR: {{ lockedAPR }}%</h2>
            <div class="p">
              <p>You can also decide to show commitment to Kryxivia and lock-up your KXA for 3 months (90 days) and win a rewards rate up <span style="font-weight: bold;">10% APR</span>.<br/>
              We may also allocate exclusive benefits to stakers that lock-up, such as specials nfts or being eligible in priority for airdrops/whitelists.</p>
            </div>
          </div>
        </Smooth>
      </div>
    </div>
  </AppContainer>
</template>

<style>
  .staking{padding:var(--padding-ct);display:flex;flex-direction:column;height:100%;}
  .staking .box{padding:var(--gap);border-radius:var(--corner-3);background-color:var(--bg-2);box-shadow:0 0 0 1px rgba(var(--color-1-rgb),.04) inset, var(--bs-1), 0 10px 50px rgba(0,0,0,.5), 0 0 0 1px rgba(0,0,0,.4), 0 0 50px rgba(var(--bg-3-rgb),1) inset}
  .staking .infoBox{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;min-height: 41px;padding:var(--gap);padding-left: 10px;border-radius:var(--corner-3);background-color:var(--bg-2);box-shadow:0 0 0 1px rgba(var(--color-1-rgb),.04) inset, var(--bs-1), 0 10px 50px rgba(0,0,0,.5), 0 0 0 1px rgba(0,0,0,.4), 0 0 50px rgba(var(--bg-3-rgb),1) inset}
  
  .staking .top{padding:calc(10px + 5 * (100vw - 320px) / 1080);display:flex;align-items:stretch;background:linear-gradient(to right, rgba(var(--bg-1-rgb),.7), rgba(var(--bg-1-rgb),0)), url(/img/bg-page.jpg) center top no-repeat;background-size:cover;}
  .staking .top .left{--gap:calc(20px + 5 * (100vw - 320px) / 1080);flex:1;padding:var(--gap);align-self:center;}
  .staking .top .left h1{margin-bottom:calc(var(--gap) / 2);font-size:calc(20px + 10 * (100vw - 320px) / 1080);color:var(--color-3);font-family:var(--font-2);}
  .staking .top .left .desc{line-height:1.3;}
  .staking .top .right{--gap:calc(15px + 10 * (100vw - 320px) / 1080);width:50%;padding:var(--gap);background-color:rgba(var(--bg-1-rgb),.5);backdrop-filter:blur(10px);}
  .staking .top .right h2{font-family:var(--font-2);}
  .staking .fd{--h:calc(45px + 5 * (100vw - 320px) / 1080);display:flex;align-items:center;background-color:var(--bg-1);height:var(--h);box-shadow:0 0 10px rgba(var(--bg-1-rgb),.5) inset, 0 0 0 1px rgba(var(--color-1-rgb),.04);border-radius:var(--corner-1);}
  .staking .fd small{font-size:12px;color:var(--color-4);opacity:.75}
  .staking .fd img{height:calc(var(--h) - 15px);margin:0 10px;}
  .staking .fd input{text-align:right;color:var(--color-1);height:100%;background:transparent;font-size:calc(18px + 2 * (100vw - 320px) / 1080);padding-top:2px;padding-right:12px;width:100%;}
  .staking .fd input:placeholder{padding-top:15px}
  .staking .fd .bn{white-space:nowrap;height:100%;margin-left:5px;}
  .staking .percent{display:flex;margin-top:10px;box-shadow:0 0 10px rgba(var(--bg-1-rgb),.5) inset, 0 0 0 1px rgba(var(--color-1-rgb),.04);border-radius:var(--corner-1);}
  .staking .percent button{color:var(--color-4);background-color:var(--bg-1);flex:1;font-size:11px;padding:7px 0 6px;letter-spacing:1px;}
  .staking .percent button:hover{background-color:var(--bg-3);color:var(--color-3)}
  .staking .percent button:first-child{border-bottom-left-radius:var(--radius-1);}
  .staking .percent button:last-child{border-top-right-radius:var(--radius-1);}
  .staking .percent button + button{margin-left:1px}

  .staking .bloc{--gutter:calc(var(--padding-ct) / 2);gap:var(--gutter);margin:var(--gutter) 0;display:flex;align-items:stretch;flex-wrap:wrap;}
  .staking .bloc > *{flex:1;}
  .staking .bloc .box{--g:3px;--pad:calc(20px + 5 * (100vw - 320px) / 1080);text-align:center;padding:var(--pad);height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;}
  .staking .bloc .box:before{opacity:.3;transition:opacity var(--transi);z-index:5;border:1px solid var(--color-line);width:calc(100% - var(--g) * 2);height:calc(100% - var(--g) * 2);top:var(--g);left:var(--g);pointer-events:none;position:absolute;content:'';border-radius:inherit}
  .staking .bloc .box:hover:before{opacity:1}
  .staking .bloc .sub{font-size:10px;letter-spacing:2px;}
  .staking .bloc span{font-weight:bold;font-size:calc(18px + 2 * (100vw - 320px) / 1080);color:var(--color-3);margin:calc(var(--pad) / 1.5) 0 calc(var(--pad) / 3);font-family:var(--font-2);display:block;}
  .staking .bloc small{font-size:calc(13px + 2 * (100vw - 320px) / 1080);color:var(--color-4);display:block;margin-bottom:calc(var(--pad) / 1.5);}
  .staking .bloc .users{font-size:calc(12px + 1 * (100vw - 320px) / 1080);color:var(--color-4);opacity:.7}
  .staking .bloc .bn{--fs:12px;z-index:5;border-radius:var(--radius-1) var(--radius-1) 0 0;margin-bottom:calc(var(--pad) * -1);}

  .staking .box-smooth{flex:1;padding:0;overflow:hidden;}
  .staking .box-smooth #smooth{position:absolute;top:0;left:0;width:100%;height:100%}
  .staking .box-smooth #smooth .scroll-content{padding-top:0;}
  .staking .content{--pad:calc(25px + 5 * (100vw - 320px) / 1080);line-height:1.5;padding:var(--pad);}
  .staking .content > * + *{margin-top:calc(var(--pad) / 1.5)}
  .staking .content h2{font-family:var(--font-2);color:var(--color-3);font-size:calc(16px + 2 * (100vw - 320px) / 1080);}
  .staking .content h2 + *{margin-top:calc(var(--pad) / 2);}
  .staking .content .p{color:var(--color-4);opacity:.75;}
  .staking .lock-warning-message{color:var(--color-4);opacity:.75;margin-top: 7px;display:flex;align-items:center;gap:5px;}

  /* .snackBarContainer{position:fixed;bottom:0;left:0;width:100%;z-index:9999;display:flex;justify-content:center;align-items:center;}
  .snackBar{width:min-content;}
  .snackBar .close{position:absolute;right:10px;top:50%;transform:translateY(-50%);cursor:pointer;}
  .snackBarClosed{opacity:0;transform:translateY(100%);transition:all .3s ease-in-out;} */

  @media screen and (max-width: 1350px) {
    .staking .top{
      display: block;
    }
    .staking .top .right {
      width: 100%;
    }
  }
  @media screen and (max-width: 1084px) {
    .staking .bloc > *:first-child{
      min-width: 100%;
    }
    .staking .box-smooth {
      overflow: visible;
    }
    .staking .box-smooth #smooth {
      position: relative;
      padding-top: var(--padding-ct);
    }
  }
  @media screen and (max-width: 650px) {
    .staking .fd {
      height: auto;
      flex-wrap: wrap;
      gap: 5px;
      padding: 5px;
    }
    .staking .fd > * {
      z-index: 20;
    }
    .staking .fd .bn {
      flex: 1;
      height: var(--h);
      margin-left: 0;
    }
    .staking .fd .bn img {
      width: 20px;
      margin: -5px;
    }
    .staking .fd input {
      text-align: center;
      height: var(--h);
      padding: 0;
      font-weight: bold;
    }
    .staking .fd > *:nth-child(1) {
      order: 10;
    }
    .staking .fd > *:nth-child(2) {
      position: absolute;
      left: 10%;
      top: 5%;
      width: 100px;
      height: auto;
      opacity: .2;
      pointer-events: none;
      z-index: 0;
    }
    .staking .fd > *:nth-child(3) {
      order: 5;
      min-width: 100%;
      text-align: center;
      top: -10px;
    }
    .staking .fd > *:nth-child(5) {
      order: 15;
    }
  }
  @media screen and (max-width: 500px) {
    .staking .bloc {
      flex-direction: column;
    }
  }
</style>