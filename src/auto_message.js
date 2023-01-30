
function textAClick(index) {
    $('ul.chat-profile-settings').addClass('hidden');
    $('ul.chat-profile-options li').removeClass('active');
    let query1 = 'ul.chat-profile-options li[index="' + index + '"]';
    let query2 = 'ul.chat-profile-settings[index="' + index + '"]';
    $(query1).addClass('active');
    $(query2).removeClass('hidden');
};

function putmessage(msg) {
    let questionElement = document.getElementById("default-textarea");
    if (!questionElement.disabled)
        questionElement.value = msg;
}

msg_samples.forEach((item, index) => {
    $(".chat-profile-options").append('<li index="' + index + '"> \
            <a class="chat-option-link" href="javascript:textAClick(' + index + ')"> \
                <em class="icon icon-circle bg-light ni ni-label-alt"></em> \
                <span class="lead-text">' + item.type + '</span> \
            </a> \
        </li>');
                
    $("#promptPreviewPane").append(
        '<ul class="chat-profile-settings hidden" index="' + index + '">' +
        item.samples.map( item => '<li> \
            <a class="chat-option-link" href="javascript:putmessage(\'' + item.content + '\')"> \
                <em class="icon icon-circle bg-light ni ni-edit-alt"></em> \
                <div> \
                    <span class="lead-text">' + item.title + '</span> \
                    <span class="sub-text">' + item.content + '</span> \
                </div> \
            </a> \
        </li>').join(" ") + 
        '</ul>')
});

textAClick(0);
