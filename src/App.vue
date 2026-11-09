<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import GameFigure from './components/GameFigure.vue'
import GameHeader from './components/GameHeader.vue'
import GameMistakes from './components/GameMistakes.vue'
import GameNotification from './components/GameNotification.vue'
import GamePopup from './components/GamePopup.vue'
import GameWord from './components/GameWord.vue'

const word = ref('Anna')
const enteredLetters = ref<string[]>([])

const handleKeydown = (event: KeyboardEvent) => {
  const key = event.key.toLowerCase()
  if (/^[a-zа-яё]$/.test(key)) {
    enteredLetters.value.push(key)
  }
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<template>
  {{ word }}
  {{ enteredLetters }}
  <GameHeader />
  <div class="game-container">
    <GameFigure />
    <GameMistakes />
    <GameWord :word="word" />
  </div>

  <GamePopup v-if="false" />
  <GameNotification />
</template>
