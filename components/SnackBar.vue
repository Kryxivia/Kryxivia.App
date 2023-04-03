<template>
    <div class="snackbar" :class="{ active: isActive }">
      {{ message }}
      <button @click="close">X</button>
    </div>
  </template>
  
  <script setup>
    import { ref } from 'vue';
  
    const isActive = ref(false);
    const message = ref('');
  
    function openSnackbar(msg) {
      message.value = msg;
      isActive.value = true;
      setTimeout(() => {
        isActive.value = false;
      }, 3000);
    }
  
    function close() {
      isActive.value = false;
    }
  </script>
  
  <style>
    .snackbar {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      background-color: #333;
      color: #fff;
      padding: 10px;
      text-align: center;
      transition: transform 0.3s ease-out;
      transform: translateY(100%);
      z-index: 999;
    }
    .snackbar.active {
      transform: translateY(0);
    }
  </style>
  