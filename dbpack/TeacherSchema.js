module.exports = function(mongoose){
    var TeacherSchema = mongoose.Schema({
        name: {type: String, unique:true, required: true},
        email: {type:String, unique: true, required: true},
        department: {type: String, required:true},
        contact: {type:String, unique:true},

        survey_records: [],
        total_averages: [],
        current_average: {type:Number},
        max_average: {type:Number},

        ph_originalname: {type: String},
        ph_mimetype: {type: String},
        ph_curname: String, 
        ph_size: Number    
});
    return mongoose.model('TeacherSchema-New',TeacherSchema);
};
