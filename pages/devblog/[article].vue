<script setup>
  import { devblog } from '@/datas'

  const { t } = useI18n()
  const localePath = useLocalePath()
  const route = useRoute()

  const id = route.params.article
  const article = devblog[id]
  const content = article.lang.en

  /** Set id page with alias */
  const { setMetaTitle } = useMetaData()
  setTimeout(() => setMetaTitle(`${t('devblog-article.metaTitle')} • ${content.title}`), 0)
</script>

<template>
  <Smooth>
    <TitlePage :h1="content.title" icon="icon/devblog" />
    <div class="ct ct-article">
      <div class="head">
        <div class="intro">
          <p>{{ content.desc }}</p>
        </div>
        <DateFormat :date="article.date" />
      </div>
      <div class="content">
        <div class="card cover">
          <img :src="`/img/devblog/${article.cover}`" loading="lazy" :alt="content.title">
        </div>
        <LnShape />
        <div v-for="block, key in content.content" :key="key" :class="`block-${block.type}`">
          <DevblogBlocTitle :content="block" v-if="block.type === 'title'" />
          <DevblogBlocParagraphe :content="block" v-else-if="block.type === 'txt'" />
          <DevblogBlocPicture :content="block" v-else-if="block.type === 'img'" />
        </div>
        <LnShape />
        <div class="butt">
          <NuxtLink class="bn" :to="localePath('/devblog')" :title="$t('devblog.back')">{{ $t('devblog.back') }}</NuxtLink>
        </div>
      </div>
    </div>
  </Smooth>
</template>