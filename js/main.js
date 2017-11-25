var r;
function getCoords(el){
    var x,y;
    console.log(el);
    if (el && el.children) {
        x = event.target.children[0].value;
        y = event.target.children[1].value;
    }
    return {x:x,y:y}

}
$('.up').on('dblclick', up);
$('.down').on('dblclick', down);
$('.moveToPoint').on('dblclick', function(e) {
    if (e.target !== this)
        return;
    var coords = getCoords(event.target),
        x = +coords.x,
        y = +coords.y;
    console.log(x,y);
    if(x && y)
        moveToPoint(x, y);
});
$('.moveToVector').on('dblclick', function(e) {
    if (e.target !== this)
        return;
    var coords = getCoords(event.target),
        x = +coords.x,
        y = +coords.y;
    console.log(x,y);
    if(x && y)
        moveToVector(x, y);
});
