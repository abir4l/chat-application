const { Mongoose } = require('./database/mongoose')

const userSchema = new Mongoose.db.Schema({
	name: String
});

userSchema.methods.greet = function(reply){
	const greeting = `${this.name} says hi !!!!`;
	if(reply)
		console.log(greeting.replace('says',' also says'));
	else
		console.log(greeting)

}

const user = Mongoose.db.model('User',userSchema);
const linus = new user({name : 'linus'})
const abiral = new user({name:'Abiral'});

abiral.save((err,abiral) =>{
	if(err) return console.log(err);
	abiral.greet();
})

linus.greet(true);