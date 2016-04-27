/**
 * Created by syedmuhammadtaha on 4/1/16.
 */

qecApp.service('teacherParser', function(){

    this.value = '';

});

qecApp.service('starsParser', function(){

    this.newStars = 1;
    this.oldStars = null;
});

qecApp.service('questionParser', function () {

    this.page = 1;
});

qecApp.service('graphDetails', function () {

    this.graph;
});

