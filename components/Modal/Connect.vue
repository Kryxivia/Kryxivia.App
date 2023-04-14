<script setup>
  const wallets = {
    metamask: {
      img: '/img/wallets/metamask.svg',
      title: 'wallets.metamask.name',
      desc: 'wallets.metamask.connect',
      disabled: false
    },
    OKX: {
      img: '/img/wallets/okx_wallet_icon.svg',
      title: 'wallets.OKX.name',
      desc: 'wallets.OKX.connect',
      disabled: false
    },
    walletconnect: {
      img: '/img/wallets/walletconnect.svg',
      title: 'wallets.walletconnect.name',
      desc: 'wallets.walletconnect.connect',
      disabled: true
    },
    bcw: {
      img: '/img/wallets/bcw.svg',
      title: 'wallets.bcw.name',
      desc: 'wallets.bcw.connect',
      disabled: true
    }
  }
  /** web3 login */
  const { connectMetamask, connectBinanceWallet, connectFormatic, connectOKXWallet, connectWalletConnect } = useUser()

  const connectWallet = (wallet) => {
    switch (wallet) {
      case 'metamask':
        connectMetamask()
        break
      case 'bcw':
        connectBinanceWallet()
        break
      case 'OKX':
        connectOKXWallet()
        break
      case 'walletconnect':
        connectWalletConnect()
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
