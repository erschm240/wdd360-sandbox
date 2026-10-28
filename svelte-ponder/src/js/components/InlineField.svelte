<script lang="ts">
    let {
        label,
        value = $bindable(),
        type = "text"
    } : {
            label: string;
            value: string;
            type?: "text" | "email" | "textarea";
        } = $props();

    let isEditing = $state(false);
    let originalValue = value;

    function startEdit() {
        originalValue = value;
        isEditing = true;
    }

    function commitEdit() {
        isEditing = false;
    }

    function cancelEdit() {
        value = originalValue;
        isEditing = false;
    }

    function onInputKeydown(event: KeyboardEvent) {
        if (event.key === "Enter" && type !== "textarea") {
            event.preventDefault();
            commitEdit();
        }
        if (event.key === "Escape") {
            event.preventDefault();
            cancelEdit();
        }
    }
</script>

<div>
    <div>{label}</div>
    {#if isEditing}
        {#if type === "textarea"}
        <textarea bind:value onblur={commitEdit} onkeydown={onInputKeydown}></textarea>
        {:else}
            <input {type} bind:value onblur={commitEdit} onkeydown={onInputKeydown}/>
        {/if}
    {:else}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <p class="value" onclick={startEdit}>{value}</p>
    {/if}
</div>