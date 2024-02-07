import { writable } from 'svelte/store';
import { toolsLength } from "$lib/constants"

function getInitialState() {
    if (typeof window === 'undefined') {
        return []
    }

    const stored = localStorage.getItem('tool-order');

    if (stored) {
        return JSON.parse(stored);
    }

    let defaultOrder = [...Array(toolsLength).keys()].map(i => i + 1);

    localStorage.setItem("tool-order", JSON.stringify(defaultOrder))
    return defaultOrder;
}

function createToolOrderStore() {
    const { subscribe, set, update } = writable(getInitialState());

    const save = (toolOrder) => {
        localStorage.setItem("tool-order", JSON.stringify(toolOrder));
    }

    return {
        subscribe,
        setOrder: (newOrder) => {
            set(newOrder);
            save(newOrder);
        },
        swap: (a, b) => update(oldOrder => {
            let copyOrder = [...oldOrder];
            [copyOrder[a], copyOrder[b]] = [copyOrder[b], copyOrder[a]];

            save(copyOrder);

            return copyOrder;
        })
    }
}

export const toolOrder = createToolOrderStore();