module.exports = function (app, express, mongoose) {
    var router = express.Router();
    var hodSchema = require('./../dbpack/HODSchema.js')(mongoose);
    var TeacherSchema = require('./../dbpack/TeacherSchema.js')(mongoose);
    var localaccounts = require('./../dbpack/localaccounts.js')(mongoose);
    var q = require('q');
    var mongodb;
    var attempts = 0, hod_attempts = 0;
    var requestIp = require('request-ip');
    var sess;
    var title = 'HOD Login';
    var server_msg = '';
    var multer = require('multer');
    var upload = multer({ dest: 'public/imgs/uploaded/' })


    router.post('/api/teacher_reg', upload.single('avatar'), function (req, res, next) {
        console.log('file upload attempts _active');
        console.log('form content: ', req.body);
        console.log('form files: ', req.file);
        
        /*VALIDATION ON PENDING - DIRECT SENDING TO SERVER AT THE MOMENT :)*/
        req.checkBody('name', 'Account id is required').notEmpty();
        req.checkBody('email', 'Email Not Valid').isEmail();
        req.checkBody('contact', 'Contact should not be empty').notEmpty();
        req.checkBody('department', 'Department not valid').notEmpty().len(2,3);
        
        
        var formValidationErrors = req.validationErrors();
        if(formValidationErrors)
            res.status(500).send('<h2>'+formValidationErrors[0].msg+'</h2>');
        else if(req.file==undefined || req.file ==null || req.file == {}){
            console.log('Please Provide A Photo To Teacher\'s Profile ');
        }
        else {
            mongodb = require('./../dbpack/mongodb.js')(TeacherSchema, q);

            var teacherDetails = {
                name: req.body.name,
                email: req.body.email,
                contact: req.body.contact,
                department: req.body.department,
                ph_originalname: req.file.originalname,
                ph_mimetype: req.file.mimetype,
                ph_curname: req.file.filename,
                ph_size: req.file.size
            }
            
            console.log('Simplified Teacher Object:  ', teacherDetails);
            mongodb.saveTeacherData(teacherDetails)
            .then(function (result) {
                console.log('Teacher Saved', result);
                res.status(result.status).send('<h2>'+result.msg+'</h2>');
                }, function (error) {
                res.status(error.status).send('<h2>'+error.msg+'</h2>');
            });
    }
            
    });
    router.get('/', function (req, res, next) {
        console.log('[SESSIONS] value: ', req.session.login);
        if (req.session.login !== undefined)
            res.render('hodDashboard');
        else
            res.render('login_hod', { title: title });
    });

    app.get('/std', function (req, res) {
        console.log('Student [SESSION_LOOKUP]: ', req.session.std_sess);
        req.session.std_sess != undefined ? res.render('studentDashboard') : res.render('studentLogin');

    })
    app.get(function (req, res) {
        res.send('Not found');
    });

    router.get('/api/getteachers', function(req, res, next){
        mongodb = require('./../dbpack/mongodb.js')(TeacherSchema, q);
        
        mongodb.getallteacher()
            .then(function(result){
                // on result
                res.status(200).send(result);
                
            }, function(err){
                res.status(500).send(err);
            })
            
    })
    router.post('/api/hodlogin', function (req, res, next) {
        console.log('sessions : ', req.session.login);
        mongodb = require('./../dbpack/mongodb.js')(hodSchema, q);
        console.log('login request made with : ', req.body.email + ', ' + req.body.password);

        var clientIp = requestIp.getClientIp(req);
        console.log('client ip: ', clientIp);
        mongodb.login({
            email: req.body.email,
            password: req.body.password
        }).then(function (respond) {
            console.log(respond);
            req.session.login = respond.email;
            res.status(200).send(respond);

        }, function (err) {
            console.log(err);
            hod_attempts++;
            console.log('HOD_LOGIN_ATTEMPTS: ', hod_attempts);
            res.status(err.status).send({ status: err.status, att: hod_attempts, msg: err.err });
            if (hod_attempts > 5) {
                console.log('TIMEOUT, SET_ATTEMPT = 0');
                setTimeout(function () {
                    console.log('flushing attempts back to null');
                    attempts = 0;
                }, 1000 * 60 * 2)
            }
        });
    });
    router.post('/api/login', function (req, res, next) {
        mongodb = require('./../dbpack/mongodb.js')(localaccounts, q);
        console.log('request body: ', req.body);
        mongodb.login_std(req.body)
            .then(function (std) {
                req.session.std_sess = std.accountid;
                console.log('got back: ', std);
                res.status(200).send(std);
            }, function (err) {
                res.status(err.status).send(err);
            });
    });


    if (attempts > 5) {
        console.log('TIMEOUT, SET_ATTEMPT = 0');
        setTimeout(function () {
            attempts = 0;
        }, 1000 * 60 * 2)
    }

    // Handling APIs. post request registration
    router.post('/api/registration', function (req, res, next) {
        //console.log(StdSchema.generateHash);
        var student = {
            accountid: req.body.accountid,
            password: req.body.password,
            conf_password: req.body.conf_password
        };
        //Server side verification -- //
        req.checkBody('accountid', 'account id is required').notEmpty();
        req.checkBody('password', 'password is required').notEmpty();
        req.checkBody('password', 'password does not match').equals(req.body.conf_password);

        var formValidationErrors = req.validationErrors();

        if (formValidationErrors) {
            res.status(405).send({})
        } else {
            console.log('no errors');
            mongodb = require('./../dbpack/mongodb.js')(localaccounts, q);
            mongodb.save(student).then(function (success) {
                console.log('server - promise success', success);
                res.status(200).send(success);
            }, function (err) {
                console.log('failure message: ', err);
                res.status(500).send(err.msg);
            });
        }
    });

    // router.post('/api/teacher_registration', function (req, res) {

    //     ///*VALIDATION ON PENDING - DIRECT SENDING TO SERVER AT THE MOMENT :)*/
    //     //req.checkBody('name', 'Account id is required').notEmpty();
    //     //req.checkBody('email', 'Email Not Valid').isEmail();
    //     //req.checkBody('cellphone', 'Contact should not be empty').notEmpty();
    //     //req.checkBody('department', 'Password is required').notEmpty();
    //     //
    //     //
    //     //var formValidationErrors = req.validationErrors();
    //     //if (formValidationErrors) res.status(502).send({msg: 'Field Provided Not Valid'});
    //     //else {
    //     mongodb = require('./../dbpack/mongodb.js')(TeacherSchema, q);

    //     console.log('request body ', req.body);
    //     mongodb.saveTeacherData(req.body)
    //         .then(function (result) {
    //             console.log('Teacher Saved', result);
    //             res.status(result.status).send(result.msg);
    //         }, function (error) {
    //             res.status(error.status).send(error.msg);
    //         });
    //     //}

    // });

    router.post('/api/submit_quiz', function (req, res) {

        console.log(req.body.name, req.body.survey);
        mongodb = require('./../dbpack/mongodb.js')(TeacherSchema, q);
        mongodb.getTeacherDetails({ name: req.body.name })
            .then(function (result) {

                var value = 0;
                var matchFound = false;
                var newArray = [];
                var survey_copy = result;

                /* ALGORITHM FOR UPDATING DATA (IF EXISTS) AND INSERTING INTO DATABASE. */
                for (var i = 0; i < survey_copy.survey_records.length; i++) {

                    if (req.body.survey.date == survey_copy.survey_records[i].date) {
                        matchFound = true; /*SIMILAR DATES ARE FOUND*/

                        if (survey_copy.survey_records[i].data.length > 0) {
                            for (j = 0; j < survey_copy.survey_records[i].data.length; j++) {
                                value = Number(req.body.survey.data[j]) + Number(survey_copy.survey_records[i].data[j]);
                                value = value / 2;
                                value = value.toFixed(1);
                                newArray[j] = value;
                                console.log('value added in newArray', newArray[j]);
                            }
                            survey_copy.survey_records[i].data = newArray;
                            console.log('new array : ', newArray)
                        } else {
                            survey_copy.survey_records[i].data = req.body.survey.data;
                            console.log('stored: ', survey_copy.survey_records[i].data);
                        }

                    }
                }

                if (!matchFound) {
                    survey_copy.survey_records.push(req.body.survey)
                }
                /* END FOR -X- [ALGORITHM FOR UPDATING DATA (IF EXISTS) AND INSERTING INTO DATABASE.] */



                /*      FINDING TOTAL AVERAGES      */
                var totAvgs = [], total = 0, leng = 0;
                for (i = 0; i < survey_copy.survey_records.length; i++) {
                    for (j = 0; j < survey_copy.survey_records[i].data.length; j++) {
                        total += Number(survey_copy.survey_records[i].data[j]);
                        leng = survey_copy.survey_records[i].data.length;
                    }
                    totAvgs[i] = (total / leng);
                    totAvgs[i] = Number(totAvgs[i].toFixed(1));
                    total = 0; leng = 0;
                }
                survey_copy.total_averages = totAvgs;
                console.log(survey_copy.total_averages);

                /* FINDING CURRENT AVERAGES: */
                var avg = 0; total = 0;
                for (i = 0; i < totAvgs.length; i++) {
                    total += totAvgs[i];
                }
                avg = total / totAvgs.length;
                avg = avg.toFixed(1);
                survey_copy.current_average = avg;
                console.log('current avg : ', survey_copy.current_average);

                /*      FINDING MAX AVERAGE     */
                var max = 0;
                for (i = 0; i < totAvgs.length; i++) {
                    console.log('totAvgs[' + i + ']', totAvgs[i]);
                    if (totAvgs[i] > max) max = totAvgs[i];
                }
                survey_copy.max_average = max;


                mongodb.updateDetails({
                    name: survey_copy.name,
                    survey: survey_copy
                })
                    .then(function (result) {
                        console.log('updated: ', result);
                        res.status(result.status).send({ msg: result.msg });
                    }, function (err) {
                        console.log('err at updating: ', err.msg);
                        res.status(res.status).send({ msg: err.msg });
                    })

            }, function (err) {
                if (err.status == 404)
                    res.status(404).send({ msg: err.msg });
                else if (err.status == 500)
                    res.status(500).send({ msg: err.msg });
            });
    });


    router.post('/api/registerhod', function (req, res) {

        /*EXPRESS VALIDATION ON PENDING... */
        req.checkBody('username', 'account id is required').notEmpty();
        req.checkBody('email', 'account id is required').isEmail();
        req.checkBody('password', 'password is required').notEmpty();
        req.checkBody('cellphone', 'password does not match').notEmpty();

        var formValidationErrors = req.validationErrors();
        if (formValidationErrors) res.status(502).send({ errmsg: 'Field Provided Not Valid' });
        else {
            mongodb = require('./../dbpack/mongodb.js')(hodSchema, q);
            mongodb.registerhod(req.body)
                .then(function (success) {
                    res.status(200).send(success.msg);
                }, function (error) {
                    res.status(406).send({ errmsg: error.msg });
                    console.log('Error at registering HOD');
                })
        }
    });
    //[ {s}, {s}, {s} , {s}, {s}, {s}]

    router.post('/api/getdetails', function (req, res) {
        mongodb = require('./../dbpack/mongodb.js')(TeacherSchema, q);

        mongodb.getTeacherDetails(req.body)
            .then(function (result) {
                var recentsurveys = [];
                var avgs = [];
                if (result.survey_records.length > 5) {
                    console.log(' survey lengths are greater than 5');
                    for (i = result.survey_records.length - 5; i < result.survey_records.length; i++) {
                        recentsurveys.push(result.survey_records[i]);
                        avgs.push(result.total_averages[i]);
                    }
                    result.survey_records = recentsurveys;
                    result.total_averages = avgs;
                }

                res.status(200).send(result);
                console.log('[GET] teacher_details STATUS: ', 200);
            }, function (err) {
                res.status(err.status).send(err);
            });

    });



    router.get('/logout', function (req, res) {
        req.session.destroy(function (err) {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/');
            }
        });

    });
    app.listen(3000, function () {
        console.log("App Started on PORT 3000");
    });
    app.use('/', router);
};