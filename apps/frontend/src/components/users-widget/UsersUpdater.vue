<script>
export default {}
</script>

<template>
  <header class="main-header">
    <h1>Панель Управления Пользователями ✨</h1>
    <div class="table-controls">
      <button
        @click="handleRefresh"
        id="elButtonRefreshAll"
        class="control-btn refresh"
      >
        <span class="icon">🔄</span> Обновить данные
      </button>
    </div>
  </header>
</template>
