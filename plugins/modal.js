export default defineNuxtPlugin(nuxtApp => {

  class Modal {
    constructor() {

      this.class = {
        open_container: 'open-mod',
        open: 'open',
        stop: 'stop'
      }

    }
    /**
     * Open modal
     * @param {string} id Name modal
     * @param {function} callback Function call when open modal
     */
    open(id, callback = () => {}) {

      qs(`[data-modal="${id}"]`).classList.add(this.class.open)
      qs('html').classList.add(this.class.stop, this.class.open_container)
    
      nuxtApp.$sound.play('open.ogg')
          
      callback()

    }
    /**
     * Close modal
     * @param {string} id Name modal
     * @param {function} callback Function call when close modal
     */
    close(id, callback = () => {}) {

      qs(`[data-modal="${id}"]`).classList.remove(this.class.open)
      qs('html').classList.remove(this.class.stop, this.class.open_container)
      
      nuxtApp.$sound.play('close.ogg')

      callback()

    }
  }

  /** Provide $modal system */
  nuxtApp.provide('modal', new Modal())

})