/*select from mongo*/
Connection.connect()
	.then(db =>{
			doc = db.db('chat');
			doc.collection('testData').find({}).toArray((err,result) =>{
				res.send(result)
			});
	}).catch(err =>{
			console.log(err)
	});


// inserting to mongo
Connection.connect()
	.then(db =>{
			doc = db.db('chat');
			obj = {'source':'api',data: req.body.data}
			doc.collection('testData')
			.insertOne(obj,(err,res)=>{
				if(err) throw err;
				console.log('inserted to database')
			});
	}).catch(err => {
			console.log(err);
	});