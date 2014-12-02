var freebase= require("freebase")
var fns= require("./fns")



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


var freebase_key = ""
var write_token = ""


var obj = {
    cat: "Category:Bridges_in_Canada",
    key: freebase_key,
    access_token: write_token,
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
    cat: "Category:Theatrical genres",
    key: freebase_key,
    access_token: write_token,
    depth: 1,
    filter: {
        not_types: ["/theater/play"]
    },
    // write: {
    //     type: "/theater/theater_genre"
    // }
}

category_garden(obj, function(r) {
    console.log(JSON.stringify(r, null, 2));
})



module.exports= {
  category_garden:category_garden
}