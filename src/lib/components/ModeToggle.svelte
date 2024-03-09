<script>
    export let mode;
    export let modes;

    function changeMode(newMode) {
        mode = newMode
    }
</script>

<div class="w-full max-w-96 h-full md:opacity-50 hover:opacity-100 transition-opacity flex justify-around bg-base-200 dark:bg-dark-base-200 rounded-2xl overflow-clip text-base-800 dark:text-dark-base-250 hover:dark:text-base-400 font-semibold">
    {#each modes as mode}
        <button on:click={() => changeMode(mode)} class="w-full h-full px-3 py-2 hover:bg-base-300 hover:dark:bg-dark-base-150 transition-colors duration-300">{mode}</button>
    {/each}
</div>