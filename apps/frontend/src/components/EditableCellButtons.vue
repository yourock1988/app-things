<script>
export default {
  props: ['user'],
}
</script>

<template>
  <td data-label="actions" class="actions-cell">
    <button @click="handleEdit(user)" class="action-btn edit-btn">
      Редактировать
    </button>
    <button @click="handleDelete(user)" class="action-btn delete-btn">
      Удалить
    </button>
  </td>
</template>
