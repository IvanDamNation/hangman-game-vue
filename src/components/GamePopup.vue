<script setup lang="ts">
interface Props {
  isWin: boolean
  secretWord: string
}

interface Emits {
  restart: []
}

defineProps<Props>()
const emit = defineEmits<Emits>()
</script>

<template>
  <div class="popup-container">
    <div class="popup">
      <h2 v-if="isWin">Congrats, you win! 😃</h2>
      <template v-else>
        <h2>You lose. 😕</h2>
        <h3>...word: {{ secretWord }}</h3>
      </template>
      <button @click="emit('restart')">Try again</button>
    </div>
  </div>
</template>
