interface Person {
    name: string;
    age: number;
    roles: string[];
}

function createNewPerson(user: Person) {
    console.log(user);
}

const obj = {
    name: "Aaron",
    age: 26,
    roles: ["admin"],
};

console.log(createNewPerson(obj));
