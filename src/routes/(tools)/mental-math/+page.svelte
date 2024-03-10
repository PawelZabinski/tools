<script>
    import { newBasicQuestion, newAdvancedQuestion, newFunQuestion } from './utils.js';
    import ModeToggle from "$lib/components/ModeToggle.svelte"
    
    let mode = 'Basic';
    let { question, answer } = newBasicQuestion();

    $: mode, newQuestion();

    let isShowingAnswer = false;

    function toggleShowingAnswer() {
      isShowingAnswer = !isShowingAnswer;
    }

    function onKeyDown(e) {
        if (e.code == "ArrowRight" || (e.code == "Space" && isShowingAnswer)) {
            isShowingAnswer = false;
            newQuestion();

            return;
        }

        if (["Space", "Enter"].includes(e.code)) {
            toggleShowingAnswer();
            return;
        }
    }

    function newQuestion() {
        if (mode == "Basic") {
            ({ question, answer } = newBasicQuestion());
        } else if (mode == "Advanced") {
            ({ question, answer } = newAdvancedQuestion())
        } else if (mode == "Fun") {
            ({ question, answer } = newFunQuestion())
        }

        isShowingAnswer = false // flip question to front whenever mode changes
    }
</script>

<svelte:window on:keydown|preventDefault={onKeyDown} />
  
<main class="h-screen flex flex-col justify-between">
    <div class="flex justify-center w-full h-12 sm:mt-7 mt-28">
        <ModeToggle bind:mode modes={["Basic", "Advanced", "Fun"]} />
    </div>

    <div class="px-2">
        <button on:click={toggleShowingAnswer} class="w-full min-w-96 hover:bg-base-200 hover:dark:bg-dark-base-150 flex justify-center items-center py-5 rounded-2xl text-base-900 dark:text-base-200">
            {#if isShowingAnswer}
                <h1 class="text-6xl font-bold">{answer}</h1>
            {:else}
                <h1 class="text-6xl font-bold">{question}</h1>
            {/if}
        </button>

        <button on:click={newQuestion} class="w-full mt-8 py-4 md:opacity-50 hover:opacity-100 bg-base-200 dark:bg-dark-base-200 transition-opacity text-base-800 dark:text-base-400 md:dark:text-dark-base-250 hover:dark:text-base-400 rounded-2xl font-semibold">Next</button>
    </div>

    <div/>
</main>