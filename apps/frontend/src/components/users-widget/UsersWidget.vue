<script>
export default {
  data() {
    return {
      createdUser: {
        nickname: '',
        password: '',
        email: '',
        money: 0,
        isOnline: false,
      },
      users: [
        {
          id: 111,
          nickname: 'YouROCK',
          password: 'qwerty123',
          email: 'yourock88@super-mail.com',
          money: 42,
          isOnline: false,
        },
        {
          id: 112,
          nickname: 'YouROCK',
          password: 'qwerty123',
          email: 'yourock88@super-mail.com',
          money: 42,
          isOnline: false,
        },
      ],
    }
  },

  methods: {
    handleRefresh() {
      console.log('REFRESH')
    },
    handleAdd(e) {
      e.preventDefault()
      console.log(e.target)
      const data = Object.fromEntries(new FormData(e.target).entries())
      data.money = +data.money
      data.isOnline = !!data.isOnline
      console.log('ADD', data)
    },
    handleEdit(user) {
      console.log('EDIT', user)
    },
    handleDelete(user) {
      console.log('DELETE', user)
    },
  },
}
</script>

<template>
  <div id="w">
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
            <input
              type="number"
              id="new-money"
              name="money"
              value="0"
              min="0"
            />
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

    <div class="card table-wrapper">
      <table id="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Никнейм</th>
            <th>Пароль</th>
            <th>Email</th>
            <th>Баланс</th>
            <th>Онлайн</th>
            <th>Действия</th>
          </tr>
        </thead>

        <tbody id="elTBodyUsers">
          <tr v-for="user of users" :key="user.id" :data-id="user.id">
            <td data-label="id">{{ user.id }}</td>
            <td
              @input="user.nickname = $event.target.textContent"
              data-label="nickname"
              contenteditable="true"
            >
              {{ user.nickname }}
            </td>
            <td
              @input="user.password = $event.target.textContent"
              data-label="password"
              contenteditable="true"
            >
              {{ user.password }}
            </td>
            <td
              @input="user.email = $event.target.textContent"
              data-label="email"
              contenteditable="true"
            >
              {{ user.email }}
            </td>
            <td
              @input="user.money = +$event.target.textContent"
              data-label="money"
              contenteditable="true"
            >
              {{ user.money }}
            </td>
            <td data-label="isOnline" class="online-checkbox-cell">
              <input
                type="checkbox"
                class="online-status-checkbox"
                v-model="user.isOnline"
              />
            </td>
            <td data-label="actions" class="actions-cell">
              <button @click="handleEdit(user)" class="action-btn edit-btn">
                Редактировать
              </button>
              <button @click="handleDelete(user)" class="action-btn delete-btn">
                Удалить
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
