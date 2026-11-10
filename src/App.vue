<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import GameFigure from './components/GameFigure.vue'
import GameHeader from './components/GameHeader.vue'
import GameMistakes from './components/GameMistakes.vue'
import GameNotification from './components/GameNotification.vue'
import GamePopup from './components/GamePopup.vue'
import GameWord from './components/GameWord.vue'

const MAX_ERRORS = 6

const word = ref('example')
const enteredLetters = ref<string[]>([])
const popupRef = ref<InstanceType<typeof GameNotification> | null>(null)

// TODO: optimization O(NM) => O(N)
const correctLetters = computed(() =>
  enteredLetters.value.filter((char) => word.value.includes(char)),
)
const wrongLetters = computed(() =>
  enteredLetters.value.filter((char) => !word.value.includes(char)),
)

const isStatusWin = computed(() => word.value.split('').every((char) => enteredLetters.value.includes(char)))
const isStatusLose = computed(() => wrongLetters.value.length >= MAX_ERRORS)
const isGameOver = computed(() => isStatusWin.value || isStatusLose.value)

const handleKeydown = (event: KeyboardEvent) => {
  if (isGameOver.value) return

  const key = event.key.toLowerCase()
  if (/^[a-zа-яё]$/.test(key)) {
    if (enteredLetters.value.includes(key)) {
      popupRef.value?.triggerShow()
    } else {
      enteredLetters.value.push(key)
    }
  }
}

const restartGame = () => {
  enteredLetters.value = []
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <!-- DEBUG -->
  <div>{{ word }}</div>
  <div>{{ enteredLetters }}</div>
  <div>{{ correctLetters }}</div>
  <div>{{ wrongLetters }}</div>
  <!-- DEBUG (END) -->

  <GameHeader />
  <div class="game-container">
    <GameFigure :errors-count="wrongLetters.length" />
    <GameMistakes :wrong-letters="wrongLetters" />
    <GameWord :word="word" :correct-letters="correctLetters" />
  </div>

  <GamePopup v-if="isGameOver" :is-win="isStatusWin" :secret-word="word" @restart="restartGame" />
  <GameNotification ref="popupRef" />
</template>
