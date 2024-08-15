document.addEventListener("DOMContentLoaded", function() {
    updateSubjectList();
    updateTeacherList();
});

document.getElementById('teacher-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Clear previous error messages
    clearErrors();

    // Custom validation
    let valid = true;

    // Validate Name
    const name = document.getElementById('teacher-name');
    if (name.value.trim() === '') {
        showError('teacher-name-error');
        valid = false;
    }

    // Validate Code
    const code = document.getElementById('teacher-code');
    if (code.value.trim() === '') {
        showError('teacher-code-error');
        valid = false;
    }

    // Validate Phone
    const phone = document.getElementById('teacher-phone');
    if (phone.value.trim() === '' || !/^\d{10,11}$/.test(phone.value)) {
        showError('teacher-phone-error');
        valid = false;
    }

    // Validate Certificate (اختصاص)
    const certificate = document.getElementById('teacher-certificate');
    if (certificate.value === '') {
        showError('teacher-certificate-error');
        valid = false;
    }

    // Validate Jurisdiction
    const jurisdiction = document.getElementById('teacher-jurisdiction');
    if (jurisdiction.value.trim() === '') {
        showError('teacher-jurisdiction-error');
        valid = false;
    }

    // Validate Gender (ڕەگەز)
    const genderMale = document.getElementById('teacher-gender-male');
    const genderFemale = document.getElementById('teacher-gender-female');
    if (!genderMale.checked && !genderFemale.checked) {
        showError('teacher-gender-error');
        valid = false;
    }

    // Validate Emergency Phone
    const emergencyPhone = document.getElementById('teacher-emergency-phone');
    if (emergencyPhone.value.trim() === '') {
        showError('teacher-emergency-phone-error');
        valid = false;
    }

    // Validate Working Share
    const workingShare = document.getElementById('teacher-working-share');
    if (workingShare.value.trim() === '') {
        showError('teacher-working-share-error');
        valid = false;
    }

    // Validate School
    const school = document.getElementById('teacher-school');
    if (school.value.trim() === '') {
        showError('teacher-school-error');
        valid = false;
    }

    if (valid) {
        // If valid, proceed with form submission or further processing
        const formData = new FormData(e.target);
        const teacher = {
            name: formData.get('name'),
            code: formData.get('code'),
            phone: formData.get('phone'),
            certificate: formData.get('certificate'),
            jurisdiction: formData.get('jurisdiction'),
            gender: formData.get('gender'),
            email: formData.get('email') || null,
            emergency_phone: formData.get('emergency_phone'),
            working_share: formData.get('working_share'),
            school: formData.get('school'),
            picture: formData.get('picture') ? URL.createObjectURL(formData.get('picture')) : null,
            cv: formData.get('cv') ? URL.createObjectURL(formData.get('cv')) : null
        };

        teachers.push(teacher);

        // Update the teacher list
        updateTeacherList();

        // Reset form and hide modal
        e.target.reset();
        var myModalEl = document.getElementById('addTeacherModal');
        var modal = bootstrap.Modal.getInstance(myModalEl);
        modal.hide();
    }
});

function showError(id) {
    document.getElementById(id).classList.remove('d-none');
}

function clearErrors() {
    const errorMessages = document.querySelectorAll('.text-danger');
    errorMessages.forEach(error => {
        error.classList.add('d-none');
    });
}

const subjects = [
    { name: "بیرکاری", code: "MAT101", level: "سەرەتایی" },
    { name: "فیزیا", code: "PHY102", level: "بنەڕەتی" },
    { name: "کیمییا", code: "CHE103", level: "ئامادەیی" },
    { name: "زیندەزانی", code: "INF104", level: "سەرەتایی" },
    { name: "کوردی", code: "BIO105", level: "بنەڕەتی" }
];

const teachers = [
    { name: "شوان بەرزنجی", code: "AL001", phone: "07701239898", certificate: "بەکالۆریۆس", jurisdiction: "بیرکاری", gender: "کوڕ", email: "shwana@example.com", employed_since: "2020", school: "ئامادەیی سلێمانی کوڕان", picture: "https://via.placeholder.com/150", emergency_phone: "0776543214", working_share: "50%" },
    { name: "ئاشتی موحەممەد", code: "AS002", phone: "07701239898", certificate: "دبلؤم", jurisdiction: "پەیمانگە", gender: "کچ", email: "ashti@example.com", employed_since: "2019", school: "مەکتەبی ئەزمەڕ", picture: "https://via.placeholder.com/150", emergency_phone: "0776543214", working_share: "45%" }
];

function updateSubjectList() {
    const subjectList = document.getElementById('subject-list');
    subjectList.innerHTML = subjects.map((subject, index) => `
        <div class="col-md-4 mb-4">
            <div class="card border-0 shadow-sm">
                <div class="card-body">
                    <h5 class="card-title">${subject.name}</h5>
                    <p class="card-text"><strong>کۆد:</strong> ${subject.code}</p>
                    <p class="card-text"><strong>ئاست:</strong> ${subject.level}</p>
                    <div class="d-flex justify-content-between">
                        <button class="btn btn-warning btn-sm" onclick="editSubject(${index})">گۆڕین</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteSubject(${index})">سڕینەوە</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function updateTeacherList() {
    const teachersList = document.getElementById('teachers-list');
    teachersList.innerHTML = teachers.map((teacher, index) => `
        <div class="col-md-4 mb-4">
            <div class="card border-0 shadow-sm">
                <img src="${teacher.picture}" class="card-img-top" alt="وێنەی مامۆستا">
                <div class="card-body">
                    <h5 class="card-title">${teacher.name}</h5>
                    <p class="card-text"><strong>ژمارەی مۆبایل:</strong> ${teacher.phone}</p>
                    <p class="card-text"><strong>کۆد:</strong> ${teacher.code}</p>
                    <p class="card-text"><strong>اختصاص:</strong> ${teacher.certificate}</p>
                    <p class="card-text"><strong>بەش:</strong> ${teacher.jurisdiction}</p>
                    <p class="card-text"><strong>ڕەگەز:</strong> ${teacher.gender}</p>
                    <p class="card-text"><strong>ژمارەی فۆن لە کەسایەتییەکان:</strong> ${teacher.emergency_phone}</p>
                    <p class="card-text"><strong>بەشێک لە کارپێکردن:</strong> ${teacher.working_share}</p>
                    <p class="card-text"><strong>پەیمانگەی کارپێکردن:</strong> ${teacher.school || '----'}</p>
                    <button class="btn btn-warning btn-sm" onclick="editTeacher(${index})">گۆڕین</button>
                </div>
            </div>
        </div>
    `).join('');
}

function editTeacher(index) {
    const teacher = teachers[index];
    
    // Set form fields with the teacher's data
    document.getElementById('teacher-name').value = teacher.name;
    document.getElementById('teacher-code').value = teacher.code;
    document.getElementById('teacher-phone').value = teacher.phone;
    document.getElementById('teacher-certificate').value = teacher.certificate;
    document.querySelector(`input[name="gender"][value="${teacher.gender}"]`).checked = true;
    document.getElementById('teacher-email').value = teacher.email || '';
    document.getElementById('teacher-school').value = teacher.school || '';
    document.getElementById('teacher-emergency-phone').value = teacher.emergency_phone;
    document.getElementById('teacher-working-share').value = teacher.working_share;

    // Open the modal
    var myModalEl = document.getElementById('addTeacherModal');
    var modal = new bootstrap.Modal(myModalEl);
    modal.show();
}

function updateSubjectDropdown() {
    const subjectSelect = document.getElementById('teacher-subject');
    subjectSelect.innerHTML = `<option selected disabled>بەشەکەت هەلبژێرە</option>` +
        subjects.map((subject, index) => `<option value="${index}">${subject.name} - ${subject.code}</option>`).join('');
}

function editSubject(index) {
    const subject = subjects[index];
    document.getElementById('edit-subject-name').value = subject.name;
    document.getElementById('edit-subject-code').value = subject.code;
    document.getElementById('edit-subject-level').value = subject.level;
    document.getElementById('edit-subject-index').value = index;

    var editModalEl = document.getElementById('editSubjectModal');
    var modal = new bootstrap.Modal(editModalEl);
    modal.show();
}

function deleteSubject(index) {
    const isUsed = teachers.some(teacher => teacher.subjects && teacher.subjects.includes(index));
    if (isUsed) {
        alert("ناتوانرێت بەرز بکەیتەوە چونکە ئەم وانەیە بە مامۆستاێکی تۆمارکراوە.");
    } else {
        subjects.splice(index, 1);
        updateSubjectList();
        updateSubjectDropdown();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const employedYes = document.getElementById('employed-yes');
    const employedNo = document.getElementById('employed-no');
    const schoolNameSection = document.getElementById('school-name-section');

    employedYes.addEventListener('change', function() {
        if (this.checked) {
            schoolNameSection.classList.remove('d-none');
            document.getElementById('teacher-school').setAttribute('required', 'required');
        }
    });

    employedNo.addEventListener('change', function() {
        if (this.checked) {
            schoolNameSection.classList.add('d-none');
            document.getElementById('teacher-school').removeAttribute('required');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const certificateSection = document.getElementById('certificate-section');

    certificateSection.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('add-certificate')) {
            addCertificateInput();
        } else if (e.target && e.target.classList.contains('remove-certificate')) {
            e.target.closest('.certificate-input').remove();
        }
    });

    function addCertificateInput() {
        const newCertificateInput = document.createElement('div');
        newCertificateInput.classList.add('certificate-input', 'mb-3');
        newCertificateInput.innerHTML = `
            <input type="text" class="form-control mb-2" name="certificate[]" placeholder="اختصاص بنووسە">
            <button type="button" class="btn btn-danger btn-sm remove-certificate">سڕینەوە</button>
        `;
        certificateSection.appendChild(newCertificateInput);
    }
});
