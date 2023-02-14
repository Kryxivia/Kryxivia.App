export default defineNuxtPlugin(nuxtApp => {

  class Sound {
    /** Init sound */
    init() {

      this.dir = '/sound/'
      this.sources = {
        music: {
          file: 'music.mp3',
          vol: .3,
          play: true
        },
        grotte: {
          file: 'grotte.ogg',
          vol: .5,
          play: false
        }
      }
      this.ambient = []
      this.selectors = {
          sound: 'sound',
          noSound: 'no-sound'
      }
      this.dom = {
        body: document.body,
        sound: qs(this.selectors.sound),
        noSound: qs(this.selectors.noSound)
      }

      /** Init ambient */
      for (const [key, info] of Object.entries(this.sources)) {
        this.initAmbient(key, info.file, info.vol, info.play)
      }
    }
    /** Initialize ambient */
    initAmbient(name, file, vol, play) {

        if (this.ambient[name] === undefined) {
          this.ambient[name] = new Audio(this.dir + file)
        }
        this.ambient[name].loop = true
        this.ambient[name].volume = vol

        let soundEnabled = window.localStorage.getItem('sound')
        if (soundEnabled === 'mute') {
          this.soundEnabled = false
          document.body.classList.add(this.selectors.noSound)
        } else {
          this.soundEnabled = true
          if (play) {
            this.ambient[name].play()
          }
        }

    }
    /** Update ambient */
    update(params) {

      for (const [key, info] of Object.entries(params)) {
        if (key === 'all') {
          for (const [key] of Object.entries(this.sources)) {
            this.sources[key].play = info.play
            if (info.play && this.soundEnabled) {
              this.ambient[key].play()
            } else {
              this.ambient[key].pause()
            }
          }
        } else {
          if(info.vol !== undefined){
            this.ambient[key].volume = info.vol
          }
          if(info.play && this.soundEnabled){
            this.ambient[key].play()
          }else{
            this.ambient[key].pause()
          }
          this.sources[key].play = info.play
          this.sources[key].vol = info.vol
        }
      }

    }
    /** Reset ambient */
    reset() {
      this.update({
        all: {
          play: false
        },
        music: {
          play: true,
          vol: .3
        },
        grotte: {
          play: false
        }
      })
    }
    /** Toggle sound */
    toggle() {
      this.soundEnabled ? this.mute() : this.unmute()
    }
    /** Mute sound */
    mute() {
      window.localStorage.setItem('sound', 'mute')
      for (const [key] of Object.entries(this.sources)) {
        this.ambient[key].pause()
      }
      this.soundEnabled = false
      this.dom.body.classList.add(this.selectors.noSound)
    }
    /** Unmute sound */
    unmute() {
      window.localStorage.setItem('sound', 'play')
      for (const [key, info] of Object.entries(this.sources)) {
        if(info.play == true){
          this.ambient[key].play()
        }
      }
      this.soundEnabled = true
      this.dom.body.classList.remove(this.selectors.noSound)
    }
    /** Play once sound */
    play(audioName, volume = .2) {
      if (this.soundEnabled) {
        const audio = new Audio(this.dir + audioName)
        audio.volume = volume
        audio.play()
      }
    }
  }

  /** Provide $navigation system */
  nuxtApp.provide('sound', new Sound())
  
})