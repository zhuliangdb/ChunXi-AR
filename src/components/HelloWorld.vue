<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <section class="hello-world" aria-labelledby="hello-heading">
    <h1 id="hello-heading">{{ msg }}</h1>

    <div class="card">
      <button 
        type="button" 
        @click="count++"
        aria-label="增加计数"
      >
        计数: {{ count }}
      </button>
    </div>
  </section>
</template>

<style scoped>
.hello-world {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.card {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

button {
  background-color: #c41e3a;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #a11a30;
}

button:focus {
  outline: 2px solid #d4af37;
  outline-offset: 2px;
}
</style>
