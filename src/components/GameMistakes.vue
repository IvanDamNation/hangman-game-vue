<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  wrongLetters: string[]
}

const { wrongLetters } = defineProps<Props>()

const formattedWrongLetters = computed<string>(() => wrongLetters.join(', '))
</script>

<template>
  <div v-if="wrongLetters.length" class="wrong-letters-container">
    <div class="wrong-letters">
      <p>Errors</p>
      <span>
        {{ formattedWrongLetters }}
      </span>
    </div>
  </div>
</template>
