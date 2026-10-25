<script lang="ts">
    let { label, value, type } = $props();
    const isEditing = $state(false);
    const originalValue = value;
</script>