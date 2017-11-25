var cmdHistory = [];
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
$('.up').on('dblclick', cmd);
$('.down').on('dblclick', cmd);
$('.moveToPoint').on('dblclick', cmd);
$('.moveToVector').on('dblclick', cmd);

function parseCmd(el) {
    var cmd = {command: el.getAttribute('data-action')};
    if (cmd.command === 'moveToPoint' || cmd.command ==='moveToVector'){
        cmd.coords = getCoords(el);
    }
    return cmd;
}
function parseCmdList() {
    var list = [];
    $('.commandList').children('.ElementList').each(function (_,el) {
        // var cmd = {command: el.getAttribute('data-action')};
        // if (cmd.command === 'moveToPoint' || cmd.command ==='moveToVector'){
        //     cmd.coords = getCoords(el);
        //     }

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
    // if (!validateCmdList()) {
    //     console.log("not valid");
    //     return false;
    // }
    var funcList = [],f;
    for(var cmd of list){
        console.log(cmd);
        executeCmd(cmd);
    }

    return true;
}

$('.execute').on('click', function () {
    executeCmdList(parseCmdList());
});
