import { faker } from "@faker-js/faker";

const generateFaker = () => {
    const array = [];
    for (let i = 0; i <= 4; i++) {
        const product = {
            title: faker.vehicle.vehicle(),
            thumbnail: faker.image.transport(),
            price: faker.datatype.number()
        }
        array.push(product)
    }
    console.log(array);

    return array;
}

export default generateFaker;