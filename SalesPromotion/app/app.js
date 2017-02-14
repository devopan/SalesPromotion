/// <reference path="angular.min.js" />

var myApp = angular
                .module("myModule", [])
                .directive('limitChars', function ($parse) {
                    return {
                        scope: {
                            textLength: '='
                        },
                        link: linkFunction
                    }
                }).directive('uppercased', function () {
                    return {
                        require: 'ngModel',
                        link: function (scope, element, attrs, modelCtrl) {
                            modelCtrl.$parsers.push(function (input) {
                                return input ? input.toUpperCase() : "";
                            });
                            element.css("text-transform", "uppercase");
                        }
                    };
                });

myApp.controller("myController", function ($scope, $http, $log, $window) {

    var fields = [
        { labelText: "Full Name", value: "" },
        { labelText: "Full Address", value: "" },
        { labelText: "Telephone Number", value: "" }
    ];

    var sentObj = {
        name: "",
        address: "",
        telephone: ""
    };

    var theme = {
        image: "/images/promo.jpg"
    };

    $scope.theme = theme;
    $scope.image = 
    $scope.regExOk = false;
    $scope.isWinningCode = false;
    $scope.dataFromAPI;
    $scope.codeInput = "";
    $scope.maxLength = 6;

    $scope.addWinner = function ($event, fields) {
        
        sentObj.name = fields[0].value,
        sentObj.address = fields[1].value
        sentObj.telephone = fields[2].value


        var validator = validate({fullname: sentObj.name, fulladdress: sentObj.address, telephone: sentObj.telephone}, constraints);

        if (validator != null)
        {
            var checked = true;
            var alertmsg = "";

            if (validator["telephone"] != null) {
                alertmsg = validator["telephone"][0];
                for (i = 1; i < validator["telephone"].length; i++) {
                    alertmsg = alertmsg.concat("\n\n", validator["telephone"][i]);
                }
                checked = false;
            }

            if (validator["fulladdress"] != null) {
                if (alertmsg != null) {
                    for (i = 0; i < validator["fulladdress"].length; i++) {
                        alertmsg = alertmsg.concat("\n\n", validator["fulladdress"][i]);
                    }
                }
                else {
                    alertmsg = validator["fulladdress"][0];
                }
                checked = false;
            }

            if (validator["fullname"] != null) {
                if (alertmsg != null) {
                    for (i = 0; i < validator["fullname"].length; i++) {
                        alertmsg = alertmsg.concat("\n\n", validator["fullname"][i]);
                    }
                }
                else {
                    alertmsg = validator["fullname"][0];
                }
                checked = false;
            }

            if (!checked) {
                alert(alertmsg);
                return false;
            }
        }
        
        var obj = JSON.stringify({
                    'FullName': fields[0].value,
                    'Address': fields[1].value,
                    'TelephoneNumber': fields[2].value
        });

        $http.post('http://localhost:52949/api/SalesPromo/AddWinner', obj)
        .then(function (response) {
            $scope.dataFromAPI = response;
            $log.info(response);
            $window.location.href = 'http://localhost:50814/Index.html';
        }).catch(function (error) {
            $log.info(error);
        });
        alert("Thank you!");
    };

    $scope.checkRegEx = function ($event) {      
        var pattern = new RegExp('^(?=.*[0-9])(?=.*[A-F])([A-F0-9]+){6}$');

        $scope.regExOk = false;
        $scope.isWinningCode = false;

        if (pattern.test($scope.codeInput)) {
            $scope.regExOk = true;           

            var obj = JSON.stringify({
                'Code': $scope.codeInput
            });

            $http.post('http://localhost:52949/api/SalesPromo/CheckCode', obj)
            .then(function (response) {
                $scope.dataFromAPI = response;
                $scope.isWinningCode = response.data.result;
                $log.info(response);
                if (response.data.result) {
                    $window.location.href = 'http://localhost:50814/Index.html#popup';
                }
                else
                {
                    alert("Unfortunately you did not win. Better luck next time!");
                }
            }).catch(function (error) {
                $log.info(error);
            });      
        }
        else {
            alert("Please enter a six character code containing at least one letter (A-F) and one number.")
            $scope.regExOk = false;
        }
    };
    
    $scope.login = function ($event) {
        $window.location.href = 'http://localhost:52949/Manage/Index';
    };

    $scope.fields = fields;
    $scope.sentObj = sentObj;
});

var linkFunction = function (scope, txtElement) {

    txtElement.bind('keypress', function (e) {

        if (txtElement[0].value.length > scope.textLength - 1 &&
            e.keyCode != '8' &&
            e.keyCode != '35' &&
            e.keyCode != '36' &&
            e.keyCode != '37' &&
            e.keyCode != '39' &&
            e.keyCode != '46') {
            e.preventDefault();
            return false;
        }
    });
};



