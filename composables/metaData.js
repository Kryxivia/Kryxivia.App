export const useMetaData = () => {

  const route = useRoute()
  const { t } = useI18n()

  const idPage = computed(() => route.name.split('___')[0])
  const metaTitle = computed(() => t(idPage.value + '.metaTitle'))
  const title = computed(() => t(idPage.value + '.title'))
  const description = computed(() => t('all.desc'))

  return {
    idPage,
    metaTitle,
    title,
    description
  }

}