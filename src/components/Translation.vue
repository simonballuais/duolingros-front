<template>
    <li>
        {{ translation.id }} - {{ translation.text }}
    </li>
</template>

<script>
export default {
  props: [
    'translation',
  ],
}
</script>

