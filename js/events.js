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
                '<td class="dateSaved">' + formatDate(save.date) + '</td>');
            $('.saveBank').append(saveEntry);
            $('.save-'+id).on('click', restore.bind(null,save));
            id++;
        }
    }
);
$('.clearGraph').on('click', clearGraph);
$('.clearStorage').on('click', function(e){
    localStorage.clear();
    localStorage.setItem('__saves__' ,JSON.stringify([]));
    $('.saveBank').html('');
});
$('.clearOnRun').on('click', function(e){
    $('.commandList').html('<h3 class="forAreaText">Перетащи сюда!</h3>');
});
$('.execute').on('click', function () {
    executeCmdList(parseCmdList());
});