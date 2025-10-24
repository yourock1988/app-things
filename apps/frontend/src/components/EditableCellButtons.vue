<script>
export default {
  emits: ['edit', 'delete'],
}
</script>

<template>
  <td data-label="actions" class="actions-cell">
    <button class="action-btn edit-btn" @click="$emit('edit')">
      Редактировать
    </button>
    <button class="action-btn delete-btn" @click="$emit('delete')">
      Удалить
    </button>
  </td>
</template>
