Instructions
============

1. Install mongodb as usual or get one at ObjectRocket 
2. Get GeoWolrdMap free cities data from : http://www.geobytes.com/GeoWorldMap.zip 
3. Unzip and you will see: cities.txt
4. Some data in cities.txt contains special chars but not in UTF-8 format, so convert to utf
      <pre><code>
      iconv -f ISO-8859-1 -t UTF-8 cities.txt > utf8_cities.txt
      </code></pre>
5. import into mongo:
      <pre><code>
      mongoimport -v --drop  -h host:port -u username -p password --db databasename --collection cities --type csv --file utf8_cities.txt --headerline
    </code></pre>
6. Run your map-reduce jobs. One example:
      <pre><code>
      time mongo host:port/dbname --username username --password password closest.js
      </code></pre>
7. Another example:
      <pre><code>
      mongo host:port/dbname --username username --password password count_cities.js
      </code></pre>

Notes
=====

MongoDb requires map and reduce functions to follow some specific conventions:

1. reduce must return an object whose type is the same as that of value emitted by map
2. the order of elements in the input to reduce function must not matter
3. reduce will not be called at all if there is only one instance of value for a key (map ever emitted only one time for given key)
4. reduce must be idempotent - reduce could be called multiple times for the same key (of courese, values will be whatever returned in the previous invocation)


Reference
=========
1. MongoDB docs
2. <a href="http://www.mongovue.com/2010/11/03/yet-another-mongodb-map-reduce-tutorial/" target="_blank">http://www.mongovue.com/2010/11/03/yet-another-mongodb-map-reduce-tutorial/</a>
3. <a href="https://groups.google.com/d/msg/mongodb-user/b7oTglb8GnI/bCR6mQY2dVYJ" target="_blank">utf8 conversion</a>
