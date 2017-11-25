var board = JXG.JSXGraph.initBoard('jxgbox',
    {keepaspectratio: true, boundingbox: [-5, 5, 5, -5], axis:true}
    );
var pointParams = {size: 1,style:{color:'black',fixed:true}};
var availableCommands = ['up','down','moveToPoint','moveToVector'];
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
    else
        drawPoint(pen.x,pen.y);
    pen.x = x;
    pen.y = y;
    updatePen();
}
function moveToVector(x,y){
    console.log("move to vector",x,y);
    if (pen.active)
        drawLineTo(pen.x+x,pen.y+y);
    else
        drawPoint(pen.x,pen.y);
    pen.x += x;
    pen.y += y;
    updatePen();
}
function validateCmdList(list) {
    for(var cmd in list){
        if(!availableCommands.indexOf(cmd.command)!==-1)
            return false;
        if(cmd.command === 'moveToPoint' || cmd.command ==='moveToVector')
            if (!(typeof cmd.coords.x  === 'number' &&
                typeof cmd.coords.y   === 'number' ))
                return false
    }
    return true;
}
function executeCmdList(list) {
    if (!validateCmdList()) {
        console.log("not valid");
        return false;
    }
    var funcList = [],f;
    for(var cmd of list){
        console.log(cmd);
        switch (cmd.command){
            case 'up': f=up(); break;
            case 'down': f=down(); break;
            case 'moveToPoint': f=moveToPoint(cmd.coords.x,cmd.coords.y); break;
            case 'moveToVector':  f=moveToVector(cmd.coords.x,cmd.coords.y); break;
        }
        // funcList.push(f);
    }
    // console.log(funcList);
    // function i(f){
    //     console.log(f);
    //     window.setTimeout(function(){
    //         f();
    //         f2 = funcList.pop();
    //         if(f2)
    //             i(f2);
    //     }, 1 * 1000);
    //
    // }
    // i(funcList.pop());
    return true;
}