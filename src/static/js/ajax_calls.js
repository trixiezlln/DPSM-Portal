/* CREATE FACULTY ACCOUNT JS */
$("#create-faculty-account").submit(function(e) {
    e.preventDefault();
    var facultyData = new FormData(document.getElementById("create-faculty-account"));
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
        data: facultyData,
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

/* SAVE CLERK EDIT FACULTY VALUES */
function save_faculty_edit(rank_val, classification_val, tenure_val, status_val, user_id) {
    var facultyData = new FormData();

    facultyData.append('faculty_rank', rank_val);
    facultyData.append('faculty_classification', classification_val);
    facultyData.append('faculty_tenure', tenure_val);
    facultyData.append('faculty_status', status_val);
    facultyData.append('user_id', user_id);

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
        type: "PUT",
        url: "/clerk/edit_information",
        processData: false,
        contentType: false,
        data: facultyData,
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
}

/* CLERK EDIT FSR VALUES */
function edit_fsr(
    course_code_val,
    section_val,
    semester_val,
    schedule_val,
    number_of_students_val,
    syllabus_val,
    set_val,
) {
    alert('pasok')
    var fsrData = new FormData();

    facultyData.append('course_code_val', course_code_val);
    facultyData.append('section_val', section_val);
    facultyData.append('semester_val', semester_val);
    facultyData.append('schedule_val', schedule_val);
    facultyData.append('number_of_students_val', number_of_students_val);
    facultyData.append('syllabus_val', syllabus_val);
    facultyData.append('set_val', set_val);

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
        type: "PUT",
        url: "/clerk/edit_information",
        processData: false,
        contentType: false,
        data: fsrData,
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
}

/* CLERK ADD FACULTY RECORD */
$("#add_fsr").submit(function(e) {
    e.preventDefault();
    var fsrData = new FormData(document.getElementById("add_fsr"));
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
        url: "/clerk/faculty_service_record/"+fsrData.get('user_id'),
        processData: false,
        contentType: false,
        data: fsrData,
        success: function(success){
            Swal.fire({
                allowEscapeKey: false,
                allowOutsideClick: false,
                icon: 'success',
                title: 'Success',
                text: success.responseText
            }).then(function(then){
                location.reload();
            }) 
        },
        error: function(error){
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

})

/* UNIT HEAD: NOMINATE NEW UNIT HEAD */
$("#unit_head_nomination_table").submit(function(e) {
    e.preventDefault();
    var new_unit_head_data = new FormData(document.getElementById("unit_head_nomination_table"));
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
        url: "/unit_head/role_assignment",
        processData: false,
        contentType: false,
        data: new_unit_head_data,
        success: function(success){
            Swal.fire({
                allowEscapeKey: false,
                allowOutsideClick: false,
                icon: 'success',
                title: 'Success',
                text: success.responseText
            }).then(function(then){
                location.reload();
            })
        },
        error: function(error){
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

})

/* UNIT HEAD: DELETE UNIT HEAD NOMINEE */
function delete_unit_head_nominee(curr_unit_head, nominated_unit_head){
    var new_unit_head_data = new FormData();
    new_unit_head_data.append('curr_unit_head', curr_unit_head);
    new_unit_head_data.append('nominated_unit_head', nominated_unit_head);
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
        type: "DELETE",
        url: "/unit_head/role_assignment",
        processData: false,
        contentType: false,
        data: new_unit_head_data,
        success: function(success){
            Swal.fire({
                allowEscapeKey: false,
                allowOutsideClick: false,
                icon: 'success',
                title: 'Success',
                text: success.responseText
            }).then(function(then){
                location.reload();
            })
        },
        error: function(error){
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
}

/* DEPT HEAD: Approve Unit Head */
function approve_unit_head_nominee(){
    var new_unit_head_data = new FormData();

    new_unit_head_data.append('curr_unit_head', $('#accept_modal_curr_unit_head').val());
    new_unit_head_data.append('nominated_unit_head', $('#accept_modal_nominated_unit_head').val());
    
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
        url: "/department_chair/role_assignment",
        processData: false,
        contentType: false,
        data: new_unit_head_data,
        success: function(success){
            Swal.fire({
                allowEscapeKey: false,
                allowOutsideClick: false,
                icon: 'success',
                title: 'Success',
                text: success.responseText
            }).then(function(then){
                location.reload();
            })
        },
        error: function(error){
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
}

/* DEPT HEAD: Reject Unit Head */
function reject_unit_head_nominee(){
    var new_unit_head_data = new FormData();

    new_unit_head_data.append('curr_unit_head', $('#delete_modal_curr_unit_head').val());
    new_unit_head_data.append('nominated_unit_head', $('#delete_modal_nominated_unit_head').val());
    new_unit_head_data.append('approver_remarks', $('#remarks').val());
    
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
        type: "DELETE",
        url: "/department_chair/role_assignment",
        processData: false,
        contentType: false,
        data: new_unit_head_data,
        success: function(success){
            Swal.fire({
                allowEscapeKey: false,
                allowOutsideClick: false,
                icon: 'success',
                title: 'Success',
                text: success.responseText
            }).then(function(then){
                location.reload();
            })
        },
        error: function(error){
            alert('Error')
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
}

function unit_head_info_modal(curr_unit_head, nominated_unit_head, modal){
    if(modal == 'accept'){
        $('#accept_modal_curr_unit_head').val(curr_unit_head)
        $('#accept_modal_nominated_unit_head').val(nominated_unit_head)
        $('#acceptModal').modal('toggle');
    } else if(modal == 'reject'){
        $('#delete_modal_curr_unit_head').val(curr_unit_head)
        $('#delete_modal_nominated_unit_head').val(nominated_unit_head)
        $('#rejectModal').modal('toggle');
    }
}

/* DEPT HEAD: Assign New Department Head */
function assign_dept_head(){
    var new_dept_head_data = new FormData();

    new_dept_head_data.append('new_dept_head', $('#select_department_chair').val());
    
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
        url: "/department_chair/role_assignment/dept_head",
        processData: false,
        contentType: false,
        data: new_dept_head_data,
        success: function(success){
            Swal.fire({
                allowEscapeKey: false,
                allowOutsideClick: false,
                icon: 'success',
                title: 'Success',
                text: success.responseText
            }).then(function(then){
                location.href = '/';
            })
        },
        error: function(error){
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
}

/* DEPT HEAD: ADD CLERK ACCOUNT */
$("#add_info_forms").submit(function(e) {
    e.preventDefault();
    var new_clerk_data = new FormData();

    var new_clerk_data = new FormData(document.getElementById("add_info_forms"));

    console.log(new_clerk_data)
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
        url: "/department_chair/role_assignment/clerk",
        processData: false,
        contentType: false,
        data: new_clerk_data,
        success: function(success){
            Swal.fire({
                allowEscapeKey: false,
                allowOutsideClick: false,
                icon: 'success',
                title: 'Success',
                text: success.responseText
            }) 
        },
        error: function(error){
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

})

/* DEPT HEAD: Delete Clerk Account */
function delete_clerk(){
    var clerk_data = new FormData();

    clerk_data.append('clerk_id', $('#clerk_id').val());
    
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
        type: "DELETE",
        url: "/department_chair/role_assignment/clerk",
        processData: false,
        contentType: false,
        data: clerk_data,
        success: function(success){
            Swal.fire({
                allowEscapeKey: false,
                allowOutsideClick: false,
                icon: 'success',
                title: 'Success',
                text: success.responseText
            }).then(function(then){
                location.reload();
            })
        },
        error: function(error){
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
}

function delete_clerk_modal(clerk_user_id){
    $('#clerk_id').val(clerk_user_id)
    $('#deleteModal').modal('toggle');
}

/* Show Syllabus Image */
function show_syllabus(user_id, sy, semester, section, f_ext) {
    filename = "FSR_SYLLABUS_" + sy + "_" + semester + "_" + section + "." + f_ext
    $.ajax({
        type: "GET",
        url: "/clerk/faculty_service_record/"+user_id+"/show_syllabus/"+filename,
        success: function(response){
            var data = JSON.parse(response);
            var file_ext = data['file_ext'];

            if (file_ext === 'pdf'){
                window.open(data['syllabus_file'], '_blank');
            } else {
                var img_loc = "../../../"+data['syllabus_file']
                $('#view_syllabus_img').attr("href", img_loc);
                $('#view_syllabus_img').click();
            };
        },
        error: function(error){
            Swal.fire({
                allowEscapeKey: false,
                allowOutsideClick: false,
                icon: 'warning',
                title: 'Warning',
                text: error.responseText
            })
        },
    });
};

/* Show SET Proof Image */
function show_set_proof(user_id, sy, semester, section, f_ext) {
    filename = "FSR_SET_PROOF_" + sy + "_" + semester + "_" + section + "." + f_ext
    $.ajax({
        type: "GET",
        url: "/clerk/faculty_service_record/"+user_id+"/show_set_proof/"+filename,
        success: function(response){
            var data = JSON.parse(response);
            var file_ext = data['file_ext'];

            if (file_ext === 'pdf'){
                window.open(data['syllabus_file'], '_blank');
            } else {
                var img_loc = "../../../"+data['syllabus_file']
                $('#view_syllabus_img').attr("href", img_loc);
                $('#view_syllabus_img').click();
            };
        },
        error: function(error){
            Swal.fire({
                allowEscapeKey: false,
                allowOutsideClick: false,
                icon: 'warning',
                title: 'Warning',
                text: error.responseText
            })
        },
    });
};