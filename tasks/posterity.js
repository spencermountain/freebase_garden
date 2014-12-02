//record things that have been done, for posterity

var obj = {
    cat: "Category:Theatrical genres",
    key: CREDENTIALS.API_KEY,
    access_token: CREDENTIALS.WRITE_TOKEN,
    depth: 1,
    filter: {
        not_types: ["/theater/play"]
    },
    write: {
        type: "/theater/theater_genre"
    }
}

var obj = {
    cat: "Category:Television_genres",
    key: CREDENTIALS.API_KEY,
    access_token: CREDENTIALS.WRITE_TOKEN,
    depth: 1,
    filter: {
        not_types: ["/tv/tv_program"]
    },
    write: {
        type: "/tv/tv_genre"
    }
}