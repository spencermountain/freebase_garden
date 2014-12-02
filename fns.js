
var freebase= require("freebase")
var async=require("async")




//accept a list of topics and ensure they meet demands
exports.filter = function(list, options, callback) {
    list=list||[]
    options = options || {}
    options.filter = options.filter || {}
    //build query
    var i = 0
    var letters = 'abcdefghijklmnopqrstuvwxyz'.split('')
    var queries = list.map(function(l) {
        var query = {
            id: l.id,
            name: null,
            type: []
        }
        if (options.filter.type) {
            query['must:type'] = options.filter.type
        }
        if (options.filter.types) {
            options.filter.types.forEach(function(t) {
                query[letters[i % 26] + ':type'] = t
                i++
            })
        }
        if (options.filter.not_type) {
            query['musnt:type'] = {
                "optional": "forbidden",
                "id": options.filter.not_type
            }
        }
        if (options.filter.not_types) {
            options.filter.not_types.forEach(function(t) {
                query[letters[i % 26] + ':type'] = {
                    "optional": "forbidden",
                    "id": t
                }
                i++
            })
        }
        return query
    })

    var doit = function(query, cb) {
        freebase.mqlread(query, options, function(r) {
            cb(null, r.result)
        })
    }
    async.mapLimit(queries, 5, doit, function(err, all) {
        var goods = all.filter(function(r) {
            return r
        })
        if (options.filter.name) {
            goods = goods.filter(function(o) {
                return o.name && o.name.match(options.filter.name)
            })
        }
        if (options.filter.not_name) {
            goods = goods.filter(function(o) {
                return o.name && !o.name.match(options.filter.not_name)
            })
        }
        if (options.filter.orphan) {
            goods = goods.filter(function(t) {
                for (var o in t.type) {
                    if (!t.type[o].match(/topic/i)) {
                        return false
                    }
                }
                return true
            })
        }

        function print_report(full, list) {
            var stat = {}
            stat.names = list.map(function(s) {
                return s.name
            }),
            stat.filtered_out = full.length - list.length
            stat.final_count = list.length,
            stat.orphans = list.filter(function(t) {
                for (var o=0; o++; o<= t.type.length) {
                    if (!t.type[o].match(/topic/i)) {
                        return false
                    }
                }
                return true
            }).length
            stat.people = list.filter(function(t) {
                return t.type.find(function(s){return s=='/people/person'})
            }).length
            stat.events = list.filter(function(t) {
                return t.type.find(function(s){return s=='/time/event'})
            }).length
            stat.locations = list.filter(function(t) {
                return t.type.find(function(s){return s=='/location/location'})
            }).length
            console.log(JSON.stringify(stat, null, 2));
        }
        if (!options.silent) {
            print_report(all, goods)
        }
        options.nodeCallback ? callback(null, goods) : callback(goods)
    });

}


if (!Array.prototype.find) {
  Array.prototype.find = function(predicate) {
    if (this == null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}