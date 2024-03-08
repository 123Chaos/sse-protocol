<template>
  <a-card
    hoverable
    :style="{
      position: 'absolute',
      width: '70%',
      maxHeight: '70%',
      minHeight: '20%',
      marginLeft: '15%',
      bottom: '15%',
      overflow: 'scroll ',
    }"
  >
    <a-spin dot :loading="isLoading">
      <div
        :style="{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }"
      >
        <v-md-preview :text="msg"></v-md-preview>
      </div>
    </a-spin>
    <a-input-search
      v-model="prompt"
      placeholder="Please enter something"
      search-button
      @search="onSearch"
      :disabled="isLoading"
    >
      <template #button-default> Search </template>
    </a-input-search>
  </a-card>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";

const msg = ref("");
const prompt = ref("");
const isLoading = ref(false);
const executed = ref(false);

const onSearch = () => {
  isLoading.value = true;
  msg.value = "";
  axios
    .get("http://localhost:3000/search", {
      params: {
        prompt: prompt.value,
      },
    })
    .then(() => {
      const eventSource = new EventSource("http://localhost:3000/sse");

      eventSource.addEventListener("message", (e) => {
        if (!executed.value) {
          isLoading.value = false;
          executed.value = true;
        }
        if (e.data === "NONE") {
          eventSource.close();
          executed.value = false;
          return;
        }
        msg.value += e.data;
      });

      eventSource.addEventListener("error", () => {
        isLoading.value = false;
      });
    });
};
</script>
