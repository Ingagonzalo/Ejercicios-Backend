const randomIntFromInterval = () => {
    return Math.floor(Math.random() * 1001);
};

const getRandom = (quantity) => {
    const result = {};

    for (let i = 0; i < quantity; i++) {
        const randomNumber = randomIntFromInterval();

        result[randomNumber] = result[randomNumber] ? result[randomNumber] + 1 : 1;
    }

    return result;
};

process.on("message", (quantity) => {
    const response = getRandom(quantity);

    process.send(response);
});