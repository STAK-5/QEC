module.exports = function(mongoose){
    var stpSchema = mongoose.Schema({
        department: {type: String, required: true},
        subject: {type: String, required: true},
        year: {type: Number, required: true},
        semester: {type: Number, required: true},
        url: {type:String, unique: true, required: true},
        impnotes: {type:String, required: true},
        title: {type:String, required: true}
    });
    return mongoose.model('file-uploads',stpSchema);
};

