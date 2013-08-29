/*
   1) reduce must return an object whose type is the same as that of value emitted by map
   2) the order of elements in the input to reduce function must not matter 
   3) reduce will not be called at all if there is only one instance of value for a key (map ever emitted only one time for given key)
   4) reduce must be idempotent - reduce could be called multiple times for the same key (of courese, values will be whatever returned in the previous invocation)
*/

var cname = "cities_per_country";

db.getCollection(cname).drop();

var mapfn = function() { 
    emit(this.CountryID, 
        { CountryID: this.CountryID,
          cities: 1
        }
    ); 
}

var redfn = function(key, values) {
    var c = {CountryID: key, cities: 0  };

    for (var i in values) {
        c.cities = c.cities + values[i].cities;
    }
    return c;
}

db.cities.mapReduce(mapfn, redfn, { out: cname })

/* { "_id" : 1, "value" : { "data" : [  3 ] } } */
/* { "_id" : 1, {countryID: 34, cities :  3  } } */

