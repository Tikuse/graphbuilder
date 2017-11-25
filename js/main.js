var cmdHistory = [];
if (!localStorage.getItem('__saves__'))
    localStorage.setItem('__saves__' ,JSON.stringify([]));
function getCoords(el){
    var x,y;
    // console.log(el);
    if (el && el.children) {
        x = +el.children[0].value;
        y = +el.children[1].value;
    }
    return {x:x,y:y}

}
var cmd = function(e) {
    executeCmd(parseCmd(e.target));
};
function parseCmd(el) {
    var cmd = {command: el.getAttribute('data-action')};
    if (cmd.command === 'moveToPoint' || cmd.command ==='moveToVector'){
        cmd.coords = getCoords(el);
    }
    else if (cmd.command === 'for' || cmd.command ==='moveToVector'){
        cmd.iterations = +el.children[0].value;
    }
    return cmd;
}
function parseCmdList() {
    var list = [];
    $('.commandList').children('.ElementList').each(function (_,el) {
        list.push(parseCmd(el));
    });
    // console.log(list);
    return list;
}

function validateCmdList(list) {
    for(var cmd in list){
        if(!validateCmd(cmd))
            return false;
    }
    return true;
}
function validateCmd(cmd) {
    // console.log(cmd);
    if(availableCommands.indexOf(cmd.command)===-1)
        return false;
    if(cmd.command === 'moveToPoint' || cmd.command ==='moveToVector')
        if (isNaN(cmd.coords.x) ||
            isNaN(cmd.coords.y))
            return false
    return true;
}
function executeCmd(cmd){
    if (validateCmd(cmd)){
        switch (cmd.command){
            case 'up': up(); break;
            case 'down': down(); break;
            case 'moveToPoint': moveToPoint(cmd.coords.x,cmd.coords.y); break;
            case 'moveToVector':  moveToVector(cmd.coords.x,cmd.coords.y); break;
        }
        cmdHistory.push(cmd);
    }
}
function executeCmdList(list) {
    // console.log(333);
    var counterFor = 0,
        counterEnd = 0;
    for(var cmd of list) {
        if (cmd.command === 'for')
            counterFor++;
        else if (cmd.command === 'end') {
            counterEnd++;
            if (counterEnd > counterFor)
                return false;
        }
    }
    if (counterFor === counterEnd){
        while (list.length>0){
            // console.log(1);
            var cmd = list.shift();
            if (cmd.command === 'for'){
                var eindex = list.map(function(c){return c.command}).lastIndexOf('end');
                var cmdsInLoop = list.splice(0,eindex);

                for(var i = 0; i<cmd.iterations;i++){
                    cmds = cmdsInLoop.slice(0,cmdsInLoop.length);
                    // console.log(777,cmds);
                    executeCmdList(cmds);
                }
            }
            executeCmd(cmd);
        }
    }
    return true;
}

function save() {
    var save = {commands: cmdHistory, date: new Date()};
    var saves = JSON.parse(localStorage.getItem('__saves__'));
    saves.push(save);
    localStorage.setItem('__saves__',JSON.stringify(saves));
}
function loadAllSaves() {
    var saves = JSON.parse(localStorage.getItem('__saves__'));
    return saves;
}
function restore(save) {
    var cmds = save.commands.filter(function(s){return s.command!=='for' && s.command!=='end'});
    clearGraph();
    executeCmdList(cmds);
}

function clearGraph(){
    cmdHistory = [];
    JXG.JSXGraph.freeBoard(board);
    pen.x = pen.y = 0;
    board = JXG.JSXGraph.initBoard('jxgbox',
        {keepaspectratio: true, boundingbox: [-5, 5, 5, -5], axis:true}
    );
    pen.view = board.create('point',[0,0],Object.assign({},pointParams,{color: "black"}))
}

function formatDate(d){
    d = new Date(d);
    return ("00" + (d.getMonth() + 1)).slice(-2) + "/" +
        ("00" + d.getDate()).slice(-2) + "/" +
        d.getFullYear() + " " +
        ("00" + d.getHours()).slice(-2) + ":" +
        ("00" + d.getMinutes()).slice(-2) + ":" +
        ("00" + d.getSeconds()).slice(-2);
}