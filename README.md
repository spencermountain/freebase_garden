

using [Freebase.js](https://github.com/spencermountain/Freebase.js), and [wtf_wikipedia](https://github.com/spencermountain/wtf_wikipedia) to get wikipedia category data, infobox data, and first-sentence data into freebase, with responsible QA filtering and caveats

also does easy 'if-this-than-that' inference tasks, like 'all opera genres are theatre genres'.

to use, put your [google credentials](https://console.developers.google.com) in ./credentials (instructions in that file) and run ````node auth/authenticate.js```` and follow those instructions for your oauth access token

then construct rules and filters like this:

````javascript
rules = {
    cat: "Category:Bridges_in_Canada",
    key: CREDENTIALS.API_KEY,
    access_token: CREDENTIALS.WRITE_TOKEN,
    depth: 2,
    filter: {
        not_types: ["/transportation/bridge", "/time/event"],
        not_name: /collapse/i,
    },
    write: {
        type: "/transportation/bridge"
    }
}
category_garden(rules, callback)
````