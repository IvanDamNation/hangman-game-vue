<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import GameFigure from './components/GameFigure.vue'
import GameHeader from './components/GameHeader.vue'
import GameMistakes from './components/GameMistakes.vue'
import GameNotification from './components/GameNotification.vue'
import GamePopup from './components/GamePopup.vue'
import GameWord from './components/GameWord.vue'

const MAX_ERRORS = 6

const WORDS_BANK = [
  'example',
  'vue',
  'typescript',
  'frontend',
  'programming',
  'javascript',
  'component',
]

const getRandomWord = (currentWord: string = ''): string => {
  const avaliableWords = WORDS_BANK.filter((w) => w !== currentWord)
  const sourceList = avaliableWords.length > 0 ? avaliableWords : WORDS_BANK
  const randomIndex = Math.floor(Math.random() * sourceList.length)
  return sourceList[randomIndex]!
}

const word = ref(getRandomWord())
const enteredLetters = ref<string[]>([])
const popupRef = ref<InstanceType<typeof GameNotification> | null>(null)

const wordLetterSet = computed(() => new Set(word.value.split('')))
const correctLetters = computed(() =>
  enteredLetters.value.filter((char) => wordLetterSet.value.has(char)),
)
const wrongLetters = computed(() =>
  enteredLetters.value.filter((char) => !wordLetterSet.value.has(char)),
)

const isStatusWin = computed(() =>
  [...wordLetterSet.value].every((char) => enteredLetters.value.includes(char)),
)
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
  word.value = getRandomWord(word.value)
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <GameHeader />
  <div class="game-container">
    <GameFigure :errors-count="wrongLetters.length" />
    <GameMistakes :wrong-letters="wrongLetters" />
    <GameWord :word="word" :correct-letters="correctLetters" />
  </div>

  <GamePopup v-if="isGameOver" :is-win="isStatusWin" :secret-word="word" @restart="restartGame" />
  <GameNotification ref="popupRef" />
</template>
