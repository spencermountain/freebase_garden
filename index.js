var freebase= require("/Users/spencer/mountain/freebase")
var fns= require("./fns")
var CREDENTIALS=require("./auth/credentials")



//filter pages in a wikipedia category
var category_garden = function(obj, callback) {
  freebase.from_category(obj.cat, obj, function(all) {
      fns.filter(all, obj, function(list) {
          if (!obj.write) {
              return callback(list)
          }
          freebase.write_async(list, obj, function(result) {
              callback(result)
          })
      })
  })
}




var obj = {
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


module.exports= {
  category_garden:category_garden
}

category_garden(obj, function(r) {
    console.log(JSON.stringify(r, null, 2));
})
