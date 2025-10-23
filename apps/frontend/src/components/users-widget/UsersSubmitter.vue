<script>
export default {}
</script>

<template>
  <div class="card user-add-form-container">
    <h2>Новый пользователь</h2>
    <form @submit="handleAdd" id="elFormAddUser">
      <div class="form-grid">
        <div class="form-group">
          <label for="new-nickname">Никнейм</label>
          <input
            type="text"
            id="new-nickname"
            name="nickname"
            placeholder="Введите никнейм"
            required
          />
        </div>
        <div class="form-group">
          <label for="new-password">Пароль</label>
          <input
            type="password"
            id="new-password"
            name="password"
            placeholder="Пароль"
            required
          />
        </div>
        <div class="form-group">
          <label for="new-email">Email</label>
          <input
            type="email"
            id="new-email"
            name="email"
            placeholder="example@mail.com"
            required
          />
        </div>
        <div class="form-group">
          <label for="new-money">Баланс (₽)</label>
          <input type="number" id="new-money" name="money" value="0" min="0" />
        </div>
        <div class="form-group checkbox-group">
          <input type="checkbox" id="new-is-online" name="isOnline" />
          <label for="new-is-online">Пользователь онлайн</label>
        </div>
      </div>
      <button type="submit" class="control-btn primary">
        <span class="icon">➕</span> Добавить пользователя
      </button>
    </form>
  </div>
</template>
