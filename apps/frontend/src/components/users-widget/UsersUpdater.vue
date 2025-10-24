<script>
export default {
  emits: ['refresh'],
}
</script>

<template>
  <header class="main-header">
    <h1>Панель Управления Пользователями ✨</h1>
    <div class="table-controls">
      <button
        id="elButtonRefreshAll"
        class="control-btn refresh"
        @click="$emit('refresh')"
      >
        <span class="icon">🔄</span> Обновить данные
      </button>
    </div>
  </header>
</template>
