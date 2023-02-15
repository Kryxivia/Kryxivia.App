<script setup>
  const runTimeConfig = useRuntimeConfig()
  const max_player = 100

  const { data: players, pending, error } = await useLazyFetch(runTimeConfig.public.api.leader_solo, {
    method: 'POST',
    body: { 
      limit: max_player
    }
  })

  function rank(i) {
    return i+1
  }
</script>

<template>
  <Smooth>
    <TitlePage :h1="$t('leaderboard.h1')" icon="icon/leaderboard" />
    <div class="ct">
      <div class="lb" data-reveal="bottom">
        <Loader v-if="pending" />
        <div v-else-if="error" class="sec-toke">Unable to load leaderboard at this time.</div>
        <template v-else>
          <div v-for="player, key in players.entries" :class="`card lb-card rank-${rank(key)}`">
            <div class="pos">
              <img v-if="key < 3" :src="`/img/leaderboard/leader-${rank(key)}.png`" width="71" height="50" loading="lazy" :alt="rank(key)">
              <span v-else>{{ rank(key) }}</span>
            </div>
            <div class="name">
              <span class="dgr">{{ player.characterName }}</span>
            </div>
            <div class="score">
              <span class="dgr">{{ player.finalRank.toFixed(0) }}</span>
              <small class="sub">Score</small>
            </div>
          </div>
        </template>
      </div>
    </div>
  </Smooth>
</template>