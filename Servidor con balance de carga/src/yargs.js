import yargs from "yargs";

const args = yargs(process.argv.slice(2))
    .alias({
        p: "puerto",
    })
    .default({
        puerto: 8080,
    }).argv;

export default args;