<script setup>
  import gsap from 'gsap'

  const bg = {
    hm0: ['ciel','mountain','city','aventurier'],
    hm1: ['forest','arbre','autel','sol','liane','feuille-2'],
    hm2: ['ciel','foret-entry','porte','aventurier','stalagmite','totem'],
    hm3: ['fond','aventurier-cave','stalagmite-cave','stalactite-cave','stalactite-cave-2'],
    hm4: ['ground','aventuriers','mur','mur-2','mur-3','mur-4'],
    hm5: ['mountains','mountains-2','quartier','quartier-2','quartier-3','forest-land','aventurier-land','herbe']
  }

  onMounted(() => {

    const horizontal = isMobile() ? false : true

    /** Default config gsap */
    gsap.defaults({
      ease: 'none'
    })

    /** Reveal section 0 */
    const hm0_r = gsap.timeline()
    hm0_r
      .to('.hm0', 1, {opacity:1,ease:'power1.inOut'}, 'a')
      .fromTo('.hm0 .bg-city', 3, {scale:1.2}, {scale:1,ease:'power1.inOut'}, 'a')
      .fromTo('.hm0 .bg-aventurier', 3, {scale:1.3}, {scale:1,ease:'power1.inOut'}, 'a')
      .fromTo('.hm0 .logo img', 2, {y:'100%',opacity:0}, {y:'0%',opacity:1,ease:'power3.out',delay:1.5}, 'a')
      .fromTo('.hm0 .sub', 2, {y:50,opacity:0}, {y:0,opacity:1,ease:'power3.out',delay:1.7}, 'a')
      .fromTo('.hm0 h1', 2, {y:50,opacity:0}, {y:0,opacity:1,ease:'power3.out',delay:2}, 'a')
      .fromTo('.hm0 .butt-c', 2, {y:50,opacity:0}, {y:0,opacity:1,ease:'power3.out',delay:2.3}, 'a')

    /** Section 0 */
    const hm0 = gsap.timeline({scrollTrigger:{
      horizontal: horizontal,
      trigger: '.hm0',
      start: 'left left',
      end: 'right left',
      scrub: true
    }})
    if (horizontal) {
      hm0
        .fromTo('.hm0 .bg-ciel > *', {x:'0%'}, {x:'10%'}, 'a')
        .fromTo('.hm0 .bg-mountain > *', {x:'0%'}, {x:'15%'}, 'a')
        .fromTo('.hm0 .bg-city > *', {x:'0%'}, {x:'10%'}, 'a')
        .fromTo('.hm0 .bg-aventurier > *', {x:'0%'}, {x:'20%'}, 'a')
    } else {
      hm0
        .fromTo('.hm0 .bg-ciel > *', {y:'0%'}, {y:'10%'}, 'a')
        .fromTo('.hm0 .bg-mountain > *', {y:'0%'}, {y:'15%'}, 'a')
        .fromTo('.hm0 .bg-city > *', {y:'0%'}, {y:'10%'}, 'a')
        .fromTo('.hm0 .bg-aventurier > *', {y:'0%'}, {y:'20%'}, 'a')
    }

    /** Section 1 */
    const hm1 = gsap.timeline({scrollTrigger:{
      horizontal: horizontal,
      trigger: '.hm1',
      start: 'left right',
      end: 'right left',
      scrub: true
    }})
    if (horizontal) {
      hm1
        .fromTo('.hm1 .bg-forest > *', {x:'-10%'}, {x:'10%'}, 'a')
        .fromTo('.hm1 .bg-arbre > *', {x:'-15%'}, {x:'15%'}, 'a')
        .fromTo('.hm1 .bg-autel > *, .hm1 .bg-orage > *', {x:'0%'}, {x:'5%'}, 'a')
        .fromTo('.hm1 .bg-sol > *', {x:'-10%'}, {x:'10%'}, 'a')
        .fromTo('.hm1 .bg-liane > *', {x:'-10%'}, {x:'20%'}, 'a')
        .fromTo('.hm1 .bg-feuille > *', {x:'-10%'}, {x:'15%'}, 'a')
        .fromTo('.hm1 .bg-feuille-2 > *', {x:'-20%'}, {x:'20%'}, 'a')
    } else {
      gsap.fromTo('.hm1', {opacity:1}, {opacity:.5,scrollTrigger:{
        trigger: '.hm1',
        start: 'bottom 50%',
        end: 'bottom top',
        scrub: true
      }})
      gsap.fromTo('.hm2', {opacity:.5}, {opacity:1,scrollTrigger:{
        trigger: '.hm2',
        start: 'top bottom',
        end: 'top 50%',
        scrub: true
      }})
      hm1
        .fromTo('.hm1 .bg-forest > *', {y:'0%'}, {y:'10%'}, 'a')
        .fromTo('.hm1 .bg-arbre > *', {y:'0%'}, {y:'15%'}, 'a')
        .fromTo('.hm1 .bg-autel > *, .hm1 .bg-orage > *', {y:'0%'}, {y:'20%'}, 'a')
        .fromTo('.hm1 .bg-sol > *', {y:'0%'}, {y:'10%'}, 'a')
        .fromTo('.hm1 .bg-liane > *', {y:'0%'}, {y:'25%'}, 'a')
        .fromTo('.hm1 .bg-feuille > *', {y:'0%'}, {y:'15%'}, 'a')
      }

    /** Section 2 */
    const hm2 = gsap.timeline({scrollTrigger:{
      horizontal: horizontal,
      trigger: '.hm2',
      start: 'left right',
      end: 'left left',
      scrub: true
    }})
    if (horizontal) {
      hm2
        .fromTo('.hm2 .totem-0', {x:'-15%'}, {x:'-80%'}, 'a')
        .fromTo('.hm2 .bg-ciel > *', {x:'-10%'}, {x:'0%'}, 'a')
        .fromTo('.hm2 .bg-foret-entry > *', {x:'-25%'}, {x:'0%'}, 'a')
        .fromTo('.hm2 .bg-totem > *', {x:'-15%'}, {x:'0%'}, 'a')
        .fromTo('.hm2 .bg-porte > *', {x:'-10%'}, {x:'0%'}, 'a')
        .fromTo('.hm2 .bg-stalagmite > *', {x:'-25%'}, {x:'0%'}, 'a')
        .fromTo('.hm2 .bg-aventurier > *', {x:'-20%'}, {x:'0%'}, 'a')
    } else {
      gsap.fromTo('.hm2', {opacity:1}, {opacity:.5,scrollTrigger:{
        trigger: '.hm2',
        start: 'bottom 50%',
        end: 'bottom top',
        scrub: true
      }})
      gsap.fromTo('.hm3', {opacity:.5}, {opacity:1,scrollTrigger:{
        trigger: '.hm3',
        start: 'top bottom',
        end: 'top 50%',
        scrub: true
      }})
      hm2
        .fromTo('.hm2 .bg-ciel > *', {y:'-10%'}, {y:'0%'}, 'a')
        .fromTo('.hm2 .bg-foret-entry > *', {y:'-25%'}, {y:'0%'}, 'a')
        .fromTo('.hm2 .bg-totem > *', {y:'-15%'}, {y:'0%'}, 'a')
        .fromTo('.hm2 .bg-porte > *', {y:'-10%'}, {y:'0%'}, 'a')
        .fromTo('.hm2 .bg-stalagmite > *', {y:'-25%'}, {y:'0%'}, 'a')
        .fromTo('.hm2 .bg-aventurier > *', {y:'-20%'}, {y:'0%'}, 'a')
    }

    /** Section 2 end */
    const hm2_2 = gsap.timeline({scrollTrigger:{
      horizontal: horizontal,
      trigger: '.hm2',
      start: 'left left',
      end: 'right left',
      scrub: true
    }})
    if (horizontal) {
      hm2_2
        .fromTo('.hm2 .bg-ciel > *', {x:'0%'}, {x:'-10%'}, 'a')
        .fromTo('.hm2 .bg-foret-entry > *', {x:'0%'}, {x:'25%'}, 'a')
        .fromTo('.hm2 .bg-totem > *', {x:'0%'}, {x:'-10%'}, 'a')
        .fromTo('.hm2 .bg-porte > *', {x:'0%'}, {x:'-5%'}, 'a')
        .fromTo('.hm2 .bg-aventurier > *', {x:'0%'}, {x:'20%'}, 'a')
        .fromTo('.hm2 .bg-colonne > *', {x:'0%',display:'none'}, {x:'-20%',display:'block'}, 'a')
    } else {
      hm2_2
        .fromTo('.hm2 .bg-ciel > *', {y:'0%'}, {y:'-10%'}, 'a')
        .fromTo('.hm2 .bg-foret-entry > *', {y:'0%'}, {y:'25%'}, 'a')
        .fromTo('.hm2 .bg-totem > *', {y:'0%'}, {y:'-10%'}, 'a')
        .fromTo('.hm2 .bg-porte > *', {y:'0%'}, {y:'-5%'}, 'a')
        .fromTo('.hm2 .bg-aventurier > *', {x:'0%'}, {x:'20%'}, 'a')
    }

    /** Section 3 */
    const hm3 = gsap.timeline({scrollTrigger:{
      horizontal: horizontal,
      trigger: '.hm3',
      start: 'left right',
      end: 'left left',
      scrub: true
    }})
    if (horizontal) {
      hm3
        .fromTo('.hm3 .bg-fond > *', {x:'-20%'}, {x:'0%'}, 'a')
        .fromTo('.hm3 .bg-aventurier-cave > *', {x:'-30%'}, {x:'0%'}, 'a')
        .fromTo('.hm3 .bg-stalagmite-cave > *', {x:'-20%'}, {x:'0%'}, 'a')
        .fromTo('.hm3 .bg-stalactite-cave > *', {x:'-25%'}, {x:'0%'}, 'a')
        .fromTo('.hm3 .bg-stalactite-cave-2 > *', {x:'-10%'}, {x:'0%'}, 'a')
    } else {
      gsap.fromTo('.hm3', {opacity:1}, {opacity:.5,scrollTrigger:{
        trigger: '.hm3',
        start: 'bottom 50%',
        end: 'bottom top',
        scrub: true
      }})
      gsap.fromTo('.hm4', {opacity:.5}, {opacity:1,scrollTrigger:{
        trigger: '.hm4',
        start: 'top bottom',
        end: 'top 50%',
        scrub: true
      }})
      hm3
        .fromTo('.hm3 .bg-fond > *', {y:'-20%'}, {y:'0%'}, 'a')
        .fromTo('.hm3 .bg-aventurier-cave > *', {y:'-30%'}, {y:'0%'}, 'a')
        .fromTo('.hm3 .bg-stalagmite-cave > *', {y:'-20%'}, {y:'0%'}, 'a')
        .fromTo('.hm3 .bg-stalactite-cave > *', {y:'-25%'}, {y:'0%'}, 'a')
        .fromTo('.hm3 .bg-stalactite-cave-2 > *', {y:'-10%'}, {y:'0%'}, 'a')
    }

    /** Section 3 end */
    const hm3_2 = gsap.timeline({scrollTrigger:{
      horizontal: horizontal,
      trigger: '.hm3',
      start: 'left left',
      end: 'right left',
      scrub: true
    }})
    if (horizontal) {
      gsap.fromTo('.hm3 .crystal img', {x:'20%',display:'none'}, {x:'-10%',display:'block',scrollTrigger:{
        horizontal: horizontal,
        trigger: '.hm3',
        start: 'left left',
        end: 'right 20%',
        scrub: true
      }}, 'a')
      gsap.fromTo('.hm3 .crystal img', {x:'-10%'}, {x:'-100%',scrollTrigger:{
        horizontal: horizontal,
        trigger: '.hm4',
        start: 'left left',
        end: 'right 50%',
        scrub: true
      }}, 'a')
      hm3_2
        .fromTo('.hm2 .bg-colonne > *', {x:'-20%'}, {x:'-100%'}, 'a')
        .fromTo('.hm3 .bg-fond > *', {x:'0%'}, {x:'-10%'}, 'a')
        .fromTo('.hm3 .bg-aventurier-cave > *', {x:'0%'}, {x:'20%'}, 'a')
        .fromTo('.hm3 .bg-stalactite-cave-2 > *', {x:'0%'}, {x:'20%'}, 'a')
    } else {
      hm3_2
        .fromTo('.hm2 .bg-colonne > *', {y:'-20%'}, {y:'-100%'}, 'a')
        .fromTo('.hm3 .bg-fond > *', {y:'0%'}, {y:'-10%'}, 'a')
        .fromTo('.hm3 .bg-aventurier-cave > *', {y:'0%'}, {y:'5%'}, 'a')
        .fromTo('.hm3 .bg-stalactite-cave-2 > *', {y:'0%'}, {y:'20%'}, 'a')
    }

    /** Section 4 */
    const hm4 = gsap.timeline({scrollTrigger:{
      horizontal: horizontal,
      trigger: '.hm4',
      start: 'left right',
      end: 'left left',
      scrub: true
    }})
    if (horizontal) {
      hm4
        .fromTo('.hm4 .bg-ground > *', {x:'-10%'}, {x:'0%'}, 'a')
        .fromTo('.hm4 .bg-aventuriers > *', {x:'-25%',y:'20%'}, {x:'0%',y:'0%'}, 'a')
        .fromTo('.hm4 .bg-mur > *', {x:'-10%'}, {x:'0%'}, 'a')
        .fromTo('.hm4 .bg-mur-2 > *', {x:'-15%'}, {x:'0%'}, 'a')
        .fromTo('.hm4 .bg-mur-3 > *', {x:'-20%'}, {x:'0%'}, 'a')
        .fromTo('.hm4 .bg-mur-4 > *', {x:'-30%'}, {x:'0%'}, 'a')
    } else {
      gsap.fromTo('.hm4', {opacity:1}, {opacity:.5,scrollTrigger:{
        trigger: '.hm4',
        start: 'bottom 50%',
        end: 'bottom top',
        scrub: true
      }})
      gsap.fromTo('.hm5', {opacity:.5}, {opacity:1,scrollTrigger:{
        trigger: '.hm5',
        start: 'top bottom',
        end: 'top 50%',
        scrub: true
      }})
      hm4
        .fromTo('.hm4 .bg-ground > *', {y:'-10%'}, {y:'0%'}, 'a')
        .fromTo('.hm4 .bg-aventuriers > *', {x:'-25%',y:'20%'}, {x:'0%',y:'0%'}, 'a')
        .fromTo('.hm4 .bg-mur > *', {y:'-10%'}, {y:'0%'}, 'a')
        .fromTo('.hm4 .bg-mur-2 > *', {y:'-15%'}, {y:'0%'}, 'a')
        .fromTo('.hm4 .bg-mur-3 > *', {y:'-20%'}, {y:'0%'}, 'a')
        .fromTo('.hm4 .bg-mur-4 > *', {y:'-30%'}, {y:'0%'}, 'a')
    }

    /** Section 4 end */
    const hm4_2 = gsap.timeline({scrollTrigger:{
      horizontal: horizontal,
      trigger: '.hm4',
      start: 'left left',
      end: 'right left',
      scrub: true
    }})
    if (horizontal) {
      hm4_2
        .fromTo('.hm4 .bg-ground > *', {x:'0%'}, {x:'10%'}, 'a')
        .fromTo('.hm4 .bg-aventuriers > *', {x:'0%',y:'0%'}, {x:'15%',y:'-40%'}, 'a')
        .fromTo('.hm4 .bg-mur > *', {x:'0%'}, {x:'15%'}, 'a')
        .fromTo('.hm4 .bg-mur-2 > *', {x:'0%'}, {x:'25%'}, 'a')
        .fromTo('.hm4 .bg-mur-3 > *', {x:'0%'}, {x:'30%'}, 'a')
        .fromTo('.hm4 .bg-mur-4 > *', {x:'0%'}, {x:'35%'}, 'a')
    } else {
      hm4_2
        .fromTo('.hm4 .bg-ground > *', {y:'0%'}, {y:'10%'}, 'a')
        .fromTo('.hm4 .bg-aventuriers > *', {x:'0%',y:'0%'}, {x:'15%',y:'-40%'}, 'a')
        .fromTo('.hm4 .bg-mur > *', {y:'0%'}, {y:'15%'}, 'a')
        .fromTo('.hm4 .bg-mur-2 > *', {y:'0%'}, {y:'25%'}, 'a')
        .fromTo('.hm4 .bg-mur-3 > *', {y:'0%'}, {y:'30%'}, 'a')
        .fromTo('.hm4 .bg-mur-4 > *', {y:'0%'}, {y:'35%'}, 'a')
    }

    /** Section 5 */
    const hm5 = gsap.timeline({scrollTrigger:{
      horizontal: horizontal,
      trigger: '.hm5',
      start: 'left right',
      end: 'left left',
      scrub: true
    }});
    if (horizontal) {
      gsap.fromTo('.hm5 .mur > *', {x:'0%'}, {x:'-25%',scrollTrigger:{
        horizontal: horizontal,
        trigger: '.hm5',
        start: 'left right',
        end: 'left 5%',
        scrub: true
      }}, 'a')
      gsap.fromTo('.hm5 .mur > *', {x:'-25%'}, {x:'-50%',ease:'power1.in',scrollTrigger:{
        horizontal: horizontal,
        trigger: '.hm5',
        start: 'left 5%',
        end: 'left left',
        scrub: true
      }}, 'a')
      hm5
        .fromTo('.hm5 .bg-mountains > *', {x:'-5%'}, {x:'0%'}, 'a')
        .fromTo('.hm5 .bg-mountains-2 > *', {x:'-10%'}, {x:'0%'}, 'a')
        .fromTo('.hm5 .bg-quartier > *', {x:'-15%'}, {x:'0%'}, 'a')
        .fromTo('.hm5 .bg-quartier-2 > *', {x:'-20%'}, {x:'0%'}, 'a')
        .fromTo('.hm5 .bg-quartier-3 > *', {x:'-25%'}, {x:'0%'}, 'a')
        .fromTo('.hm5 .bg-forest-land > *', {x:'-20%'}, {x:'0%'}, 'a')
        .fromTo('.hm5 .bg-herbe > *', {x:'-15%',y:'5%'}, {x:'0%',y:'0%'}, 'a')
        .fromTo('.hm5 .bg-aventurier-land > *', {x:'-20%',y:'10%'}, {x:'0%',y:'0%'}, 'a')
    } else {
      hm5
        .fromTo('.hm5 .bg-mountains > *', {y:'-5%'}, {y:'0%'}, 'a')
        .fromTo('.hm5 .bg-mountains-2 > *', {y:'-10%'}, {y:'0%'}, 'a')
        .fromTo('.hm5 .bg-quartier > *', {y:'-15%'}, {y:'0%'}, 'a')
        .fromTo('.hm5 .bg-quartier-2 > *', {y:'-20%'}, {y:'0%'}, 'a')
        .fromTo('.hm5 .bg-quartier-3 > *', {y:'-25%'}, {y:'0%'}, 'a')
        .fromTo('.hm5 .bg-forest-land > *', {y:'-20%'}, {y:'0%'}, 'a')
        .fromTo('.hm5 .bg-herbe > *', {y:'-15%'}, {y:'0%'}, 'a')
        .fromTo('.hm5 .bg-aventurier-land > *', {y:'-20%'}, {y:'0%'}, 'a')
    }
    
  })
</script>

<template>
  <div class="hm-w">
    <Smooth :footer="false" :horizontal="true" class="home-hori">
      <div class="hm-c">
        <div class="hm0">
          <HomeWelcome />
          <HomeBg :bg="bg.hm0" :bird="true" />
        </div>
        <div class="hm2">
          <HomeContent 
            :sub="$t('home.sec1.sub1')" 
            :title="$t('home.sec1.title1')" 
            :text="[$t('home.sec1.txt1'), $t('home.sec1.txt2')]"
            :bn="'home.sec1.bn'"
            :link="'/kryxivia'" />
          <HomeBg :bg="bg.hm2" />
          <Bg :name="'colonne'" />
          <div class="totem-0 hid-mob">
            <img src="/img/cave_entry_gsap/plan-0_totem.webp" loading="lazy" alt="Kryxivia">
          </div>
        </div>
        <div class="hm3">
          <HomeContent 
            :sub="$t('home.sec2.sub1')" 
            :title="$t('home.sec2.title1')" 
            :text="[$t('home.sec2.txt1')]"
            :bn="'home.sec2.bn'"
            :link="'/dungeons'" />
          <HomeBg :bg="bg.hm3" />
          <div class="crystal hid-mob">
            <img src="/img/cave_gsap/plan-0_crystal.webp" loading="lazy" alt="Kryxivia">
          </div>
        </div>
        <div class="hm4">
          <HomeTokens />
          <HomeBg :bg="bg.hm4" />
        </div>
        <div class="hm5">
          <HomeJoin />
          <div class="mur hid-mob">
            <img src="/img/cave_tunnel_gsap/plan-0_mur.webp" loading="lazy" alt="Kryxivia">
          </div>
          <HomeBg :bg="bg.hm5" />
        </div>
      </div>
    </Smooth>
  </div>
</template>

<style>
  .home-hori:before{background:url('/img/shadow.png') center center;background-size:100% 100%;content:'';position:fixed;left:0;top:0;width:100%;height:100%;z-index:100;pointer-events:none;opacity:.7;}

  .hm-c{display:flex;height:100%;overflow:hidden;}
  .hm-w .hm-c > *{min-width:100vw;height:100%;}

  html.mob .hm-c{display:block;}
  html.mob .hm-c > *{padding:calc(150px + 50 * (100vw - 320px) / 1080) 0;min-width:none;min-height:100vh;display:flex;align-items:center;}
  html.mob .hm-c > * > *{margin:auto;}
  html.mob .hm-w .hm-ct{margin:0;min-width:0px!important;width:100%!important;max-width:100vw!important;justify-content:flex-start;}
  html.mob .hm-w .hm-ct .ct{margin:auto auto;width:var(--ct);max-width:100%;text-align:center!important;}
  html.mob .hm-w .hm-ct .ct h2{margin-left:auto;margin-right:auto;}
  html.mob .hid-mob, html.mob .hm-w .hm2 .bg-colonne{display:none!important;}

  .hm-w .hm-ct{text-shadow:0 1px 2px rgba(0,0,0,.5), 0 0 10px rgba(0,0,0,.5);min-width:100%;height:100%;display:flex;align-items:center;justify-content:center;z-index:100;}

  .hm-w .hm-ct .ct{max-width:90vw;}
  .hm-w .hm-ct .ct .bn{--padding:15px;}
  .hm-w .hm-ct .ct h2{margin-top:calc(10px + 5 * (100vw - 320px) / 1080);font-family:var(--font-2);color:var(--color-3);font-size:calc(20px + 12 * (100vw - 320px) / 1080);}
  .hm-w .hm-ct .ct .bn-l{margin-top:calc(20px + 5 * (100vw - 320px) / 1080);}
  .hm-w .hm-ct .ct .p{line-height:1.7;font-size:calc(13px + 2 * (100vw - 320px) / 1080);margin-top:calc(20px + 5 * (100vw - 320px) / 1080);}
  .hm-w .hm-ct .ct .p > * + *{margin-top:calc(10px + 3 * (100vw - 320px) / 1080);}

  .hm-w .back{position:absolute;left:0;top:0;width:100%;height:100%;overflow:hidden;}
  .hm-w .bg{position:absolute;left:0;top:0;width:100%;height:100%;}
  .hm-w .bg > *{background-size:cover;background-position:center center;position:absolute;left:0;top:0;width:100%;height:100%;will-change:transform;}
  
  .hm-w .hm0{min-width:110vw;text-align:center;z-index:10;opacity:0}
  .hm-w .hm0 .hm-ct{width:100vw;min-width:auto;z-index:150;}
  .hm-w .hm0 .bg{will-change:transform;}
  .hm-w .hm0 .logo{overflow:hidden;width:calc(250px + 150 * (100vw - 320px) / 1080);margin:0 auto calc(30px + 5 * (100vw - 320px) / 1080);}
  .hm-w .hm0 .logo img{transform:translateY(100%);}
  .hm-w .hm0 h1{margin-top:calc(15px + 5 * (100vw - 320px) / 1080);font-family:var(--font-2);color:var(--color-3);font-size:calc(26px + 20 * (100vw - 320px) / 1080);}
  .hm-w .butt-c{display:flex;align-items:center;margin-top:calc(25px + 10 * (100vw - 320px) / 1080);justify-content:center;}
  .hm-w .butt-c > * + *{margin-left:10px;}

  .hm-w .bg-autel{width:110vw;left:-5vw;}  
  .hm-w .butt{box-shadow:0 10px 35px -5px rgba(0,0,0,.9), 0 0 0 2px rgba(0,0,0,.2);text-transform:uppercase;font-size:calc(22px + 2 * (100vw - 320px) / 1080);font-family:var(--font-2);background:linear-gradient(to top, var(--bg-2), var(--bg-3));padding:17px 35px;color:var(--color-3);border-radius:var(--corner-3)}
  .hm-w .butt-trai{border-radius:var(--corner-5);}
  .hm-w .butt:before{transition:.5s;content:'';position:absolute;left:3px;top:3px;width:calc(100% - 6px);height:calc(100% - 6px);border:var(--line);border-radius:inherit;}
  .hm-w .butt:hover:before{border-color:var(--color-2);box-shadow:var(--bs-2);}
  .hm-w .butt small{display:block;font-family:var(--font-1);text-transform:none;letter-spacing:calc(2px + 1 * (100vw - 320px) / 1080);font-size:calc(12px + 1 * (100vw - 320px) / 1080);margin-top:1px;font-weight:normal;color:var(--color-1);}
  .hm-w .hm1 .feuille-2{position:absolute;top:0;left:0;height:100%;transform:translateX(-25%);z-index:100;}
  .hm-w .hm1 .feuille-2 img{max-width:none;width:auto;height:100%;will-change:transform;}

  .hm-w .hm2{z-index:20;}
  .hm-w .hm2 .hm-ct{justify-content:flex-start;min-width:calc(1350px + 200 * (100vw - 320px) / 1080);}
  .hm-w .hm2 .ct{width:calc(500px + 250 * (100vw - 320px) / 1080);margin-left:calc(100px + 100 * (100vw - 320px) / 1080);margin-right:0;}
  .hm-w .hm2 .ct h2{width:calc(300px + 250 * (100vw - 320px) / 1080);}
  .hm-w .hm2 .bg-ciel:before{background:url('/img/landscape_gsap/nuage.webp') repeat-x;opacity:.2;background-size:100vw auto;z-index:-1;content:'';position:absolute;left:0;top:0;width:200%;height:100%;animation:nuage 20s infinite linear;}
  .hm-w .hm2 .bg-ciel > *{z-index:-2;}
  .hm-w .hm2 .bg-porte > *{background-position:center right;}
  .hm-w .hm2 .bg-aventurier{transform:translateX(10%);}
  .hm-w .hm2 .bg-aventurier > *{background-position:center left;}
  .hm-w .hm2 .bg-colonne{transform:translateX(35%);}
  .hm-w .hm2 .bg-colonne > *{background-position:center right;display:none;}
  .hm-w .hm2 .totem-0{position:absolute;top:0;left:0;height:100%;transform:translateX(-15%);z-index:100;}
  .hm-w .hm2 .totem-0 img{max-width:none;width:auto;height:100%;will-change:transform;}

  .hm-w .hm3 .bg-fond{width:125%;}
  .hm-w .hm3 .hm-ct{min-width:calc(1200px + 200 * (100vw - 320px) / 1080);justify-content:flex-end;text-align:right;}
  .hm-w .hm3 .hm-ct .ct{margin-left:0;margin-right:calc(200px + 20 * (100vw - 320px) / 1080);width:calc(500px + 300 * (100vw - 320px) / 1080);}
  .hm-w .hm3 .crystal{position:absolute;top:0;right:0;height:100%;transform:translateX(60%);z-index:250;}
  .hm-w .hm3 .crystal img{display:none;max-width:none;width:auto;height:100%;will-change:transform;transform:translateX(20%);}

  .hm-w .hm4{min-width:120vw;}
  .hm-w .hm4 .hm-ct{text-align:center;min-width:calc(1200px + 200 * (100vw - 320px) / 1080);}
  .hm-w .hm4 .tok{--gut:calc(10px + 5 * (100vw - 320px) / 1080);display:flex;height:auto;margin:calc(25px + 10 * (100vw - 320px) / 1080) calc(var(--gut) * -1) 0;}
  .hm-w .hm4 .tok > *{width:50%;display:flex;align-items:center;text-align:right;}
  .hm-w .hm4 .tok > *:last-child{flex-direction:row-reverse;text-align:left;}
  .hm-w .hm4 .tok .p{margin:0;font-size:calc(13px + 1 * (100vw - 320px) / 1080);}
  .hm-w .hm4 .tok .illu{margin:0 var(--gut);display:flex;align-items:center;justify-content:center;--w:calc(130px + 10 * (100vw - 320px) / 1080);height:var(--w);width:var(--w);flex-basis:var(--w);min-width:var(--w);}
  .hm-w .hm4 .tok .illu > img{max-width:100%;max-height:100%;}
  .hm-w .hm4 .tok .illu:before{--d:110%;content:'';pointer-events:none;position:absolute;left:50%;transform:translate(-50%, -50%);top:50%;z-index:1;width:var(--d);height:var(--d);background-color:var(--kxa);border-radius:50%;filter:blur(25px);opacity:.2;}
  html:not(.firefox) .hm-w .hm4 .tok .illu:before{animation:tok-light 4s infinite linear;}
  .hm-w .hm4 .tok > *:last-child .illu:before{background-color:var(--kxs)}

  @keyframes tok-light{
    0%{opacity:.2;}
    60%{opacity:.5;}
    100%{opacity:.2;}
  }

  .hm-w .hm5 .back{width:100vw;background:linear-gradient(to bottom, #61acbf 0%, #aecfcd 40%);}
  .hm-w .hm5 .back:before{background:url('/img/landscape_gsap/nuage.webp') repeat-x;background-size:100vw auto;z-index:5;content:'';position:absolute;left:0;top:0;width:200%;height:100%;animation:nuage 20s infinite linear;}
  .hm-w .hm5 .back > *{z-index:10;}
  .hm-w .hm5 .back > .bg-mountains{z-index:3;}
  .hm-w .hm5 .mur{position:absolute;top:0;left:0;height:100%;transform:translateX(-50%);z-index:100;}
  .hm-w .hm5 .mur img{max-width:none;width:auto;height:100%;will-change:transform;}
  .hm-w .hm5 .hm-ct{text-align:center;}
  .hm-w .hm5 .hm-ct .ct .sub{color:var(--color-3);}
  .hm-w .hm5 .hm-ct .ct h2{font-size:calc(26px + 25 * (100vw - 320px) / 1080);}

  @keyframes nuage{
    0%{left:0;}
    100%{left:-100vw;}
  }

  .hm0 .bg-ciel > *{background-image:url('/img/new-home/plan-3-ciel.webp');}
  .hm0 .bg-moutain > *{background-image:url('/img/new-home/plan-2-mountain.webp');}
  .hm0 .bg-city > *{background-image:url('/img/new-home/plan-1-city.webp');}
  .hm0 .bg-aventurier{z-index:100;}
  .hm0 .bg-aventurier > *{background-image:url('/img/new-home/plan-0-aventurier.webp');}

  .hm1 .bg-forest > *{background-image:url('/img/forest_gsap/plan-6_foret.webp');}
  .hm1 .bg-arbre > *{background-image:url('/img/forest_gsap/plan-5_arbre.webp');}
  .hm1 .bg-autel > *{background-image:url('/img/forest_gsap/plan-4_autel.webp');}
  .hm1 .bg-sol > *{background-image:url('/img/forest_gsap/plan-3_sol.webp');}
  .hm1 .bg-liane > *{background-image:url('/img/forest_gsap/plan-2_liane.webp');}
  .hm1 .bg-feuille-2 > *{background-image:url('/img/forest_gsap/plan-0_feuille.webp');}
            
  .hm2 .bg-ciel > *{background-image:url('/img/cave_entry_gsap/plan-7_ciel.webp');}
  .hm2 .bg-foret-entry > *{background-image:url('/img/cave_entry_gsap/plan-6_foret.webp');}
  .hm2 .bg-porte > *{background-image:url('/img/cave_entry_gsap/plan-5_porte.webp');}
  .hm2 .bg-aventurier > *{background-image:url('/img/cave_entry_gsap/plan-4_aventurier.webp');}
  .hm2 .bg-stalagmite > *{background-image:url('/img/cave_entry_gsap/plan-3_stalagmite.webp');}
  .hm2 .bg-totem > *{background-image:url('/img/cave_entry_gsap/plan-1_totem.webp');}
  .hm2 .bg-colonne > *{background-image:url('/img/cave_entry_gsap/plan-2_colonne.webp');}

  .hm3 .bg-fond > *{background-image:url('/img/cave_gsap/plan-4_fonds.webp');}
  .hm3 .bg-aventurier-cave > *{background-image:url('/img/cave_gsap/plan-3_aventurier.webp');}
  .hm3 .bg-stalagmite-cave > *{background-image:url('/img/cave_gsap/plan-2_stalagmite.webp');}
  .hm3 .bg-stalactite-cave > *{background-image:url('/img/cave_gsap/plan-1_stalactite.webp');}
  .hm3 .bg-stalactite-cave-2 > *{background-image:url('/img/cave_gsap/plan-0_stalactite.webp');}

  .bg-ground > *{background-image:url('/img/cave_tunnel_gsap/plan-6_ground.webp');}
  .bg-aventuriers > *{background-image:url('/img/cave_tunnel_gsap/plan-5_aventuriers.webp');}
  .bg-mur > *{background-image:url('/img/cave_tunnel_gsap/plan-4_mur.webp');}
  .bg-mur-2 > *{background-image:url('/img/cave_tunnel_gsap/plan-3_mur.webp');}
  .bg-mur-3 > *{background-image:url('/img/cave_tunnel_gsap/plan-2_mur.webp');}
  .bg-mur-4 > *{background-image:url('/img/cave_tunnel_gsap/plan-1_mur.webp');}

  .bg-mountains > *{background-image:url('/img/landscape_gsap/plan-8_mountains.webp');}
  .bg-mountains-2 > *{background-image:url('/img/landscape_gsap/plan-7_mountains.webp');}
  .bg-quartier > *{background-image:url('/img/landscape_gsap/plan-6_quartier.webp');}
  .bg-quartier-2 > *{background-image:url('/img/landscape_gsap/plan-5_quartier.webp');}
  .bg-quartier-3 > *{background-image:url('/img/landscape_gsap/plan-4_quartier.webp');}
  .bg-forest-land > *{background-image:url('/img/landscape_gsap/plan-3_forest.webp');}
  .bg-aventurier-land > *{background-image:url('/img/landscape_gsap/plan-2_aventuriers.webp');}
  .bg-herbe > *{background-image:url('/img/landscape_gsap/plan-1_herbe.webp');}

  @media screen and (max-width:1084px){
    .hm-w .hm4 .tok{display:block;}
    .hm-w .hm4 .tok > *{flex-direction:row-reverse!important;text-align:left;width:100%;}
    .hm-w .hm4 .tok > * + *{margin-top:calc(20px + 5 * (100vw - 320px) / 1080);}
    .hm-w .hm4 .tok .illu{--w:calc(80px + 50 * (100vw - 320px) / 1080);}
  }
  @media screen and (max-width:900px){
    .hm-w .hm0{text-align:center;}
    .hm-w .hm0 .logo{margin-right:auto;}
    .hm-w .butt-c{justify-content:center;}
  }
  @media screen and (max-width:600px){
    html.mob .hm-w .hm4 .tok > *{flex-direction:column-reverse!important;align-items:center;justify-content:center;text-align:center;}
    html.mob .hm-w .hm4 .tok > * .illu{margin-bottom:var(--gutter);}
  }
  @media screen and (max-width:500px){
    .hm-w .butt-c{flex-direction:column;}
    .hm-w .butt-c > * + *{margin-left:0;margin-top:10px;}
  }
</style>
