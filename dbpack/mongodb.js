var bcrypt = require('bcryptjs');

module.exports = function(Schema, q){
    console.log('connection established...');
    return {
        login: function(dts){
            var promise = q.defer();
            Schema.findOne({email: dts.email}, function(err, result){

                console.log('login invoked');
                if(err) throw err;
                if(result){
                    console.log('working.....');
                    bcrypt.compare(dts.password, result.password, function(err, match){
                        if(err) throw err;
                            console.log('is matched: ', match);
                        match ? promise.resolve({email: result.email,
                            login: true, status:200})
                            : promise.reject({status: 401, err: 'Email or Password not valid.'});
                    })
                } else promise.reject({status:400, err: 'No such account exists'})
            });
            return promise.promise;
        },

        login_std: function(dts){
            var promise = q.defer();
            console.log('database details: ',dts)
            Schema.findOne({accountid: dts.accountid}, function(err, result){

                console.log('login invoked');
                if(err) throw err;
                if(result){
                    console.log('working.....');
                    bcrypt.compare(dts.password, result.password, function(err, match){
                        if(err) throw err;
                        console.log('is matched: ', match);
                        match ? promise.resolve(result)
                            : promise.reject({status: 401, msg: 'Email or Password not valid.'});
                    })
                } else promise.reject({status:400, msg: 'No such account exists'})
            });
            return promise.promise;
        },


        save: function(studentdts){
            var promise = q.defer();

            var hashedPassword = bcrypt.hashSync(studentdts.password, bcrypt.genSaltSync(8));

            student = Schema({
                accountid: studentdts.accountid,
                password: hashedPassword || studentdts.password
            });
            Schema.findOne({accountid: studentdts.accountid}, function(err, result){
                if(err) throw err;
                    if(result != null) {
                        console.log('Account already exist.');
                        promise.reject({
                            status: 500,
                            msg: 'Account already exists.'
                        });
                } else {
                    student.save(function(err){
                        if(err) throw err;
                        console.log('Account Made...');
                        promise.resolve({status: 200, msg: 'Account made successfully'});
                    });
                    }
            });
            return promise.promise;
        },

        saveTeacherData: function(teacherDetails){
            var promise = q.defer();
            var teacherDts  = Schema({
                name: teacherDetails.name,
                email: teacherDetails.email,
                department: teacherDetails.department,
                survey_records: teacherDetails.survey_records,
                total_averages: teacherDetails.total_averages,
                current_average: teacherDetails.current_average,
                max_average: teacherDetails.max_average,
                contact: teacherDetails.contact
            });



           // teacherDts.save(function(err){
           //    if(err){
           //        promise.reject({status: 500, errmsg: 'Error in saving data to database'});
           //        throw err;
           //    }
           //    console.log('Teacher Details Saved.');
           //    promise.resolve({status: 200});
           //});
           // return promise.promise;
            Schema.findOne({$or: [{email: teacherDts.email},{name: teacherDts.email}]}, function(err, result){
               if(err){
                   promise.reject(err);
               } else if(result!=null) promise.reject({status: 500, msg: 'Account Already Exists'});
                else {
                   teacherDts.save(function(err){
                       if(err){
                           console.log('Error on save.');
                           promise.reject({status: 500, msg: 'Error in saving data to database'});
                           throw err;
                       } else {
                           console.log('Teacher Details Saved.');
                           promise.resolve({status: 200, msg: 'Teacher Details Saved.'});
                       }
                   });
               }
            });
            return promise.promise;
        },

        getTeacherDetails: function(queryDetails){
            var promise = q.defer();
            Schema.findOne({name: queryDetails.name},function(err, result){
                if(err){
                    promise.reject({status:500, msg : 'Unable to update details', error: err});
                } else if(result == null){
                    promise.reject({status: 404, msg : 'Teacher With Such Details Does not Exist',
                        error: 'No Account "{name:'+queryDetails.name+'}" Exists.'});
                } else {
                    promise.resolve(result);
                }
            });
            return promise.promise;
        },
        updateDetails: function(dts){
            console.log('Update Details Invoked.');

            var promise = q.defer();

            console.log('request on database: ',dts);
           Schema.update({name: dts.name}, {
               $set:{
                   total_averages: dts.survey.total_averages,
                   survey_records: dts.survey.survey_records,
                   max_average: dts.survey.max_average,
                   current_average: dts.survey.current_average
               }
           }, function(err, result){

               err?
                   promise.reject({status: 400, msg: 'Update Failed.'})
                   :
                   promise.resolve({status: 200, msg: 'Quiz Submitted Successfully'});
           });

        return promise.promise;
        },

        registerhod: function(dts){
            var hashpwd = bcrypt.hashSync(dts.password, bcrypt.genSaltSync(11));

            var promise = q.defer();

            var HOD = Schema({
                username: dts.username,
                email: dts.email,
                cellphone: dts.cellphone,
                password: hashpwd
            });

            HOD.save(function(err){
                if(err) {
                    promise.reject({status:406, msg:'Error at registering HOD'});
                    throw err;
                }
                else {
                    console.log('HOD details Saved.');
                    promise.resolve({status: 200, msg: 'HoD Successfully Registered'});
                }

            });
        return promise.promise;
        }



    }
};