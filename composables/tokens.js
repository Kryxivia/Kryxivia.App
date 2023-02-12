import gsap from 'gsap'

export const useTokenPage = () => {

  onMounted(() => {

    /** Reveal plan token */
    const top = gsap.timeline()
    top
      .to('.top-token .plan-1 img', 2.5, {scale:1,ease:'power2.easeInOut'}, 'a')
      .to('.top-token .plan-2 img', 2.5, {scale:1,ease:'power2.easeInOut'}, 'a')
      .to('.top-token .plan-3 img', 2.5, {scale:1,ease:'power2.easeInOut'}, 'a')

    /** Animation scroll top token */
    const scroller = gsap.timeline({
      scrollTrigger:{
        trigger: '.top-token .plan-w',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    })
    scroller
      .fromTo('.top-token .plan-w', {opacity:1}, {opacity:.6,ease:'none'}, 'a')
      .fromTo('.top-token .plan-1', {y:'0%'}, {y:'10%',ease:'none'}, 'a')
      .fromTo('.top-token .plan-2', {y:'0%'}, {y:'20%',ease:'none'}, 'a')
      .fromTo('.top-token .plan-3', {y:'0%'}, {y:'30%',ease:'none'}, 'a')
      .fromTo('.top-token .bg > div', {opacity:1}, {opacity:.4,ease:'none'}, 'a')

  })

}