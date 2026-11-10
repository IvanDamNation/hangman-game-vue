<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import GameFigure from './components/GameFigure.vue'
import GameHeader from './components/GameHeader.vue'
import GameMistakes from './components/GameMistakes.vue'
import GameNotification from './components/GameNotification.vue'
import GamePopup from './components/GamePopup.vue'
import GameWord from './components/GameWord.vue'

const word = ref('example')
const enteredLetters = ref<string[]>([])

// TODO: optimization O(NM) => O(N)
const correctLetters = computed(() =>
  enteredLetters.value.filter((char) => word.value.includes(char)),
)
const wrongLetters = computed(() =>
  enteredLetters.value.filter((char) => !word.value.includes(char)),
)

// TODO: only unique keys
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
  {{ correctLetters }}
  {{ wrongLetters }}
  <GameHeader />
  <div class="game-container">
    <GameFigure />
    <GameMistakes :wrong-letters="wrongLetters" />
    <GameWord :word="word" :correct-letters="correctLetters" />
  </div>

  <GamePopup v-if="false" />
  <GameNotification />
</template>
