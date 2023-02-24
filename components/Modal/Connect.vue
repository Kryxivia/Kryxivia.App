<script setup>
  const wallets = {
    metamask: {
      img: '/img/wallets/metamask.svg',
      title: 'wallets.metamask.name',
      desc: 'wallets.metamask.connect'
    },
    walletconnect: {
      img: '/img/wallets/walletconnect.svg',
      title: 'wallets.walletconnect.name',
      desc: 'wallets.walletconnect.connect'
    },
    fortmatic: {
      img: '/img/wallets/fortmatic.svg',
      title: 'wallets.fortmatic.name',
      desc: 'wallets.fortmatic.connect'
    },
    bcw: {
      img: '/img/wallets/bcw.svg',
      title: 'wallets.bcw.name',
      desc: 'wallets.bcw.connect'
    }
  }
  /** fake login */
  const { connectMetamask, connectBinanceWallet, connectFormatic } = useUser()

  const connectWallet = (wallet) => {
    switch (wallet) {
      case 'metamask':
        connectMetamask()
        break
      case 'bcw':
        connectBinanceWallet()
        break
      case 'fortmatic':
        connectFormatic()
        break
      default:
        break
    }
  }

</script>

<template>
  <ModalTemplate id="connect">
    <div class="lst">
      <div v-for="wallet in wallets">
        <ModalCard :infos="wallet" @click.prevent="connectWallet(wallet.title.split('.')[1])" @click="$modal.close('connect')" />
      </div>
    </div>
  </ModalTemplate>
</template>
