<script>
    import { fly } from "svelte/transition";
    import { flip } from "svelte/animate";
    import { tools } from "$lib/constants"
    import { toolOrder } from "$lib/stores/toolOrder.js"

    function getTool(index) {
        if (tools.length <= index) return null;
        return tools[index];
    }

    $: orderedTools = $toolOrder.map(i => getTool(i - 1));

    let itemSwapID = null;

    function addSwapIndex(id) {
        if (itemSwapID == id)
            itemSwapID = null;
        else if (itemSwapID !== null) {
            const indexA = orderedTools.findIndex(tool => tool.id === itemSwapID);
            const indexB = orderedTools.findIndex(tool => tool.id === id);

            toolOrder.swap(indexA, indexB);
            itemSwapID = null;
        } else {
            itemSwapID = id;
        }
    }

    let isShowingMenu = false;
  
    function toggleMenu() {
        isShowingMenu = !isShowingMenu;
    }
</script>

<header class="bg-base-200 dark:bg-dark-base-200 bg-opacity-80 backdrop-blur-md border-b border-base-300 dark:border-dark-base-200 fixed w-screen text-gray-800 h-16 flex justify-between md:justify-around items-center p-5 z-50">
    <a href="/" class="dark:text-base-400 font-bold font-mono text-xl">tools.zabinski.dev</a>

    <section class="md:flex hidden dark:text-base-300">
        <a href="https://zabinski.dev" class="px-4 py-2 hover:bg-base-200 dark:hover:bg-dark-base-150 transition-colors duration-200 rounded-xl">About me</a>
        <a href="mailto:developer@zabinski.dev" class="px-4 py-2 font-[600] hover:bg-base-200 dark:hover:bg-dark-base-150 transition-colors duration-200 rounded-xl">Contact</a>
    </section>

    <!-- DROPDOWN TOGGLE -->
    <button
        aria-label="Menu"
        on:click={toggleMenu}
        class:text-base-800={isShowingMenu}
        class:dark:text-base-500={isShowingMenu}
        class:dark:text-base-300={!isShowingMenu}
        class:text-gray-800={!isShowingMenu}
        class="md:hidden p-3 hover:bg-dark-base-150 rounded-xl flex justify-center items-center transition-colors duration-200"
    >
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6Z"
                fill="currentColor"
            />

            <path
                d="M2 12.0322C2 11.4799 2.44772 11.0322 3 11.0322H21C21.5523 11.0322 22 11.4799 22 12.0322C22 12.5845 21.5523 13.0322 21 13.0322H3C2.44772 13.0322 2 12.5845 2 12.0322Z"
                fill="currentColor"
            />
            
            <path
                d="M3 17.0645C2.44772 17.0645 2 17.5122 2 18.0645C2 18.6167 2.44772 19.0645 3 19.0645H21C21.5523 19.0645 22 18.6167 22 18.0645C22 17.5122 21.5523 17.0645 21 17.0645H3Z"
                fill="currentColor"
            />
        </svg>
    </button>
</header>

<div class="h-16" />

<!-- Dropdown Menu for Small Screens -->
{#if isShowingMenu}
    <div transition:fly={{ y: -100, duration: 200 }} class="fixed py-2 px-2 w-full z-50">
        <div class="block md:hidden w-full py-2 px-2 space-y-2 font-medium bg-base-200 dark:bg-dark-base-200 rounded-xl">
            <a href="https://zabinski.dev" class="rounded-lg block px-4 py-5 text-sm text-gray-800 dark:text-base-300 hover:bg-base-300 dark:hover:bg-dark-base-150">About me</a>
            
            <div class="h-[1px] bg-base-300 dark:bg-dark-base-150 bg-opacity-80 rounded-full"/>

            <a href="mailto:developer@zabinski.dev" class="rounded-lg block px-4 py-5 text-sm text-gray-800 dark:text-base-300 hover:bg-base-300 dark:hover:bg-dark-base-150">Contact</a>
        </div>
    </div>
{/if}

<section class="w-screen min-h-screen flex flex-col justify-center items-center">
    <main class="p-3 py-3 lg:px-0 limit-screen-width">
        <section class="text-center animated-gradient border border-base-300 dark:border-dark-base-300 dark:text-base-400 rounded-2xl py-8">
            <h1 class="text-3xl sm:text-5xl p-3 font-[800]">Specialised Tools</h1>
            <p class="text-md sm:text-xl pt-2 dark:text-base-300">Your productivity, simplified.</p>
        </section>
        
        <section class="w-full mx-auto grid gap-5 place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-5 h-full">
            {#each orderedTools as tool (tool.id)}
                {@const isSelected = itemSwapID == tool.id}

                <div
                    animate:flip={{ duration: 350 }}
                    class:border-base-800={isSelected} class:dark:border-base-400={isSelected} class:dark:border-dark-base-200={!isSelected} class:border-base-300={!isSelected}
                    class="group relative h-36 text-left overflow-clip w-full bg-base-200 dark:bg-dark-base-200 dark:text-base-400 bg-opacity-60 backdrop-blur-lg hover:bg-opacity-80 border rounded-2xl"
                >
                    <a href={`/${tool.path}`} class="w-full h-full flex flex-col items-center space-y-2">
                        <h2 class="font-[600] h-10 p-3 bg-base-200 dark:bg-dark-base-100 w-full">
                            {tool.name}
                        </h2>

                        <p class="text-slate-900 p-3 dark:text-base-200 w-full text-sm">{tool.description}</p>
                    </a>

                    <button on:click={() => addSwapIndex(tool.id)} class:hidden={!isSelected} class="absolute group-hover:block top-1 right-1 p-2 hover:bg-base-300 dark:hover:bg-dark-base-150 rounded-xl">
                        <svg class="text-border-base-800" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.81812 4.68161C4.99386 4.85734 4.99386 5.14227 4.81812 5.318L3.08632 7.0498H11.9135L10.1817 5.318C10.006 5.14227 10.006 4.85734 10.1817 4.68161C10.3575 4.50587 10.6424 4.50587 10.8181 4.68161L13.3181 7.18161C13.4939 7.35734 13.4939 7.64227 13.3181 7.818L10.8181 10.318C10.6424 10.4937 10.3575 10.4937 10.1817 10.318C10.006 10.1423 10.006 9.85734 10.1817 9.68161L11.9135 7.9498H3.08632L4.81812 9.68161C4.99386 9.85734 4.99386 10.1423 4.81812 10.318C4.64239 10.4937 4.35746 10.4937 4.18173 10.318L1.68173 7.818C1.50599 7.64227 1.50599 7.35734 1.68173 7.18161L4.18173 4.68161C4.35746 4.50587 4.64239 4.50587 4.81812 4.68161Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
            {/each}
        </section>
    </main>
</section>