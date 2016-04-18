module.exports = function(mongoose){
    var qec_localaccounts = mongoose.Schema({
        accountid: {type: String,unique:true, required:true},
        password: {type:String, required:true}
    });
    return mongoose.model('qec-localaccounts',qec_localaccounts);
};

