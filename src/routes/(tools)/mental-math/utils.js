import { formulae } from "$lib/constants";

/** () -> (String (prompt), Number (answer)) */
function newBasicQuestion() {
    const operations = ['+', '-', '*', '/'];

    const operation = operations[Math.floor(Math.random() * operations.length)];
    let a, b;

    switch (operation) {
        case '+':
        a = Math.floor(Math.random() * 100);
        b = Math.floor(Math.random() * 100);
        return { "question": `${a} + ${b}`, "answer": a + b };

        case '-':
        a = Math.floor(Math.random() * 100);
        b = Math.floor(Math.random() * a);
        return { "question": `${a} - ${b}`, "answer": a - b };

        case '*':
        a = Math.floor(Math.random() * 20);
        b = Math.floor(Math.random() * 20);
        return { "question": `${a} × ${b}`, "answer": a * b };

        case '/':
        a = Math.floor(Math.random() * 20);
        b = Math.floor(Math.random() * 10) + 1;
        return { "question": `${a * b} ÷ ${b}`, "answer":  a};
    }
}

/** () -> (String (prompt), Number (answer)) */
function newAdvancedQuestion() {
    const operations = ['+', '-', '*', '/', '%'];

    const operation = operations[Math.floor(Math.random() * operations.length)];
    let a, b;

    switch (operation) {
        case '+':
        a = Math.floor(Math.random() * 1000);
        b = Math.floor(Math.random() * 1000);
        return { "question": `${a} + ${b}`, "answer": a + b };

        case '-':
        a = Math.floor(Math.random() * 1000);
        b = Math.floor(Math.random() * a);
        return { "question": `${a} - ${b}`, "answer": a - b };

        case '*':
        a = Math.floor(Math.random() * 50);
        b = Math.floor(Math.random() * 50);
        return { "question": `${a} × ${b}`, "answer": a * b };

        case '/':
        a = Math.floor(Math.random() * 50);
        b = Math.floor(Math.random() * 10) + 1;
        return { "question": `${a * b} ÷ ${b}`, "answer":  a};

        case '%':
        a = Math.floor(Math.random() * 40) * 5; // Multiples of 5
        b = Math.floor(Math.random() * 1000);

        return { "question": `${a}% of ${b}`, "answer": a * b / 100 };
    }
}

/** () -> (String (prompt), Number (answer)) */
function newFunQuestion() {
    const questionTypes = ["sequence", "formulae", "sqrt", "exponent"];

    const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    let a, b;

    switch (questionType) {
        case "sequence":
            a = Math.floor(Math.random() * 10) * (Math.random() > 0.5 ? -1 : 1)
            b = Math.floor(Math.random() * 50)
            const isConstantPositive = Math.random() > 0.5

            const terms = Array.from(Array(4).keys()).map(i => a*(i - 1) + b*(isConstantPositive ? 1 : -1))
            const randomTermIndex = Math.floor(Math.random() * terms.length);

            return { "question": terms.map((val, i) => i === randomTermIndex ? "X" : `${val}`).join(", "), "answer": terms[randomTermIndex]}
        
        case "formulae":
            return formulae[Math.floor(Math.random() * formulae.length)];
        
        case "sqrt":
            a = Math.floor(Math.random() * 19) + 1;

            return { "question": `√${a*a}`, answer: a };
        
        case "exponent":
            a = Math.floor(Math.random() * 5) + 1;
            b = Math.floor(Math.random() * 5);

            return { "question": `${a}^${b}`, "answer": Math.pow(a, b) }
    }
}

export { newBasicQuestion, newAdvancedQuestion, newFunQuestion };