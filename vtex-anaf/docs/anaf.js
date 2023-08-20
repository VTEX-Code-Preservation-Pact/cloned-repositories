const body = $('body');
vtexjs.checkout.getOrderForm().done((orderForm) => {
    getAnafSettings();
});
body.on('click', 'a#is-corporate-client, #client-profile-data .link-box-edit', function(){
    getAnafSettings();
}).on('keyup', '.corporate-info-box input#client-company-document', function(){
    if($(this).val()) {
        $('.getCompanyInfo').show();
    } else {
        $('.getCompanyInfo').hide();
    }
}).on('click', '.getCompanyInfo', function(e){
    e.preventDefault();
    const cui = $('.corporate-info-box input#client-company-document').val();
    validateCui(cui.replace(/[^0-9]/g, ''));

    return false;
});

async function validateCui(cui) {
    const requestBody = {
        cui
    }
    const response = await fetch(`/anaf/validate-cui`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
    });

    const company = await response.json();

    vtexjs.checkout.getOrderForm().done((orderForm) => {
        let clientProfileData = orderForm.clientProfileData
        clientProfileData.corporateName = company.name
        clientProfileData.tradeName = company.name
        clientProfileData.corporateDocument = cui
        clientProfileData.corporatePhone = company.phone
        clientProfileData.isCorporate = true
        vtexjs.checkout.sendAttachment(
            "clientProfileData",
            clientProfileData
        ).then(() => {
            if(company.hasOwnProperty('allowEdit') && company.allowEdit === false){
                disableInputs();
            }

            if(company.error){
                if(!$('.corporate-info-box p.client-company-document .cuiError').length) {
                    $('.corporate-info-box p.client-company-document').append('<p class="cuiError">CUI invalid</p>');
                }

            } else {
                if($('.corporate-info-box p.client-company-document .cuiError').length) {
                    $('.corporate-info-box p.client-company-document .cuiError').remove();
                }
            }

            if(!company.allowContinue && (company.error || !company.isActive)) {
                $("#go-to-shipping").hide();
            } else {
                $("#go-to-shipping").show();
            }
        })
    });
}

async function getAnafSettings() {
    $('label[for="client-company-document"]').html('CUI:');
    if(!$('.box-client-info-pj h5.corporate-title').hasClass('visible')) {
        $('.corporate-info-box').css('display', 'none');
    } else {
        $('.corporate-info-box').css('display', 'flex');
    }

    if(!$('.corporate-info-box .client-company-document .getCompanyInfo').length) {
        $('.corporate-info-box .client-company-document').append('<button class="getCompanyInfo">Preia</button>');
    }

    const settingsResponse = await fetch(`/anaf/get-settings`);
    const settings = await settingsResponse.json();

    if(!settings.allowEdit) {
        disableInputs();
    }

    if(!$('#client-company-name').val()) {
        const getUserResponse = await fetch(`/anaf/get-user`);
        const userResponse = await getUserResponse.json();
        console.log(userResponse);
    }
}

function disableInputs() {
    $('#client-company-name').prop('disabled', 'disabled');
    $('#client-company-nickname').prop('disabled', 'disabled');
}
