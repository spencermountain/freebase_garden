var garden= require("./index")
var CREDENTIALS=require("./auth/credentials")


var rule = {
    cat: "Category:Professional_wrestling_genres",
    key: CREDENTIALS.API_KEY,
    access_token: CREDENTIALS.WRITE_TOKEN,
    depth: 1,
    filter: {
        not_types: ["/people/person"]
    },
    write: {
        type: "/sport/sport"
    }
}


garden.from_category(rule, function(r) {
    console.log(JSON.stringify(r, null, 2));
})
