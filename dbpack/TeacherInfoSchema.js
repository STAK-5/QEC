module.exports = function(mongoose){
    var TeacherSchema = mongoose.Schema({
        name: {type: String},
        email: {type:String},
        department: {type: String, required:true},
        designation: {type:String, required:true},
        subjects: [String],
        project: [String],
        highestranking: {type:Number},
        totalrankingarrs: [Number],
        totalrankingavg: [Number],
        currentranking: {type:Number},
        contact: {type:String}
    });
    return mongoose.model('TeacherSchema',TeacherSchema);
};

