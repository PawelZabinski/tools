<script>
    import { onMount } from "svelte";

    let time = 0;
    let count = 0;
    let currentTime = 0;

    $: progressWidth = time - currentTime < 0 ? 0 : (100 * (time - currentTime)) / time;

    let interval;
  
    // Function to handle keydown events
    function handleKeydown(event) {
        if (["Space", "Enter", "ArrowRight"].includes(event.code)) {
            count += 1;
            currentTime = 0;
        }
    }
  
    function changeTime() {
        time = 10;
    }
  
    function changeTimeInterval() {
        changeTime();

        clearInterval(interval);

        interval = setInterval(() => {
        currentTime += 1;
        }, 1_000);
    }
  
    // Attach the event listener to the window
    // to capture keydown events when the app is focused
    onMount(() => {
        window.addEventListener("keydown", handleKeydown);

        changeTimeInterval();

        return () => window.removeEventListener("keydown", handleKeydown);
    });
</script>
  
<main class="w-full min-h-screen flex flex-col justify-center items-center">
    <div class="font-mono text-9xl mb-20 text-base-900 dark:text-base-200">{count}</div>

    <div class="bg-base-200 border border-base-200 dark:border-dark-base-150 dark:bg-dark-base-200 w-72 text-center rounded-xl overflow-clip">
        <div class="relative h-8">
            <div
                class:bg-red-500={time - currentTime < 0}
                class:bg-base-200={time - currentTime >= 0}
                class:dark:bg-dark-base-100={time - currentTime >= 0}
                class="absolute border-b border-base-200 dark:border-dark-base-150 w-full h-full transition-all duration-500"
            />
            
            <div
                class={`absolute h-full transition-all duration-500 bg-base-500 dark:bg-dark-base-400`}
                style={`width: ${progressWidth}%;`}
            />
        </div>
        
    
        <p class="p-4 text-2xl font-mono">{time - currentTime}s left</p>
    </div>    
</main>

  