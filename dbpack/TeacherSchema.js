module.exports = function(mongoose){
    var TeacherSchema = mongoose.Schema({
        name: {type: String, unique:true, required: true},
        email: {type:String, unique: true, required: true},
        department: {type: String, required:true},
        survey_records: [],
        total_averages: [],
        current_average: {type:Number},
        max_average: {type:Number},
        contact: {type:String, unique:true}
    });
    return mongoose.model('TeacherSchema-New',TeacherSchema);
};
