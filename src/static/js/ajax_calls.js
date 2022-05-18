/* CREATE FACULTY ACCOUNT JS */
$("#create-faculty-account").submit(function(e) {
    console.log('pasok');
    e.preventDefault();
    var paymentData = new FormData(document.getElementById("create-faculty-account"));
    Swal.fire({
        title: '<h2>Please Wait</h2>',
        html: '<h3><img src=".././../static/img/loading-spinner.gif" height=75 width=75></h3>',// add html attribute if you want or remove
        //html: '<h3><i class="fas fa-stroopwafel fa-spin"></i></h3>'
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        onBeforeOpen: () => {
            Swal.showLoading()
        },
    });
    $.ajax({
        type: "POST",
        url: "/clerk/create_faculty_account",
        processData: false,
        contentType: false,
        data: paymentData,
        success: function(success){
            Swal.fire({
                allowEscapeKey: false,
                allowOutsideClick: false,
                icon: 'success',
                title: 'Success',
                text: success.responseText
            }) 
        },
        error: function(error) {
            Swal.fire({
                allowEscapeKey: false,
                allowOutsideClick: false,
                icon: 'warning',
                title: 'Warning',
                text: error.responseText
            })
        },
        datatype: "multipart/form-data"
    });
});