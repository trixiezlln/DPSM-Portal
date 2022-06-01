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
            }).then(function(then){
                location.reload();
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
    var fsrData = new FormData();

    fsrData.append('course_code_val', course_code_val);
    fsrData.append('section_val', section_val);
    fsrData.append('semester_val', semester_val);
    fsrData.append('schedule_val', schedule_val);
    fsrData.append('number_of_students_val', number_of_students_val);
    fsrData.append('syllabus_val', syllabus_val);
    fsrData.append('set_val', set_val);

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

/* UNIT HEAD: Approve pending info */
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
                var img_loc = "../../../"+data['syllabus_file'];
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
                $('#view_set_img').attr("href", img_loc);
                $('#view_set_img').click();
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

function show_info_proof(current_user, proof_type, user_id, last_modified, f_ext) {
    filename = proof_type + "_" + user_id + "_" + last_modified.replace(' ', '_') + "." + f_ext

    page_url = ""

    if(current_user == "faculty") {
        page_url = "/faculty/faculty_landing_page/" + filename;
    } else {
        page_url = "/"+ current_user +"/view_faculty_info/" + filename;
    }

    $.ajax({
        type: "GET",
        url: page_url,
        success: function(response){
            var data = JSON.parse(response);
            var file_ext = data['file_ext'];
            var file_window = ""

            if(proof_type == 'EDUC_PROOF'){
                file_window = "#view_educ_proof"
            } else if(proof_type == 'WORK_PROOF'){
                file_window = "#view_work_proof"
            } else if(proof_type == 'ACCOMPLISHMENT_PROOF'){
                file_window = "#view_accomplishment_proof"
            } else if(proof_type == 'PUBLICATION_PROOF'){
                file_window = "#view_publication_proof"
            } else if(proof_type == 'LICENSURE_PROOF'){
                file_window = "#view_licensure_proof"
            } else if(proof_type == 'RESEARCH_GRANT_PROOF'){
                file_window = "#view_research_proof"
            } else if(proof_type == 'TRAINING_SEMINAR_PROOF'){
                file_window = "#view_training_proof"
            } 

            if (file_ext === 'pdf'){
                window.open(data['proof_file'], '_blank');
            } else {
                var img_loc = "../../../"+data['proof_file'];
                $(file_window).attr("href", img_loc);
                $(file_window).click();
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
                $('#view_set_img').attr("href", img_loc);
                $('#view_set_img').click();
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

/* Add Personal Info */ 
$("#add_personal_form").submit(function(e) {
    e.preventDefault();
    var facultyData = new FormData(document.getElementById("add_personal_form"));
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
        url: "/faculty/add_personal_info",
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
            }).then(function(then){
                location.href="/faculty/faculty_landing_page";
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

/* Add Educ Info */ 
$("#add_educ_form").submit(function(e) {
    e.preventDefault();
    var facultyData = new FormData(document.getElementById("add_educ_form"));
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
        url: "/faculty/add_educational_attainment",
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
            }).then(function(then){
                location.href="/faculty/faculty_landing_page";
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

/* Add Work Exp Info */ 
$("#add_work_form").submit(function(e) {
    e.preventDefault();
    var facultyData = new FormData(document.getElementById("add_work_form"));
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
        url: "/faculty/add_work_experience",
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
            }).then(function(then){
                location.href="/faculty/faculty_landing_page";
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

/* Add Accomplishment Info */ 
$("#add_acc_form").submit(function(e) {
    e.preventDefault();
    var facultyData = new FormData(document.getElementById("add_acc_form"));
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
        url: "/faculty/add_accomplishment",
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
            }).then(function(then){
                location.href="/faculty/faculty_landing_page";
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

/* Add Publication Info */ 
$("#add_pub_form").submit(function(e) {
    e.preventDefault();
    var facultyData = new FormData(document.getElementById("add_pub_form"));
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
        url: "/faculty/add_publication",
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
            }).then(function(then){
                location.href="/faculty/faculty_landing_page";
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

/* Add Licensure Exam Info */ 
$("#add_lic_form").submit(function(e) {
    e.preventDefault();
    var facultyData = new FormData(document.getElementById("add_lic_form"));
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
        url: "/faculty/add_licensure",
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
            }).then(function(then){
                location.href="/faculty/faculty_landing_page";
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

/* Add Research Grant Info */ 
$("#add_rg_form").submit(function(e) {
    e.preventDefault();
    var facultyData = new FormData(document.getElementById("add_rg_form"));
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
        url: "/faculty/add_research_grant",
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
            }).then(function(then){
                location.href="/faculty/faculty_landing_page";
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

/* Add Training/Seminar Info */ 
$("#add_ts_form").submit(function(e) {
    e.preventDefault();
    var facultyData = new FormData(document.getElementById("add_ts_form"));
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
        url: "/faculty/add_training",
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
            }).then(function(then){
                location.href="/faculty/faculty_landing_page";
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

/* Toggle Approve/Reject Modal */
function toggle_approve_reject_modal(modal, info_type, id, user_id) {
    if(modal == 'modal_approve'){
        $('#approved_id').html(id)
        $('#approved_id').hide()
        $('#approved_type').html(info_type)
        $('#approved_type').hide()
        $('#'+modal).modal('toggle')
    } else {
        $('#rejected_id').html(id)
        $('#rejected_id').hide()
        $('#rejected_type').html(info_type)
        $('#rejected_type').hide()
        $('#rejected_user_id').html(user_id)
        $('#rejected_user_id').hide()
        $('#'+modal).modal('toggle')
    }
}

/* Toggle Pending Approval Modal */
function toggle_pending_modal(first_name, last_name, user_id,
    educ_id, school, degree, degree_type, specialization, educ_start_date, educ_end_date, 
    work_id, employer, title, work_desc, work_start_date, work_end_date, 
    acc_id, position, org, contribution, acc_desc,
    pub_id, publication, citation, url, coauthors_dpsm, coauthors_nondpsm, date_published, 
    rg_id, research, sponsor,amount_granted, projected_start, projected_end,actual_start, actual_end, progress, coresearchers_dpsm, coresearchers_nondpsm, le_id, name_exam, rank, license_number, date,
    ts_id, name_training, role, remarks, ts_start_date, ts_start_date
    ){

    $('#faculty_name').html('<b>'+first_name+' '+last_name+'</b>');

    // Educational Attainment
    if(educ_id != '') {
        $('#educ_count').html('1');
        $('#pendingEduc').show();
        $('#emptyEducMsg').hide();
    } else {
        $('#educ_count').html('');
        $('#pendingEduc').hide();
        $('#emptyEducMsg').show();
    }
    $('#school').html(school);
    $('#degree').html(degree);
    $('#degree_type').html(degree_type);
    $('#specialization').html(specialization);
    $('#educ_start_date').html(educ_start_date);
    $('#educ_end_date').html(educ_end_date);

    $('#acceptEduc').click(function(){toggle_approve_reject_modal("modal_approve", 'educ', educ_id, user_id)})
    $('#rejectEduc').click(function(){toggle_approve_reject_modal("modal_reject", 'educ', educ_id, user_id)})

    // Work Experience
    if(work_id != '') {
        $('#work_count').html('1');
        $('#pendingWork').show();
        $('#emptyWorkMsg').hide();
    } else {
        $('#work_count').html('');
        $('#pendingWork').hide();
        $('#emptyWorkMsg').show();
    }
    $('#name_employer').html(employer);
    $('#title').html(title);
    $('#work_description').html(work_desc);
    $('#work_start_date').html(work_start_date);
    $('#work_end_date').html(work_end_date);

    $('#acceptWork').click(function(){toggle_approve_reject_modal("modal_approve", 'work', work_id, user_id)})
    $('#rejectWork').click(function(){toggle_approve_reject_modal("modal_reject", 'work', work_id, user_id)})

    // Accomplishment
    if(acc_id != '') {
        $('#acc_count').html('1');
        $('#pendingAcc').show();
        $('#emptyAccMsg').hide();
    } else {
        $('#acc_count').html('');
        $('#pendingAcc').hide();
        $('#emptyAccMsg').show();
    }
    $('#position').html(position);
    $('#organization').html(org);
    $('#type_contribution').html(contribution);
    $('#acc_description').html(acc_desc);

    $('#acceptAcc').click(function(){toggle_approve_reject_modal("modal_approve", 'acc', acc_id, user_id)})
    $('#rejectAcc').click(function(){toggle_approve_reject_modal("modal_reject", 'acc', acc_id, user_id)})

    // Publication
    if(pub_id != '') {
        $('#pub_count').html('1');
        $('#pendingPub').show();
        $('#emptyPubMsg').hide();
    } else {
        $('#pub_count').html('');
        $('#pendingPub').hide();
        $('#emptyPubMsg').show();
    }
    $('#publication').html(publication);
    $('#citation').html(citation);
    $('#url').html(url);
    $('#coauthors_dpsm').html(coauthors_dpsm);
    $('#coauthors_nondpsm').html(coauthors_nondpsm);
    $('#date_published').html(date_published);

    $('#acceptPub').click(function(){toggle_approve_reject_modal("modal_approve", 'pub', pub_id, user_id)})
    $('#rejectPub').click(function(){toggle_approve_reject_modal("modal_reject", 'educ', pub_id, user_id)})

    // Research Grant
    if(rg_id != '') {
        $('#rg_count').html('1');
        $('#pendingRG').show();
        $('#emptyRGMsg').hide();
    } else {
        $('#rg_count').html('');
        $('#pendingRG').hide();
        $('#emptyRGMsg').show();
    }

    $('#name_research').html(research);
    $('#sponsor').html(sponsor);
    $('#amount_granted').html(amount_granted);
    $('#projected_start').html(projected_start);
    $('#projected_end').html(projected_end);
    $('#actual_start').html(actual_start);
    $('#actual_end').html(actual_end);
    $('#research_progress').html(progress);
    $('#coresearchers_dpsm').html(coresearchers_dpsm);
    $('#coresearchers_nondpsm').html(coresearchers_nondpsm);

    $('#acceptRG').click(function(){toggle_approve_reject_modal("modal_approve", 'rg', rg_id, user_id)})
    $('#rejectRG').click(function(){toggle_approve_reject_modal("modal_reject", 'rg', rg_id, user_id)})

    // Licensure Exam
    if(le_id != '') {
        $('#le_count').html('1');
        $('#pendingLE').show();
        $('#emptyLEMsg').hide();
    } else {
        $('#le_count').html('');
        $('#pendingLE').hide();
        $('#emptyLEMsg').show();
    }

    $('#name_exam').html(name_exam);
    $('#rank').html(rank);
    $('#license_number').html(license_number);
    $('#date').html(date);

    $('#acceptLE').click(function(){toggle_approve_reject_modal("modal_approve", 'le', le_id, user_id)})
    $('#rejectLE').click(function(){toggle_approve_reject_modal("modal_reject", 'le', le_id, user_id)})

    // Training/Seminar
    if(ts_id != '') {
        $('#ts_count').html('1');
        $('#pendingTS').show();
        $('#emptyTSMsg').hide();
    } else {
        $('#ts_count').html('');
        $('#pendingTS').hide();
        $('#emptyTSMsg').show();
    }

    $('#name_training').html(name_training);
    $('#role').html(role);
    $('#remarks').html(remarks);
    $('#ts_start_date').html(ts_start_date);
    $('#ts_end_date').html(ts_end_date);

    $('#acceptTS').click(function(){toggle_approve_reject_modal("modal_approve", 'ts', ts_id, user_id)})
    $('#rejectTS').click(function(){toggle_approve_reject_modal("modal_reject", 'ts', ts_id, user_id)})

    
    $('#pendingModal').modal('toggle');
} 

/* UNIT HEAD: Approve Information */
function unit_head_approve_pending_info(){
    var info_data = new FormData();

    info_data.append('id', $('#approved_id').html());
    info_data.append('type', $('#approved_type').html());
    
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
        url: "/unit_head/pending_approvals",
        processData: false,
        contentType: false,
        data: info_data,
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


/* UNIT HEAD: Reject Pending Info */
function unit_head_reject_pending_info(){
    var reject_data = new FormData();

    reject_data.append('remarks', $('#rejected_remarks').val());
    reject_data.append('user_id', $('#rejected_user_id').html());
    reject_data.append('id', $('#rejected_id').html());
    reject_data.append('type', $('#rejected_type').html());
    
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
        url: "/unit_head/pending_approvals",
        processData: false,
        contentType: false,
        data: reject_data,
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



/* DEPT CHAIR: Approve Information */
function dept_chair_approve_pending_info(){
    var info_data = new FormData();

    info_data.append('id', $('#approved_id').html());
    info_data.append('type', $('#approved_type').html());
    
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
        url: "/department_chair/pending_approvals",
        processData: false,
        contentType: false,
        data: info_data,
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

/* DEPT CHAIR: Reject Pending Info */
function dept_chair_reject_pending_info(){
    var reject_data = new FormData();

    reject_data.append('remarks', $('#rejected_remarks').val());
    reject_data.append('user_id', $('#rejected_user_id').html());
    reject_data.append('id', $('#rejected_id').html());
    reject_data.append('type', $('#rejected_type').html());
    
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
        url: "/department_chair/pending_approvals",
        processData: false,
        contentType: false,
        data: reject_data,
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



