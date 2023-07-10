const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://Anni:aniket123@cluster0.fsvangn.mongodb.net/gofoodmern?retryWrites=true&w=majority'
//const mongoURI = 'mongodb://Anni:aniket123@ac-6jktftt-shard-00-00.fsvangn.mongodb.net:27017,ac-6jktftt-shard-00-01.fsvangn.mongodb.net:27017,ac-6jktftt-shard-00-02.fsvangn.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-p88hnt-shard-0&authSource=admin&retryWrites=true&w=majority'
const mongoDB = async() => {
    await mongoose.connect(mongoURI, {useNewUrlParser: true }, async(err,result)=>{
        if(err) console.log("---", err)
        else{
            console.log("connected");
            const fetched_data = await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(async function(err, data){
                const food_category =  await mongoose.connection.db.collection("food_category");
                food_category.find({}).toArray(function(err, catData){
                    if(err)
                    console.log(err);

                    else{
                    global.food_items = data;
                    global.food_category = catData;
                    }
                })
                // if(err) console.log(err);
                // else 
                // {
                //     global.food_items = data;
                //     //console.log(global.food_items);
                // }
            })
        }
    });
}

module.exports = mongoDB;
