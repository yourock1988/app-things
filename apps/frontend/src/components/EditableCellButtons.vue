<script>
export default {
  props: ['user'],

  emits: ['edit', 'delete'],
}
</script>

<template>
  <td data-label="actions" class="actions-cell">
    <button @click="$emit('edit')" class="action-btn edit-btn">
      Редактировать
    </button>
    <button @click="$emit('delete')" class="action-btn delete-btn">
      Удалить
    </button>
  </td>
</template>
