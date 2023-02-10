<script setup>
  import { team as members } from '@/datas'
  const { t } = useI18n()
  const roles = {
    1: t('team.role.1'),
    2: t('team.role.2'),
    3: t('team.role.3'),
    4: t('team.role.4'),
    5: t('team.role.5'),
    6: t('team.role.6')
  }
</script>

<template>
  <Smooth>
    <TitlePage :h1="$t('team.h1')" icon="icon/team" />
    <div class="ct m-ct">
      <div v-for="role, id in roles">
        <TitleH2 :txt="role" data-reveal />
        <div class="m-lst">
          <Member v-for="member in members[id]" :member="member" />
        </div>
      </div>
    </div>
  </Smooth>
</template>