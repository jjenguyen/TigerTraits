function getUser(talk){
    talk.question('Welcome to Tiger Traits! What is your name? ', (uname) => {
        console.log(`Nice to meet you, ${uname}!`);
        talk.close();
    });
}

const user = {
    name: "Default User",
    type: "unknown"
};



function main(){
    const readline = require('readline');

    const talk = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    var type = "";
    
    //get username to store
    getUser(talk);
}

main();

