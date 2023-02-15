<script setup>
  import gsap from 'gsap'
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
  import Scrollbar from 'smooth-scrollbar'

  const props = defineProps({
    target: {
      type: String,
      default: '#smooth'
    },
    horizontal: {
      type: Boolean,
      default: false
    },
    delegate: {
      type: Boolean,
      default: true
    },
    footer: {
      type: Boolean,
      default: true
    }
  })

  /** 
   * Smooth scrollbar
   * Horizontal plugin 
   */
  class HorizontalScrollPlugin extends Scrollbar.ScrollbarPlugin {
    transformDelta(delta, fromEvent) {
      if (!/wheel/.test(fromEvent.type)) {
        return delta
      }
      const {x, y} = delta
      if (this.scrollbar.options.plugin.direction === true) {
        return {
          y: 0,
          x: Math.abs(x) > Math.abs(y) ? x : y
        }
      } else {
        return {
          y:  Math.abs(y) > Math.abs(x) ? y : x,
          x: 0
        }
      }
    }
  }
  HorizontalScrollPlugin.pluginName = 'horizontalScroll' 

  /** 
   * Smooth scrollbar
   * Easing plugin 
   */
  class EdgeEasingPlugin extends Scrollbar.ScrollbarPlugin {
    constructor() {
      super(...arguments)
      this._remainMomentum = {
        x: 0,
        y: 0,
      }
    }
    transformDelta(delta) {
      const {limit, offset,} = this.scrollbar
      const x = this._remainMomentum.x + delta.x
      const y = this._remainMomentum.y + delta.y
      this.scrollbar.setMomentum(
        Math.max(-offset.x, 
        Math.min(x, limit.x - offset.x)), 
        Math.max(-offset.y, Math.min(y, limit.y - offset.y))
      )
      return {
        x: 0, 
        y: 0
      }
    }
    onRender(remainMomentum) {
      Object.assign(this._remainMomentum, remainMomentum)
    }
  }
  EdgeEasingPlugin.pluginName = 'edgeEasing'

  onMounted(() => {

    const html = qs('html')
    const body = qs('body')

    /** Damping option */
    let damping = .06

    /** if firefox */
    if (!isFirefox()) {
      damping = .07
      html.classList.add('firefox')
    }

    /** Fix class function */
    const fixClass = y => { y > 100 ? body.classList.add('fix') : body.classList.remove('fix') }

    /** Init smooth if not mobile */
    if(!isMobile()){

      html.classList.add('smooth-scroll')

      Scrollbar.use(HorizontalScrollPlugin)
      Scrollbar.use(EdgeEasingPlugin)

      let delegateDocument = null
      if (props.delegate) {
        delegateDocument = document
      }

      /** Init smooth scrollbar */
      const smooth = Scrollbar.init(qs(props.target), {
          damping: damping,
          alwaysShowTracks: false,
          delegateTo: delegateDocument,
          direction: true,
          plugin: {
            direction: props.horizontal
          }
      })

      /** Remove default style */
      const style = qs('#smooth-scrollbar-style')
      if (style != null) {
        style.remove()
      }

      /** Smooth listener */
      smooth.addListener(ScrollTrigger.update)
      smooth.addListener(status => {

        ScrollTrigger.refresh()

        let y = status.offset.y
        let x = status.offset.x

        fixClass(y)

        if (props.horizontal) {
          html.classList.contains('stop') ? smooth.setPosition(sessionStorage.getItem('x' + props.target), 0) : sessionStorage.setItem('x' + props.target, x)
        }else{
          html.classList.contains('stop') ? smooth.setPosition(0, sessionStorage.getItem('y' + props.target)) : sessionStorage.setItem('y' + props.target, y)
        }

      })

    } else {

      /** Add class global for mobile */
      html.classList.add('mob')

      /** Listener scroll for fix class */
      window.addEventListener('scroll', () => fixClass(window.scrollY))

    }

    /** Animation gsap */
    gsap.registerPlugin(ScrollTrigger)
    gsap.config({nullTargetWarn:false})
    ScrollTrigger.batch('[data-reveal]', {
      interval: .1,
      batchMax: 10,
      onEnter: batch => gsap.to(batch, 1.7, {opacity:1,y:0,x:0,stagger:{each:.1,grid:[1,10]},ease:"power2.out",overwrite:true}),
      start: 'top 95%+=100'
    })

  })
</script>

<template>
  <div id="smooth" :class="horizontal ? 'hori' : ''">
    <slot />
    <Footer v-if="footer" />
  </div>
</template>