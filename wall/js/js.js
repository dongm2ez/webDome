/**
 * Created by dongyuxiang on 16/8/14.
 */

$(document).ready(function() {

    var ref = new Wilddog("https://barrage-wall.wilddogio.com");

    var launch = $('#launch');
    var clear = $('#clear');
    var barrage = $('#barrage');
    var jumbotron = $('.jumbotron');
    var array = [];

    // 发送弹幕
    launch.
    on('click', function() {
        var barrageVal = barrage.val();
        if (barrageVal != '') {
            ref.child('message').push(barrageVal);
        }
        barrage.val('');
    });

    // 清除弹幕数据
    clear.
    on('click', function() {
        ref.remove();
        array = [];
        jumbotron.empty();
    });

    ref.
    child('message').
    on('child_added', function(snapshot) {
        var text = snapshot.val();
        array.push(text);
        var textObj = $('<div class="barrage_message"></div>');
        textObj.text(text);
        jumbotron.append(textObj);
        moveObj(textObj);
    });

    var topMin = jumbotron.offset().top;
    var topMax = topMin + jumbotron.height();
    var _top = topMin;

    var moveObj = function(obj) {
        var _left = jumbotron.width() - obj.width();
        console.log(_left);
        _top = _top + 50;
        if (_top > (topMax - 50)) {
            _top = topMin;
        }
        obj.css({
            left: _left,
            top: _top,
            color: getRandomColor()
        });
        var time = 20000 + 10000 * Math.random();
        obj.animate({
            left: "-" + _left + "px"
        }, time, function() {
            obj.remove();
        });
    };

    var getRandomColor = function() {
        return '#' + (function(h) {
                return new Array(7 - h.length).join("0") + h
            })((Math.random() * 0x1000000 << 0).toString(16))
    };

    var getAndRun = function() {
        if (array.length > 0) {
            var n = Math.floor(Math.random() * array.length + 1) - 1;
            var textObj = $("<div>" + array[n] + "</div>");
            jumbotron.append(textObj);
            moveObj(textObj);
        }

        setTimeout(getAndRun, 3000);
    };

    jQuery.fx.interval = 50;
    getAndRun();
});
