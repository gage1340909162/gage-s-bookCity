var gulp = require("gulp");
var server = require("gulp-webserver");
var url = require("url");
var mock = require("./data/mock");
var mincss = require("gulp-clean-css");
var minhtml = require("gulp-htmlmin");
var minjs = require("gulp-uglify");
var babel = require("gulp-babel");
var userCed = false;
var userObj = {
    user: "gage",
    pwd: "123"
}

gulp.task("webserver", function() {
    gulp.src("./dist")
        .pipe(server({
            host: "localhost",
            port: 3030,
            middleware: function(req, res, next) {
                var urlObj = url.parse(req.url, true);
                if (/\/book/g.test(urlObj.pathname)) {
                    res.end(JSON.stringify(mock(req.url)));
                }
                if (req.url === "/login") {
                    userCed = true;
                    var arr = [];
                    req.on("data", function(chunk) {
                        arr.push(chunk);
                    });
                    req.on("end", function() {
                        var data = Buffer.concat(arr).toString().split("&");
                        var obj = {};
                        var json = {};
                        data.forEach(function(val, i) {
                            obj[val.split("=")[0]] = val.split("=")[1];

                        });
                        if (obj.user === userObj.user && obj.pwd === userObj.pwd) {
                            json.code = 0;
                            json.msg = "success";
                        } else {
                            json.code = 1;
                            json.msg = "账号或密码错误，请重新输入";
                        }
                        res.end(JSON.stringify(json));
                    });
                    return false;
                }
                if (req.url === "/userLogin") {
                    res.end('{"result":"' + userCed + '"}')
                }
                next();
            }
        }));
});

gulp.task("default", ["webserver"]);