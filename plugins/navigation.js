import gsap from 'gsap'

export default defineNuxtPlugin(nuxtApp => {

  class Navigation {
    constructor() {

      this.class = {
        open: 'onav',
        stop: 'stop'
      }

      this.state = false
      this.tl = null

    }
    initTimeline() {
      if (this.tl === null) {
        this.tl = this.createTimeline()
      }
    }
    createTimeline() {
        
      const tl = gsap.timeline({paused:true})
        
      tl
        .set('#n', {opacity:1})
        .fromTo('#n .bg', 1, {height:0}, {height:'100%',ease:"power2.out"}, 'a')
        .fromTo('#n .title > *', .8, {y:'105%'}, {y:'0%',ease:"power3.out",delay:.3}, 'a')
        .fromTo('#n nav ul li', .8, {opacity:0,y:50}, {opacity:1,y:0,ease:"power2.out",stagger:.02,delay:.3}, 'a')
        .fromTo('#n .actu', .8, {opacity:0,y:50}, {opacity:1,y:0,ease:"power2.out",stagger:.1,delay:.3}, 'a')
        .fromTo('#n .foot .ln', .5, {opacity:0}, {opacity:1,delay:.7}, 'a')
        .fromTo('#n .foot .ln', 1, {width:30}, {width:'100%',ease:"power3.inOut",delay:.7}, 'a')
        .fromTo('#n .foot .left', 1, {opacity:0,x:-30}, {opacity:1,x:0,ease:"power3.out",delay:.9}, 'a')
        .fromTo('#n .foot .right li', 1.2, {opacity:0}, {opacity:1,ease:"power3.out",stagger:-.05,delay:.9}, 'a')

      return tl

    }
    open() {
      this.state = true
      this.initTimeline()
      this.tl.timeScale(1).restart()
      nuxtApp.$sound.play('open.ogg')
      qs('body').classList.add(this.class.open)
      qs('html').classList.add(this.class.stop)
    }
    close() {
      this.state = false
      this.initTimeline()
      this.tl.timeScale(3).reverse()
      nuxtApp.$sound.play('close.ogg')
      qs('body').classList.remove(this.class.open)
      qs('html').classList.remove(this.class.stop)
    }
    toggle() {
      this.state ? this.close() : this.open()
    }
  }

  /** Provide $navigation system */
  nuxtApp.provide('navigation', new Navigation())

})