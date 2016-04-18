/* TODO LIST*/

/*PENDING */
console.log('Teacher Details Matched.');
var totalAverage = 0, maxAverage = 0, currentAverage= 0, total = 0;
var dbdata = result;
console.log('\n Old DBDATA is : ', dbdata);
/*Push new array into existing records of queries*/

/*push an average result into avgArrays*/
for(i=0; i<req.body.survey.data.length; i++){
    total+=req.body.data[i];
}

if(currentAverage>=1.4 && currentAverage<=1.6) currentAverage = 1.5;
else if(currentAverage>=2.4 && currentAverage<=2.6) currentAverage = 2.5;
else if(currentAverage >=3.4 && currentAverage<=3.6) currentAverage = 3.5;
else if(currentAverage>=4.4 && currentAverage<=4.6) currentAverage = 4.5;
else currentAverage = Math.round(currentAverage);

//console.log('Current Average: ', currentAverage);
dbdata.totalrankingavg.push(currentAverage);
//console.log('AVGS After: ', dbdata.totalrankingavg);

/*Finding out the Highest Ranking..*/
//for(i=0; i<dbdata.totalrankingavg.length; i++){
//    if(dbdata.totalrankingavg[i] > maxAverage)
//        maxAverage = dbdata.totalrankingavg[i];
//}


/*Current Ranking = Average of the ranking.*/
//total = 0;
//for(i=0; i<dbdata.totalrankingavg.length; i++){
//    total += dbdata.totalrankingavg[i];
//}
//totalAverage = total/dbdata.totalrankingavg.length;


//console.log('Total Average: ', totalAverage.toFixed(2));
dbdata.currentranking = totalAverage;
dbdata.highestranking = maxAverage;


console.log('\n New DBDATA is : ', dbdata);



if (result.survey_records.length > 0) {


    console.log('if statement invoked.');
    var newArray = [];
    var value = 0, matchFound = false;

    /*FINDING MATCH FOR DATES ....*/
    for (i = 0; i < result.survey_records.length; i++) {
        console.log('req.body.survey.date ', req.body.survey.date);
        console.log('result.survey_records[i].data ', result.survey_records[i].data);
        if (req.body.survey.date === result.survey_records[i].date) {
            if(result.survey_records[i].data.length === 0){
                console.log('is null');
                result.survey_records[i].data = req.body.survey.data;
                break;
            }
            console.log('Dates Matched');
            for (j = 0; j < result.survey_records[i].data.length; j++) {
                console.log('req.body.surey.data[j] = ', req.body.survey.data[j]);
                console.log('result.survey_records[i].data[j]= ', result.survey_records[i].data[j]);

                value = (result.survey_records[i].data[j]+req.body.survey.data[j]);

                console.log('what the value at index ['+j+']', value);
                //result.survey_records[i].data[j] = 0;
                value = 0

            }
            console.log('new stored survey : ', newArray);
            matchFound = true;
            result.survey_records[i].data = newArray;
        }
    }
    if (!matchFound) {
        console.log('No Match Found');
        result.survey_records.push(req.body.survey);
    }
    //Insert(result);
} else {
    result.survey_records.push(req.body.survey);
}


function somehting(){

}
console.log('update invoked');
mongodb.updateDetails(result)
    .then(function (result) {
        console.log('update success');
        res.status(200).send({msg: result.msg});
    }, function (err) {
        console.log(err);
        res.status(304).send({msg: err.msg});
    });
//
//function insertNewSession(result){
//    console.log('insert method invoked');
//    mongodb.insertNewSession(result)
//        .then(function(result){
//            console.log('200/OK: data inserted into database', result);
//        }, function(err){
//            console.log(err);
//        });
//}
