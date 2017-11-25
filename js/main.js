var cmdHistory = [];
if (!localStorage.getItem('__saves__'))
    localStorage.setItem('__saves__' ,JSON.stringify([]));
function getCoords(el){
    var x,y;
    console.log(el);
    if (el && el.children) {
        x = +el.children[0].value;
        y = +el.children[1].value;
    }
    return {x:x,y:y}

}
var cmd = function(e) {
    executeCmd(parseCmd(e.target));
};
$('[data-action="up"]').on('dblclick', cmd);
$('[data-action="down"]').on('dblclick', cmd);
$('[data-action="moveToPoint"]').on('dblclick', cmd);
$('[data-action="moveToVector"]').on('dblclick', cmd);
$('.save').on('click', function(){
    save();
    $('.alert').css("display", "block");
    setTimeout(function() {$('.alert').css("display", "none")}, 2000);
});
$('.saveList').on('click', function (e) {
    var id = 0;
    $('.saveBank').text('');
    for (var save of loadAllSaves()) {
        var saveEntry = $("<tr></tr>").html('<td><a  href="#" class="nameSaved save-'+id+'">График</a></td>\n' +
            '<td class="dateSaved">' + save.date + '</td>');
        $('.saveBank').append(saveEntry);
        $('.save-'+id).on('click', restore.bind(null,save));
        id++;
    }
    }
);

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
    console.log(list);
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
    console.log(cmd);
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
    // var funcList = [],f;
    // for(var cmd of list){
    //     if (cmd.command === 'for'){
    //         var forCmds = [],
    //             cmd2, endFound = false;
    //         while (list.length>0){
    //             cmd2 = list.shift();
    //             forCmds.push(cmd2);
    //             if (cmd2.command==='end'){
    //                 endFound = true;
    //                 break;
    //             }
    //         }
    //         if (endFound) {
    //             console.log("---",forCmds);
    //             for (var i = 0; i < 3; i++)
    //                 executeCmdList(forCmds)
    //         }
    //         else
    //             break;
    //     }
    //     executeCmd(cmd);
    // }
    console.log(333);
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
            console.log(1);
            var cmd = list.shift();
            if (cmd.command === 'for'){
                var eindex = list.map(function(c){return c.command}).lastIndexOf('end');
                var cmdsInLoop = list.splice(0,eindex);

                for(var i = 0; i<cmd.iterations;i++){
                    cmds = cmdsInLoop.slice(0,cmdsInLoop.length);
                    console.log(777,cmds);
                    executeCmdList(cmds);
                }
            }
            executeCmd(cmd);
        }
    }
    return true;
}

$('.execute').on('click', function () {
    executeCmdList(parseCmdList());
});

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
    JXG.JSXGraph.freeBoard(board);
    pen.x = pen.y = 0;
    board = JXG.JSXGraph.initBoard('jxgbox',
        {keepaspectratio: true, boundingbox: [-5, 5, 5, -5], axis:true}
    );
    pen.view = board.create('point',[0,0],Object.assign({},pointParams,{color: "black"}))
    executeCmdList(save.commands);
}