<template>
  <div ref="innerRef"></div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";

const innerRef = ref();

onMounted(() => {
  axios.get("/sse").then((val) => {
    innerRef.value.innerHTML = JSON.stringify();
  });
});
</script>

<style scoped lang="scss"></style>
