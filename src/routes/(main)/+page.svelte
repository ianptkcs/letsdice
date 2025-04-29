<script lang="ts">
    const { data } = $props();
    const { user } = $derived(data);
</script>

<div class="flex flex-col gap-4">
    <h1 class="text-2xl font-bold">Auth</h1>
    <p class="text-sm text-gray-500">
        This is a demo of the auth system using supabase.
    </p>
    <div class="flex flex-col gap-4">
        <h2 class="text-xl font-bold">User</h2>
        {#if user}
            <p class="text-sm text-gray-500">You are logged in.</p>
        {:else}
            <p class="text-sm text-gray-500">You are not logged in.</p>
        {/if}
    </div>
</div>
