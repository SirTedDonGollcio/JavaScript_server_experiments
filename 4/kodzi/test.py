var MongoClient=require('mongodb') .MongoClient
varurl="mongodb://localhost:27017"
MongoClient.connect(url,function(err,db)
{
    if(err):
        throw err; 
    varopaDB=db.db("opa");
    opaDB.collection("netflix").find( { } ) .toArray(
            function(err,result) {
                    db.close( );
                    if(err):
                        throw err;
                        console.log(result);
            ;});
});