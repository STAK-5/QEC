console.log('[HOD_Schema] Invoked');
module.exports = function(mongoose){
    var TecSchema = mongoose.Schema({
        username: {type: String, required: true},
        email: {type:String, unique: true, required: true},
        cellphone: {type: String, unique:true},
        password: {type:String, required:true}
    });
    return mongoose.model('HoDSchema',TecSchema);
};
