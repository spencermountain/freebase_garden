var freebase= require("/Users/spencer/mountain/freebase")
var fns= require("./fns")
var async=require("async")
var CREDENTIALS=require("./auth/credentials")
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
    key:CREDENTIALS.API_KEY
  }
  freebase.from_category(obj.cat, options, function(r){
    var arr= r.map(function(o){
      var q= {
        id:o.id,
        mid:null,
        name:null,
        type:[]
      }
      if(obj.type){
        q['a:type']= [{
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
// exports.inspect_categories({cat:"Category:Bridges_by_river", type:"/transportation/bridge"}, console.log)



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



list= [
       'Attock Bridge',
       'Ayub Bridge',
       'Kotri Bridge',
       'Raikot Bridge',
       'King Abdullah Bridge' ,
       'Kyaka Bridge',
       'Rusumo Bridge',
       'Rusumo International Bridge',
       'Butchers\' Bridge',
       'Fabiani Bridge',
       'Hradecky Bridge',
       'St. James\'s Bridge',
       'St. Peter\'s Bridge',
       'Prule Bridge',
       'Ljubljanica Sluice Gate',
       'Fourth Thai–Lao Friendship Bridge',
       'Rạch Miễu Bridge',
       'Third Thai–Lao Friendship Bridge',
       'Dongpingshuidao Bridge',
       'Hedong Bridge',
       'Hong Kong–Zhuhai–Macau Bridge',
 //       'Shenzhen-Zhongshan Bridge',
 //       'Xinguang Bridge',
 //       'Yajisha Bridge' ,
 //       'Hamm Railway Bridge',
 //       'Haus-Knipp railway bridge',
 //                      'Pont de Neuilly',
 //       'Pont de Sèvres',
 //       'Pont de Saint-Cloud',
 //       'Pont du Carrousel',
 //       'Pont au Change',
 //       'Port à l\'Anglais Bridge',
 //       'Pont Rouelle' ,
 //       'Lezíria Bridge',
 //       '14th of July Bridge',
 //       'Branický most',
 //       'Franz Joseph Bridge',
 //       'Palacký Bridge',
 //       'Troja Bridge',
 //       'Žďákov Bridge',

 // 'Anqing Bridge',
 //       'Anqing Railway Bridge',
 //       'Badong Bridge',
 //       'Baishatuo Railway Bridge',
 //       'Bosideng Bridge',
 //       'Caiyuanba Bridge',
 //       'Changshou Bridge',
 //       'Changshou Railway Bridge',
 //       'Dafosi Bridge',
 //       'Dashengguan Bridge',
 //       'Dingshan Bridge',
 //       'Diwei Bridge',
 //       'Edong Bridge',
 //       'Ehuang Bridge',
 //       'Erqi Bridge',
 //       'Fengjie Bridge',
 //       'Fourth Nanjing Yangtze Bridge',
 //       'Fuling Yangtze River Bridge',
 //       'Guanyinyan Bridge',
 //       'Hanjiatuo Bridge',
 //       'Hejiang Bridge',
 //       'Huangshi Bridge',
 //       'Jingyue Bridge',
 //       'Jingzhou Yangtze River Bridge',
 //       'Jiujiang Fuyin Expressway Bridge',
 //       'Lidu Bridge',
 //       'Lijiatuo Bridge',
 //       'Ma\'anshan Bridge',
 //       'Masangxi Bridge',
 //       'Nanxi Bridge',
 //       'Second Nanjing Yangtze Bridge',
 //       'Second Wanxian Bridge',
 //       'Shanghai Yangtze River Tunnel and Bridge',
 //       'Shibangou Bridge',
 //       'Taizhou Bridge',
 //       'Tongling Bridge',
 //       'Wanzhou Railway Bridge',
 //       'Wuhan Junshan Yangtze River Bridge',
 //       'Wushan Yangtze River Bridge',
 //       'Yichang Railway Bridge',
 //       'Yingwuzhou Bridge',
 //       'Yunyang Bridge',
 //       'Yuzui Yangtze River Bridge',
 //       'Zhicheng Bridge',
 //       'Zhongxian Huyu Expressway Bridge',
 //       'Zhongxian Yangtze River Bridge' ,
 //       'Armando Emilio Guebuza Bridge',
 //       'Benga Bridge',
 //       'Samora Machel Bridge'


       ]


// exports.write_list(list, "/transportation/bridge", console.log)