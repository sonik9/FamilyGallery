/**
 * Created by vital on 6/10/2015.
 */
var mongo = require('mongodb').MongoClient,
    format = require('util').format,
    assert= require('assert');

mongo.connect('mongodb://127.0.0.1:27017/FG', function(err,db,callback){
    assert.equal(err,null);

    var collection=db.collection('users');


    /*collection.insertMany([{a:2},{a:1}],function(err,count){
        console.log(format("count = %s",count));
    });
*/
    /*collection.deleteOne({a:1},function(err,result){
       assert.equal(err,null);

    });*/
   // collection.remove();

    collection.find({}).toArray(function(err,results){
        assert.equal(err,null);
        //assert.equal(2,results.length)
       console.dir(results);
        db.close();
        //callback(results);
    });
});