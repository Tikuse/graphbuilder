var r;
document.getElementsByClassName('up')[0].addEventListener('dblclick',up);
document.getElementsByClassName('down')[0].addEventListener('dblclick',down);
document.getElementsByClassName('moveToPoint')[0].addEventListener('dblclick',function (event) {
    console.log(event);
    r = event.target;
    moveToPoint(1,1);
});
document.getElementsByClassName('moveToVector')[0].addEventListener('dblclick',function (event) {
    console.log(event.target);
    moveToVector(1, 1);
});