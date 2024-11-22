const mongoose = require('mongoose');

//define a schema/ blueprint NOTE: id is not a part of the schema 
const studentSchema = new mongoose.Schema({
    movie_Name:  { type: String, required: true},
    genres:  { type: String, required: true},
    Year:  { type: String, required: true},
    author:  { type: String, required: true},
    Ratings:  { type: String, required: true}
});

//use the blueprint to create the model 
//Parameters: (model_name, schema_to_use, collection_name)
//module.exports is used to allow external access to the model  
module.exports = mongoose.model('Student', studentSchema,'Students');
//note capital S in the collection name