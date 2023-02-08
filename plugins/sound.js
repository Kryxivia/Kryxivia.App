// class Sound {
//   constructor() {

//       this.ambientSources = {
//         music: {
//           file: 'music.mp3',
//           vol: .3,
//           play: true
//         },
//         grotte: {
//           file: 'grotte.ogg',
//           vol: .5,
//           play: false
//         }
//       };

//       this.ambient = [];

//       this.selectors = {
//           sound: 'sound',
//           noSound: 'no-sound'
//       };

//       this.dom = {
//           sound: qs(this.selectors.sound),
//           noSound: qs(this.selectors.noSound),
//       };

//       this.dir = '/sound/';

//       // init ambient
//       for (const [key, info] of Object.entries(this.ambientSources)) {
//         this.initAmbient(key, info.file, info.vol, info.play);
//       };

//   }

//   initAmbient(name, file, vol, play) {

//       if(this.ambient[name] == undefined){
//         this.ambient[name] = new Audio(this.dir + file);
//       }
//       this.ambient[name].loop = true;
//       this.ambient[name].volume = vol;

//       let soundEnabled = window.localStorage.getItem('sound');
//       if (soundEnabled === 'mute') {
//           this.soundEnabled = false;
//           document.body.classList.add(this.selectors.noSound);
//       } else {
//           this.soundEnabled = true;
//           if(play == true){
//             this.ambient[name].play();
//           }
//       }
//   }

//   updateAmbient(params){

//     for (const [key, info] of Object.entries(params)) {
//       if(key == 'all'){
//         for (const [key, amb] of Object.entries(this.ambientSources)) {
//           this.ambientSources[key].play = info.play;
//           if(info.play == true && this.soundEnabled){
//             this.ambient[key].play();
//           }else{
//             this.ambient[key].pause();
//           }
//         };
//       }else{
//         if(info.vol != undefined){
//           this.ambient[key].volume = info.vol;
//         }
//         if(info.play == true && this.soundEnabled){
//           this.ambient[key].play();
//         }else{
//           this.ambient[key].pause();
//         }
//         this.ambientSources[key].play = info.play;
//         this.ambientSources[key].vol = info.vol;
//       }
//     };

//   }

//   updateAmbientBase(){

//     this.updateAmbient({
//       all: {
//         play: false
//       },
//       music: {
//         play: true,
//         vol: .3
//       },
//       grotte: {
//         play: false
//       }
//     });

//   }

//   toggleSound() {
//       this.soundEnabled ? this.muteSound() : this.unmuteSound();
//   }

//   muteSound() {
//       window.localStorage.setItem('sound', 'mute');
//       for (const [key, info] of Object.entries(this.ambientSources)) {
//         this.ambient[key].pause();
//       };
//       this.soundEnabled = false;
//       document.body.classList.add(this.selectors.noSound);
//   }

//   unmuteSound() {
//       window.localStorage.setItem('sound', 'play');
//       for (const [key, info] of Object.entries(this.ambientSources)) {
//         if(info.play == true){
//           this.ambient[key].play();
//         }
//       };
//       this.soundEnabled = true;
//       document.body.classList.remove(this.selectors.noSound);
//   }

//   playSoundOnce(audioName, volume = .2) {
//       if (this.soundEnabled) {
//           let audio = new Audio(this.dir + audioName);
//           audio.volume = volume;
//           audio.play();
//       }
//   }

// }

export default defineNuxtPlugin(nuxtApp => {

  // const sound = new Sound()

  // nuxtApp.provide('sound', sound)
  
})