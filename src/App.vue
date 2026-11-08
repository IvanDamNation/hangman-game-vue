<script setup lang="ts">
import GameFigure from './components/GameFigure.vue'
import GameHeader from './components/GameHeader.vue'
import GameMistakes from './components/GameMistakes.vue'
import GameNotification from './components/GameNotification.vue'
import GamePopup from './components/GamePopup.vue'
import GameWord from './components/GameWord.vue'
</script>

<template>
  <GameHeader />
  <div class="game-container">
    <GameFigure />
    <GameMistakes />
    <GameWord />
  </div>

  <GamePopup v-if="false" />
  <GameNotification />
</template>
