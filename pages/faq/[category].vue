<script setup>
  import { faq } from '@/datas'

  const { t, messages, locale } = useI18n()
  const localePath = useLocalePath()
  const route = useRoute()
  const slug = route.params.category

  const content = messages.value[locale.value].faq[slug].list

  /** Set meta title with alias */
  const { setMetaTitle } = useMetaData()
  setTimeout(() => setMetaTitle(`${t('faq.metaTitle')} • ${t(`faq.${slug}.title`)}`), 0)
</script>

<template>
  <Smooth>
    <TitlePage :h1="$t(`faq.${slug}.title`)" :icon="'faq/' + faq[slug].icon" />
    <div class="ct">
      <div class="faq-page">
        <aside>
          <TitleH2 :txt="$t('faq.category')" />
          <nav>
            <ul>
              <li v-for="cat, slug in faq">
                <FaqCard :cat="cat" :slug="slug" />
              </li>
            </ul>
          </nav>
        </aside>
        <div class="faq-cont">
          <TitleH2 :txt="$t('faq.h1')" />
          <div v-if="content.length > 0" class="lst-q">
            <div v-for="question in content" class="card card-ans" data-reveal="bottom">
              <FaqHeading :title="question.q.source" />
              <div class="ans">
                <div class="p">
                  <div v-for="reponse in question.a">
                    <p v-if="reponse.t.source === 'txt'" v-html="reponse.c.source"></p>
                    <p v-else-if="reponse.t.source === 'button'"><a class="bn" target="_blank" :href="reponse.link.source" :title="reponse.c.source" v-html="reponse.c.source"></a></p>
                  </div>
                </div>
              </div>
            </div>
            <FaqMessage :title="$t('faq.no-answer')" />
          </div>
          <div v-else class="lst-q">
            <FaqMessage :title="$t('faq.no-question')" />
            <FaqMessage :title="$t('faq.no-answer')" />
          </div>
          <div class="faq-foot">
            <LnShape data-reveal />
            <div class="butt" data-reveal="bottom">
              <NuxtLink class="bn" :to="localePath('/faq')" :title="$t('faq.back')">{{ $t('faq.back') }}</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Smooth>
</template>