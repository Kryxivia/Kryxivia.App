<script setup>
  const head = useLocaleHead({
    addDirAttribute: true,
    identifierAttribute: 'id',
    addSeoAttributes: true
  })
  
  const { idPage, metaTitle, description } = useMetaData()

  const themeColor = 'rgb(201,169,130)'
  const thumbnail = 'https://kryxivia.io/img/thumbnail.jpg'
  const url = 'https://kryxivia.io/'

  /** Init sound */
  const { $sound } = useNuxtApp()
  onMounted(() => $sound.init())
</script>

<template>
  <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
    <Head>
      <Title>{{ metaTitle }}</Title>
      <Link rel="icon" type="image/x-icon" href="/favicon.png?v=1" />
      <Meta name="viewport" content="width=device-width, initial-scale=1" />
      <Meta name="theme-color" :content="themeColor" />
      <Meta name="format-detection" content="telephone=no" />
      <Meta property="og:title" :content="metaTitle" />
      <Meta property="og:description" :content="description" />
      <Meta property="og:image" :content="thumbnail" />
      <Meta property="og:url" :content="url" />
      <Meta property="og:type" content="siteweb" />
      <Meta property="twitter:title" :content="metaTitle" />
      <Meta property="twitter:site" :content="url" />
      <Meta property="twitter:url" :content="url" />
      <Meta property="twitter:description" :content="description" />
      <Meta property="twitter:image" :content="thumbnail" />
      <Meta property="twitter:card" content="summary_large_image" />
      <template v-for="link in head.link" :key="link.id">
        <Link :id="link.id" :rel="link.rel" :href="link.href" :hreflang="link.hreflang" />
      </template>
      <template v-for="meta in head.meta" :key="meta.id">
        <Meta :id="meta.id" :property="meta.property" :content="meta.content" />
      </template>
    </Head>
    <Body :data-page-id="idPage">
      <HeaderBar />
      <slot />
      <Bottom />
      <ModalList />
    </Body>
  </Html>
</template>