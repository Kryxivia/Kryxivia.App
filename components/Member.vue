<script setup>
  import { social as socials } from '@/datas'
  const props = defineProps({
    member: {
      type: Object,
      required: true
    }
  })
</script>

<template>
  <div class="card-hover member" data-reveal="bottom">
    <div class="photo">
      <img :src="`/img/team/${member.profil}`" width="595" height="865" :alt="`Kryxivia • ${member.name} • ${$t('team.poste.' + member.poste)}`" draggable="false" loading="lazy">
    </div>
    <div class="lang">
      <img :src="`/img/lang/${member.lang}.svg`" width="50" height="50" :alt="member.lang" draggable="false" loading="lazy">
    </div>
    <div class="m-infos">   
      <small>{{ $t('team.poste.' + member.poste) }}</small>
      <h3>{{ member.name }}</h3>
      <ul class="m-rs">
        <li v-for="social, id in member.social">
          <SocialItem :social="socials[id]" :link="social" />
        </li>
      </ul>
    </div>
  </div>
</template>