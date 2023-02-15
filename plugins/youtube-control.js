export default defineNuxtPlugin(nuxtApp => {

  function control(video, control) {
    const iframe = qst('iframe', qs(video))[0].contentWindow
    iframe.postMessage(JSON.stringify({
      event: 'command',
      func: control + 'Video',
      args: ''
    }) , '*')
    if (control === 'play') {
      nuxtApp.$sound.update({
        all: {
          vol: 0
        }
      })
    } else {
      nuxtApp.$sound.reset()
    }
  }

  /** Provide $modal system */
  nuxtApp.provide('youtube', control)

})