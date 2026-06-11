<template>
  <div class="oscillation">
    <h2>{{ device.name }} - Oscillation Control
      <span v-if="oscillatorIndex >= 0">- Oscillator {{ oscillatorIndex }}</span>
      <span v-if="oscillatorIndex < 0">- All Oscillators</span>
    </h2>
    <vue-slider ref="slider"
                :real-time="true"
                v-model="sliderValue"
                @drag-start="OnDragStart"
                @drag-end="OnDragEnd"
                @callback="OnValueChanged"
                @click="OnValueChanged">
    </vue-slider>
  </div>
</template>

<script lang="ts" src="./OscillationComponent.ts">
</script>

<style lang="css">
</style>
