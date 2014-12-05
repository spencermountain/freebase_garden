var freebase= require("/Users/spencer/mountain/freebase")
var fns= require("./fns")
var async=require("async")
var CREDENTIALS=require("./auth/credentials")
var MUTEX= require("./mutex")
require("dirtyjs")
var LANG= "en"

//filter pages in a wikipedia category
exports.from_category = function(obj, callback) {
  freebase.from_category(obj.cat, obj, function(all) {
      fns.filter(all, obj, function(list) {
          if (!obj.write) {
              return callback(list)
          }
          obj.access_token= obj.access_token || CREDENTIALS.WRITE_TOKEN
          freebase.write_async(list, obj, function(result) {
              callback(result)
          })
      })
  })
}




//find pages in a category that have no type, or dont meet criteria
exports.need_work= function(obj, callback){
  var options={
    key:CREDENTIALS.API_KEY,
    depth:1
  }
  freebase.from_category(obj.cat, options, function(r){
    var arr= r.map(function(o){
      var q= {
        id:o.id,
        mid:null,
        name:null,
        "a:type":[]
      }
      if(obj.type){
        q.type= [{
          "id": obj.type,
          "optional": "forbidden"
        }]
      }
      return [q]
    })

    var check_true=function(q, cb){
      freebase.mqlread(q, options, function(r, err){
        //if query died, just null-out
        if(!r.result || !r.result[0]){
          return cb(err, null)
        }
        //does it pass our requirements?
        if(r.result[0] ){ // && r.result[0].type.length<=1
          return cb(err, r.result[0])
        }
        return cb(err, false)
      })
    }
    async.mapLimit(arr, 5, check_true, function(err, r){
        var need= r.filter(function(o){return o && o.name}).map(function(o){return o.name})
        return callback({
          cat:obj.cat,
          pages_satisfied: r.length - need.length,
          pages_unsatisfied: need.length,
          need_work:need
        })
      });
  })
}
// exports.need_work({cat:"Category:Theatres_completed_in_1939",type:"/location/location"}, console.log)


//run 'need_work?' on each subcategory
exports.inspect_categories= function(obj, callback){
  var options={
    key:CREDENTIALS.API_KEY
  }
  freebase.wikipedia_subcategories(obj.cat, options, function(cats){
    var doit=function(c,cb){
      exports.need_work({cat:c, type:obj.type}, function(r){
        return cb(null, r)
      })
    }
    async.mapLimit(cats, 5, doit, function(err, r){
      return callback(r)
    });
  })
}

//take a list of wp titles and remove a type from them
exports.remove_type=function(list, type, callback){
  var options={
    key:CREDENTIALS.API_KEY,
    access_token: CREDENTIALS.WRITE_TOKEN,
    type:type
  }
  list= list.map(function(p){
    return "/wikipedia/" + LANG + "/" +freebase.mql_encode(p)
  })
  freebase.remove_type(list, options, console.log)
}

//take a list of wp titles and add a type to them
exports.write_list=function(list, type, callback){
  var options={
    key:CREDENTIALS.API_KEY,
    access_token: CREDENTIALS.WRITE_TOKEN,
    type:type || '/common/topic'
  }
  //turn article titles into freebase ids
  list= list.map(function(p){
    return "/wikipedia/" + LANG + "/" +freebase.mql_encode(p)
  })
  return freebase.add_type(list, options, callback)
}



//things that are both typeA and typeB
exports.incompatible_types=function(a, b, obj, callback){
  var options={
    key:CREDENTIALS.API_KEY
  }
  var query=[{
    "a:type":a,
    "b:type":b,
    id:null,
    name:null,
    key:[{
      namespace:"/wikipedia/en_title",
      value:null
    }]
  }]
  freebase.paginate(query, options, function(arr){
    wp_pages=arr.map(function(a){return a.key[0].value})
    console.log(wp_pages)
    if(obj.remove){
      exports.remove_type(wp_pages, obj.remove, callback)
    }else{
      callback(wp_pages)
    }
  })
}
// exports.incompatible_types("/transportation/bridge","/geography/body_of_water",{removex:"/transportation/bridge"}, console.log)


//find topics with incompatible types
exports.issues=function(type, kind, callback){
  var options={
    key:CREDENTIALS.API_KEY
  }
  var i=0
  var arr=MUTEX["not_"+kind]
  arr.forEach(function(t){
    exports.incompatible_types(type, t, {}, function(s){
      i+=1
      if(i>=arr.length){
        return callback()
      }
    })
  })
}
// exports.issues("/transportation/bridge", 'event', console.log)
// exports.issues("/sports/sports_facility", 'location', console.log)
// exports.issues("/sports/sports_facility", 'event', console.log)

// freebase.from_category("Category:Leper hospital administrators",{}, function(r){console.log(r.map(function(s){return s.name}))})

// exports.inspect_categories({cat:"Category:Bridge_(structure)_stubs", type:"/transportation/bridge"}, function(list){
//   console.log(JSON.stringify(list, null, 2));
// })
