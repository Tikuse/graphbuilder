var r;
function getCoords(el){
    var x,y;
    console.log(el);
    if (el && el.children) {
        x = +el.children[0].value;
        y = +el.children[1].value;
    }
    return {x:x,y:y}

}
$('.up').on('dblclick', up);
$('.down').on('dblclick', down);
$('.moveToPoint').on('dblclick', function(e) {
    if (e.target !== this)
        return;
    var coords = getCoords(event.target),
        x = coords.x,
        y = coords.y;
    console.log(x,y);
    if(x && y)
        moveToPoint(x, y);
});
$('.moveToVector').on('dblclick', function(e) {
    if (e.target !== this)
        return;
    var coords = getCoords(event.target),
        x = coords.x,
        y = coords.y;
    console.log(x,y);
    if(x && y)
        moveToVector(x, y);
});


function parseCmdList() {
    var list = [];
    $('.commandList').children('.ElementList').each(function (_,el) {
        var cmd = {command: el.getAttribute('data-action')};
        if (cmd.command === 'moveToPoint' || cmd.command ==='moveToVector'){
            cmd.coords = getCoords(el);
            }
        list.push(cmd);
    });
    console.log(list);
    return list;
}

$('.execute').on('click', function () {
    executeCmdList(parseCmdList());
});
