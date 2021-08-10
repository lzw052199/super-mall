<template>
   <div id="tab-bar">
      <slot></slot>
  </div>
</template>

<script>
export default {
  name:'TabBar'
}
</script>

<style>
  
  #tab-bar{
    display: flex;
    background-color: rgba(35, 228, 122, 0.9);

    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

    box-shadow: 0px -1px 1px rgba(100, 100, 100, .1);
  }
 
</style>