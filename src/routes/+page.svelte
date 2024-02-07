<script>
    import { fly } from "svelte/transition";

    export let data;

    let isShowingMenu = false
  
    function toggleMenu() {
        isShowingMenu = !isShowingMenu;
    }
</script>

<header class="bg-base-200 bg-opacity-80 backdrop-blur-md border-b border-base-300 fixed w-screen text-gray-800 h-16 flex justify-between md:justify-around items-center p-5 z-50">
    <a href="/" class="font-bold text-xl">tools.zabinski.dev</a>

    <section class="md:flex hidden">
        <a href="https://zabinski.dev" class="px-4 py-2 hover:bg-base-200 rounded-xl">Portifolio</a>
        <a href="mailto:developer@zabinski.dev" class="px-4 py-2 font-bold hover:bg-base-200 rounded-xl">Contact</a>
    </section>

    <!-- DROPDOWN TOGGLE -->
    <button
        aria-label="Menu"
        on:click={toggleMenu}
        class:text-base-800={isShowingMenu}
        class:text-gray-800={!isShowingMenu}
        class="md:hidden flex justify-center items-center transition-colors duration-200"
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
    <div transition:fly={{ y: -100, duration: 200 }} class="fixed py-2 px-2 w-full">
        <div class="block md:hidden w-full py-2 px-2 space-y-2 font-medium bg-base-200 rounded-xl">
            <a href="https://zabinski.dev" class="rounded-lg block px-4 py-5 text-sm text-gray-800 hover:bg-base-300">Portfolio</a>
            
            <div class="h-[1px] bg-base-300 bg-opacity-80 rounded-full"/>

            <a href="mailto:developer@zabinski.dev" class="rounded-lg block px-4 py-5 text-sm text-gray-800 hover:bg-base-300">Contact</a>
        </div>
    </div>
{/if}

<main class="p-5 h-full">
    <section class="text-center bg-base-200 bg-opacity-40 border border-base-300 rounded-2xl py-8">
        <h1 class="text-3xl sm:text-5xl p-3 font-bold">All-in-One Tools</h1>
        <p class="text-md sm:text-xl pt-2">Your productivity, simplified.</p>
    </section>
    
    <section class="w-full mx-auto grid gap-5 place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-5 h-full">
        {#each data.tools as tool (tool.path)}
            <a
            href={`/${tool.path}`}
            class="h-36 p-3 space-y-2 flex flex-col justify-center items-center text-left w-full bg-base-200 bg-opacity-[50%] hover:bg-opacity-80 border border-base-300 rounded-2xl"
            >
                <h2 class="font-medium w-full">
                    {tool.name}
                </h2>

                <p class="text-slate-900 w-full text-sm">{tool.description}</p>
            </a>
        {/each}
    </section>
</main>