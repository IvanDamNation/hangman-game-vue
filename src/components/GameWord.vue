<script setup lang="ts">
interface Props {
  word: string
}

defineProps<Props>()
</script>

<template>
  <div class="word">
    <span v-for="(letter, index) in word" :key="index" class="letter"></span>
  </div>
</template>
