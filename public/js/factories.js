/**
 * Created by syedmuhammadtaha on 3/30/16.
 */



qecApp.factory('QueueService', function ($rootScope) {
    var queue = new createjs.LoadQueue(true);

    function loadManifest(manifest) {
        queue.loadManifest(manifest);

        queue.on('progress', function (event) {
            $rootScope.$broadcast('queueProgress', event);
        });

        queue.on('complete', function () {
            $rootScope.$broadcast('queueComplete', manifest);
        });
    }

    return {
        loadManifest: loadManifest
    }
});

qecApp.factory('teacherMaker', function() {

    var teachers = {
        firstRow: {
            teacher1: {
                name: 'Fahad Iqbal',
                age: 00,
                gender: 'Male',
                subjects: [
                    'OS', 'CPP I'
                ],
                projects: [
                    'ABC', 'XYZ'
                ],
                Ratings: 0,
                image: 'imgs/Slider/slider/slider1.jpg',
            },
            teacher2: {
                name: 'Maria Bashir',
                age: 00,
                gender: 'Female',
                subjects: [
                    'EEM', 'OOP', 'DBMS', 'SE'
                ],
                projects: [
                    'First Project', 'Second Project'
                ],
                Ratings: 0,
                image: 'imgs/Slider/slider/slider2.png'
            },
            teacher3: {
                name: 'teacher3',
                age: 00,
                gender: 'unknown',
                subjects: [
                    'First subject', 'Second Subject'
                ],
                projects: [
                    'First Project', 'Second Project'
                ],
                Ratings: 0,
                image: 'imgs/Slider/slider/slider3.png'
            },

            teacher4: {
                name: 'teacher4',
                age: 00,
                gender: 'unknown',
                subjects: [
                    'First subject', 'Second Subject'
                ],
                projects: [
                    'First Project', 'Second Project'
                ],
                Ratings: 0,
                image: 'imgs/Slider/slider/slider4.jpg'
            },

            teacher5: {
                name: 'teacher5',
                age: 00,
                gender: 'unknown',
                subjects: [
                    'First subject', 'Second Subject'
                ],
                projects: [
                    'First Project', 'Second Project'
                ],
                Ratings: 0,
                image: 'imgs/Slider/slider/slider5.jpg'
            },

            teacher6: {
                name: 'teacher6',
                age: 00,
                gender: 'unknown',
                subjects: [
                    'First subject', 'Second Subject'
                ],
                projects: [
                    'First Project', 'Second Project'
                ],
                Ratings: 0,
                image: 'imgs/Slider/slider/slider6.png'
            }
        },
        secondRow: {
            teacher7: {
                name: 'teacher7',
                age: 00,
                gender: 'unknown',
                subjects: [
                    'First subject', 'Second Subject'
                ],
                projects: [
                    'First Project', 'Second Project'
                ],
                Ratings: 0,
                image: 'imgs/Slider/slider/slider7.jpg'
            },

            teacher8: {
                name: 'teacher8',
                age: 00,
                gender: 'unknown',
                subjects: [
                    'First subject', 'Second Subject'
                ],
                projects: [
                    'First Project', 'Second Project'
                ],
                Ratings: 0,
                image: 'imgs/Slider/slider/slider1.jpg'
            },

            teacher9: {
                name: 'teacher9',
                age: 00,
                gender: 'unknown',
                subjects: [
                    'First subject', 'Second Subject'
                ],
                projects: [
                    'First Project', 'Second Project'
                ],
                Ratings: 0,
                image: 'imgs/Slider/slider/slider2.png'
            },

            teacher10: {
                name: 'teacher10',
                age: 00,
                gender: 'unknown',
                subjects: [
                    'First subject', 'Second Subject'
                ],
                projects: [
                    'First Project', 'Second Project'
                ],
                Ratings: 0,
                image: 'imgs/Slider/slider/slider3.png'
            },

            teacher11: {
                name: 'teacher11',
                age: 00,
                gender: 'unknown',
                subjects: [
                    'First subject', 'Second Subject'
                ],
                projects: [
                    'First Project', 'Second Project'
                ],
                Ratings: 0,
                image: 'imgs/Slider/slider/slider4.jpg'
            },

            teacher12: {
                name: 'teacher12',
                age: 00,
                gender: 'unknown',
                subjects: [
                    'First subject', 'Second Subject'
                ],
                projects: [
                    'First Project', 'Second Project'
                ],
                Ratings: 0,
                image: 'imgs/Slider/slider/slider5.jpg'
            }
        }
    }

    //------------------------Functions-----------------//

    return teachers
});

qecApp.factory('questionMaker', function(){

    var questions = {
        Q1: {
            QuestionNum: '1',
            Name: 'Question # 1',
            Q : 'The instructor is prepared for each class',

        },
        Q2: {
            QuestionNum: '2',
            Name: 'Question # 2',
            Q: 'The instructor demonstrates knowledge of the subject'
        },
        Q3: {
            QuestionNum: '3',
            Name: 'Question # 3',
            Q: 'The instructor has completed the whole course'
        },
        Q4: {
            QuestionNum: '4',
            Name: 'Question # 4',
            Q: 'The instructor provides additional material apart from the textbook'
        },
        Q5: {
            QuestionNum: '5',
            Name: 'Question # 5',
            Q: 'The instructor gives citations regarding current situations with reference to Pakistani context'
        },
        Q6: {
            QuestionNum: '6',
            Name: 'Question # 6',
            Q: 'The instructor communicates the subject matter effectively'
        },
        Q7: {
            QuestionNum: '7',
            Name: 'Question # 7',
            Q: 'The instructor shows respect towards students and encourages class participation'
        },
        Q8: {
            QuestionNum: '8',
            Name: 'Question # 8',
            Q: 'The instructor maintains an environment that is conductive to learning'
        },
        Q9: {
            QuestionNum: '9',
            Name: 'Question # 9',
            Q: 'The instructor arrives on time'
        },
        Q10: {
            QuestionNum: '10',
            Name: 'Question # 10',
            Q: 'The instructor leaves on time'
        },
        Q11: {
            QuestionNum: '11',
            Name: 'Question # 11',
            Q: 'The instructor is fair in examination'
        },
        Q12: {
            QuestionNum: '12',
            Name: 'Question # 12',
            Q: 'The instructor returns the graded scripts etc. in a reasonable amount of time'
        },
        Q13: {
            QuestionNum: '13',
            Name: 'Question # 13',
            Q: 'The instructor was available during specified office hours and for after class consultations'
        },
        Q14: {
            QuestionNum: '14',
            Name: 'Question # 14',
            Q: 'The subject matter presented in the course has increased your knowledge of the subject'
        },
        Q15: {
            QuestionNum: '15',
            Name: 'Question # 15',
            Q: 'The syllabus clearly states course objectives requirements, procedures and grading criteria'
        },
        Q16: {
            QuestionNum: '16',
            Name: 'Question # 16',
            Q: 'Then course integrates theoretical course concepts with real-world applications'
        },
        Q17: {
            QuestionNum: '17',
            Name: 'Question # 17',
            Q: 'The assignments and exams covered the materials presented in the course'
        },
        Q18: {
            QuestionNum: '18',
            Name: 'Question # 18',
            Q: 'The course material is modern and updated'
        }
    };

    return questions;

})