export default defineNuxtPlugin(nuxtApp => {

  class Modal {
    constructor() {

      this.class = {
        open_container: 'open-mod',
        open: 'open',
        stop: 'stop'
      }

    }
    open(id, callback = () => {}) {
      try {

        qs(`[data-modal="${id}"]`).classList.add(this.class.open)
        qs('html').classList.add(this.class.stop, this.class.open_container)
      
            // window.soundManager.playSoundOnce('open.ogg')
      
            // if(id == 'trailer'){
            //   this.playTrailer();
            // }

        callback()

      } catch(e) {

        console.warn(`The modal(${id}) does not exist.`)
        
      }
    }
    close(id, callback = () => {}) {
      try {

        qs(`[data-modal="${id}"]`).classList.remove(this.class.open)
        qs('html').classList.remove(this.class.stop, this.class.open_container)
        
            // window.soundManager.playSoundOnce('open.ogg')
      
            // if(id == 'trailer'){
            //   this.playTrailer();
            // }

        callback()

      } catch(e) {

        console.warn(`The modal(${id}) does not exist.`)
        
      }
    }
  }

  /** provide $modal system */
  nuxtApp.provide('modal', new Modal())

})



// import { qs, qsa } from '@/utils';
// export default class Modal {
//     constructor() {

//       this.datas = {
//         modal: 'data-modal',
//         open: 'data-modal-open',
//         close: 'data-modal-close'
//       };

//       this.class = {
//         open_container: 'open-mod',
//         open: 'open',
//         stop: 'stop'
//       };

//       this.selectors = {
//           container: '#mod',
//           modal: '['+ this.datas.modal +']',
//           open: '['+ this.datas.open +']',
//           close: '['+ this.datas.close +']'
//       };

//       this.dom = {
//           html: qs('html'),
//           container: qs(this.selectors.container),
//           modal: qsa(this.selectors.modal),
//           open: qsa(this.selectors.open),
//           close: qsa(this.selectors.close)
//       };

//       this.initAction();

//     }
//     initAction(){

//       // open
//       this.dom.open.forEach(open => open.addEventListener('click', e => this.openBtn(e)));

//       // close
//       this.dom.close.forEach(close => close.addEventListener('click', e => this.closeBtn(e)));

//       // close all
//       this.dom.container.addEventListener('mousedown', e => this.closeAll(e));

//     }
//     openBtn(e){

//       e.preventDefault();

//       let id = e.currentTarget.getAttribute(this.datas.open);
//       this.open(id);

//     }
//     open(id){

//       let modal = qs('['+ this.datas.modal +'="'+ id +'"]');

//       modal.classList.add(this.class.open);
//       this.dom.html.classList.add(this.class.stop);
//       this.dom.html.classList.add(this.class.open_container);

//       window.soundManager.playSoundOnce('open.ogg');

//       if(id == 'trailer'){
//         this.playTrailer();
//       }

//     }
//     closeBtn(e){

//       e.preventDefault();

//       let id = e.currentTarget.getAttribute(this.datas.close);
//       this.close(id);

//     }
//     close(id){

//       let modal = qs('['+ this.datas.modal +'="'+ id +'"]');

//       modal.classList.remove(this.class.open);
//       this.dom.html.classList.remove(this.class.stop);
//       this.dom.html.classList.remove(this.class.open_container);
      
//       window.soundManager.playSoundOnce('close.ogg');

//       if(id == 'trailer'){
//         this.stopTrailer();
//       }

//     }
//     closeAll(e){

//       if(!e.target.matches('.mod, .mod *')){
//         qsa(this.selectors.modal).forEach(modal => modal.classList.remove(this.class.open));
//         this.dom.html.classList.remove(this.class.stop);
//         this.dom.html.classList.remove(this.class.open_container);
//         window.soundManager.playSoundOnce('close.ogg');
//         this.stopTrailer();
//       }

//     }
//     controlVideo(vidcontrol){

//       let div = document.getElementById("yt-trailer");
//       let $i = div.getElementsByTagName("iframe")[0].contentWindow;
//       $i.postMessage('{"event":"command","func":"' + vidcontrol + '","args":""}', '*');

//     }
//     playTrailer(){
//       this.controlVideo('playVideo');
//       window.soundManager.updateAmbient({
//           all: {
//             vol: 0
//           }
//       });
//     }
//     stopTrailer(){
//       this.controlVideo('stopVideo');
//       window.soundManager.updateAmbientBase();
//     }
// }