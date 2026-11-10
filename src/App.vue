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
const popupRef = ref<InstanceType<typeof GameNotification> | null>(null)

// TODO: optimization O(NM) => O(N)
const correctLetters = computed(() =>
  enteredLetters.value.filter((char) => word.value.includes(char)),
)
const wrongLetters = computed(() =>
  enteredLetters.value.filter((char) => !word.value.includes(char)),
)

const handleKeydown = (event: KeyboardEvent) => {
  const key = event.key.toLowerCase()
  if (/^[a-zа-яё]$/.test(key)) {
    if (enteredLetters.value.includes(key)) {
      popupRef.value?.triggerShow()
    } else {
      enteredLetters.value.push(key)
    }
  }
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

  <GamePopup v-if="false" />
  <GameNotification ref="popupRef" />
</template>
