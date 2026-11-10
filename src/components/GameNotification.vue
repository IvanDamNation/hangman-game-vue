<script setup lang="ts">
import { onUnmounted, ref } from 'vue'

const isVisible = ref(false)
let timeoutId: ReturnType<typeof setTimeout> | null = null

const triggerShow = () => {
  if (timeoutId) clearTimeout(timeoutId)

  isVisible.value = true

  timeoutId = setTimeout(() => {
    isVisible.value = false
  }, 2000)
}

onUnmounted(() => {
  if (timeoutId) clearTimeout(timeoutId)
})

defineExpose({ triggerShow })
</script>

<template>
  <div class="notification-container" :class="{ show: isVisible }">
    <p>You already picked this letter</p>
  </div>
</template>
