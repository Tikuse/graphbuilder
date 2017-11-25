var board = JXG.JSXGraph.initBoard('jxgbox', {keepaspectratio: true, boundingbox: [-10, 10, 10, -10], axis:true});
var pointParams = {size: 1,style:{color:'black'}};

var pen = {x:0,y:0, active: up,
    view: board.create('point',[0,0],Object.assign({},pointParams,{color: "black"}))
    };
function updatePen(){
    pen.view.moveTo([pen.x,pen.y]);
}
function drawPoint(x,y){
    return  board.create('point',[x,y],pointParams);
}
function down(){
    console.log("down");
    pen.active = true;
}
function up(){
    console.log("up");
    pen.active = false;
}
function drawLineTo(x,y){
    var line,
        p1,
        // p2;
    p1 = drawPoint(pen.x,pen.y);
    // p2 = drawPoint(x,y);
    line = board.create('line',[p1,[x,y]], {straightFirst:false, straightLast:false, strokeWidth:2});
//            moveTo(x,y);
    return line;
}
function moveToPoint(x,y){
    console.log("move to point",x,y);
    if (pen.active)
        drawLineTo(x,y);
    pen.x = x;
    pen.y = y;
    updatePen();
}
function moveToVector(x,y){
    console.log("move to vector",x,y);
    if (pen.active)
        drawLineTo(pen.x+x,pen.y+y);
    pen.x += x;
    pen.y += y;
    updatePen();
}