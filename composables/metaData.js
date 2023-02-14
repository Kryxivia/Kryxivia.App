export const useMetaData = () => {

  const except = ['bosses-bossId', 'faq-category']
  const route = useRoute()
  const { t } = useI18n()

  /** Get id page via route */
  function getIdPage() {
    return route.name.split('___')[0]
  }

  /** Save id page in state */
  const idPage = useState('idPage', () => getIdPage())
  const metaTitle = useState('metaTitle', () => t(idPage.value + '.metaTitle'))

  /** Properties pages */
  const title = computed(() => t(idPage.value + '.title'))
  const description = computed(() => t('all.desc'))

  /** Watch change route for update id page */
  watch(route, () => {
    setIdPage()
    setMetaTitle()
  })

  /** Set id page with except for alias route */
  function setIdPage(id = getIdPage()) {
    if (id !== idPage.value && !except.includes(id)) {
      idPage.value = id
    }
  }

  /** Set meta title */
  function setMetaTitle(meta = t(idPage.value + '.metaTitle')) {
    metaTitle.value = meta
  }

  return {
    idPage,
    metaTitle,
    title,
    description,
    setIdPage,
    setMetaTitle
  }

}