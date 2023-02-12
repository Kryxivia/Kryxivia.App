<script setup>
  import { tokens } from '@/datas'
  
  useTokenPage()

  const token = tokens.kxa
  const distribution = [
    {title: 'token-kxa.td1', percent: 3, kxa: "7,500,000"},
    {title: 'token-kxa.td2', percent: 5, kxa: "12,500,000"},
    {title: 'token-kxa.td3', percent: 2, kxa: "5,000,000"},
    {title: 'token-kxa.td4', percent: 1.5, kxa: "3,750,000"},
    {title: 'token-kxa.td5', percent: 12, kxa: "30,000,000"},
    {title: 'token-kxa.td6', percent: 20, kxa: "50,000,000"},
    {title: 'token-kxa.td7', percent: 20, kxa: "50,000,000"},
    {title: 'token-kxa.td8', percent: 15, kxa: "37,500,000"},
    {title: 'token-kxa.td9', percent: 21.5, kxa: "53,750,000"}
  ]
  const wallets = [
    {title: 'token-kxa.wallet1', address: "0x605639FfFdBf3747A886fbFd47B159BF88263394"},
    {title: 'token-kxa.wallet2', address: "0xF545E579405b7c509015261b655d09A13A16b086"},
    {title: 'token-kxa.wallet3', address: "0x7565c31Ec279d4FE4A2C25682dA97acA30be0777"},
    {title: 'token-kxa.wallet4', address: "0x2EbbD13738aB2382EFC3121b914b36fD7dDF51c7"},
    {title: 'token-kxa.wallet5', address: "0xD977D77BEF0B65853Db51082768e0bCEa4f87ddA"},
    {title: 'token-kxa.wallet6', address: "0x93B4A95bfEB24d6B1257c1A3D86707697FD4C94B"},
    {title: 'token-kxa.wallet7', address: "0xDc0bd03a555b81A5450dF5341F1F2a684dbE824F"},
    {title: 'token-kxa.wallet8', address: "0x7D2d8A5E03b1ec92B2375a4CA3c9FE49d1E42Aae"}
  ]
</script>

<template>
  <Smooth>
    <div class="top-page top-token">
      <div class="l" data-reveal>
        <div class="tok">
          <img src="/img/tokens/kxa-shape.png" alt="$KXA" loading="lazy" draggable="false">
        </div>
        <div class="plan-w">
          <div v-for="i in 3" :class="`plan plan-${i}`">
            <img :src="`/img/tokens/plan-${i}_kxa.png`" alt="KXA" loading="lazy" draggable="false">
          </div>
          <Bg />
        </div>
      </div>
      <div class="r">
        <div class="cont">
          <img src="/img/kxa-token_kryxivia.png" class="ico" width="100" height="100" alt="KXA" loading="lazy" data-reveal="top">
          <LnHr />
          <div class="sub" data-reveal="bottom">{{ token.address }}</div>
          <h1 data-reveal="bottom">{{ $t('token-kxa.h1') }}</h1>
          <div class="intro" data-reveal="bottom">
            <p>{{ $t('token-kxa.intro') }}</p>
          </div>
          <div class="txt" data-reveal="bottom">
            <p>{{ $t('token-kxa.txt1') }}</p>
            <p>{{ $t('token-kxa.txt2') }}</p>
          </div>
          <div class="butt" data-reveal="bottom">
            <a href="https://coinmarketcap.com/currencies/kryxivia/markets/" target="_blank" rel="noreferrer noopener" class="bn bn-max">{{ $t('all.buy') }} $KXA</a>
          </div>
        </div>
      </div>
    </div>
    <div class="sec sec-toke">
      <div class="ct">
        <div class="sub" data-reveal="bottom">{{ $t('token-kxa.sub') }}</div>
        <h2 class="title" data-reveal="bottom">{{ $t('token-kxa.title1') }}</h2>
        <TitleH2 :txt="$t('token-kxa.subtitle1')" data-reveal="bottom"/>
        <div class="tble tble-toke tble-toke-distri" data-reveal="bottom">
          <table>
            <tbody>
              <tr v-for="td in distribution">
                <td width="100%">{{ $t(td.title) }}</td>
                <td class="c">{{ td.percent }}%</td>
                <td class="r">{{ td.kxa }} $KXA</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col">
          <div>
            <TitleH2 :txt="$t('token-kxa.subtitle2')" data-reveal="bottom"/>
            <div class="tble tble-toke tble-toke-wallet" data-reveal="bottom">
              <table>
                <tbody>
                  <tr v-for="td in wallets">
                    <td width="100%">
                      <a :href="`https://bscscan.com/address/${td.address}`" rel="noreferrer noopener" target="_blank" :title="td.address">
                        <strong>{{ $t(td.title) }}</strong>
                        <small>{{ td.address }}</small>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <TitleH2 :txt="$t('token-kxa.subtitle3')" data-reveal="bottom"/>
            <div class="tble tble-toke tble-toke-sale" data-reveal="bottom">
              <table>
                <tbody>
                  <tr>
                    <td width="100%">
                      <strong>{{ $t('token-kxa.sale.private.title') }}</strong>
                      <ul>
                        <li>{{ $t('token-kxa.sale.private.discount', {percent:'25%'}) }}</li>
                        <li>{{ $t('token-kxa.sale.private.of', {kxa:'50,000,000',total:'50M',percent:'20%'}) }}</li>
                        <li>1 BNB: ~ 54,000 KXA</li>
                        <li>1 KXA: ~ 0.00002144 BNB</li>
                        <li>{{ $t('token-kxa.sale.private.price', {price:'$0.012'}) }}</li>
                        <li>{{ $t('token-kxa.sale.private.raise', {bnb:1072,total:'$600k'}) }}</li>
                      </ul>
                      <small>{{ $t('token-kxa.sale.private.close', {percent:'25%'}) }}</small>
                    </td>
                  </tr>
                  <tr>
                    <td width="100%">
                      <strong>{{ $t('token-kxa.sale.public.title') }}</strong>
                      <ul>
                        <li>{{ $t('token-kxa.sale.public.discount', {percent:'15%'}) }}</li>
                        <li>{{ $t('token-kxa.sale.public.of', {kxa:'50,000,000',total:'50M',percent:'20%'}) }}</li>
                        <li>1 BNB: ~ 43,333 KXA</li>
                        <li>1 KXA: ~ 0.0000268 BNB</li>
                        <li>{{ $t('token-kxa.sale.public.price', {price:'$0.015'}) }}</li>
                        <li>{{ $t('token-kxa.sale.public.raise', {bnb:1340,total:'$750k'}) }}</li>
                      </ul>
                      <small>{{ $t('token-kxa.sale.public.close', {percent:'25%'}) }}</small>
                    </td>
                  </tr>
                  <tr>
                    <td width="100%">
                      <strong>{{ $t('token-kxa.sale.listing.title') }}</strong>
                      <ul>
                        <li>{{ $t('token-kxa.sale.listing.price', {price:'$0.01725'}) }}</li>
                        <li>{{ $t('token-kxa.sale.listing.raise', {percent:'100%'}) }}</li>
                        <li>1 BNB: ~ 37,680 KXA</li>
                        <li>1 KXA: ~ 0.00003082 BNB</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Smooth>
</template>