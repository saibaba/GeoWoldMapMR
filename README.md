Instructions
------------
1) Install mongodb as usual or get one at ObjectRocket 
2) Get GeoWolrdMap free cities data from : http://www.geobytes.com/GeoWorldMap.zip 
3) Unzip and you will see: cities.txt
4) Some data in cities.txt contains special chars but not in UTF-8 format, so convert to utf
    iconv -f ISO-8859-1 -t UTF-8 cities.txt > utf8_cities.txt
5) import into mongo:
   mongoimport -v --drop  -h host:port -u username -p password --db databasename --collection cities --type csv --file utf8_cities.txt --headerline
6) Run your map-reduce jobs. One example:
   time mongo host:port/dbname --username username --password password closest.js
7) Another example:
   mongo host:port/dbname --username username --password password count_cities.js

Notes
-----
MongoDb requires map and reduce functions to follow some specific conventions:
1) reduce must return an object whose type is the same as that of value emitted by map
2) the order of elements in the input to reduce function must not matter
3) reduce will not be called at all if there is only one instance of value for a key (map ever emitted only one time for given key)
4) reduce must be idempotent - reduce could be called multiple times for the same key (of courese, values will be whatever returned in the previous invocation)
