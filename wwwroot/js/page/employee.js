$(document).ready(function () {
    employee = new employeeJS();


})
/** Object nhân viên chứa các phương thức, quản lý sự kiện của trang

 * */

class employeeJS {
    /** Hàm khởi tạo */
    constructor() {
        var me = this;
        me.loadData();
        me.initEvents();
        me.keyPressEvent();
        this.TotalRecord = 0; //tổng số bản ghi
        this.PageNum = 1; //index trang
        this.PageSize = 50; //số bản ghi trên 1 trang
        this.TotalPage = 1; //Tổng số page

    }
    /** Các sự kiện được gán cho các nút/ input

     * */
    initEvents() {
        try {

            $('#btnAdd').on("click", Enum.FormMode.Add, this.toolbarItemsOnClick.bind(this));
            $('#btnEdit').on("click", Enum.FormMode.Edit, this.toolbarItemsOnClick.bind(this));
            $('#btnDelete').on("click", Enum.FormMode.Delete, this.toolbarItemsOnClick.bind(this));
            $('#btnDuplicate').on("click", Enum.FormMode.Duplicate, this.toolbarItemsOnClick.bind(this));
            $('#btnSave').click(this.saveMode.bind(this));
            $('#btnSaveAs').click(this.saveAsData.bind(this));

            $('#btnCancel').click(this.btnCancelOnClick);
            $("#tableListEmployee").on("click", "tbody tr", this.rowOnclick);
            $('#btnCloseHeader').click(this.btnCloseHeaderOnClick);
            //$('#myInput').on("keyup", this.searchByWord);
            $('#uploadfile').change(this.readURL);
            $('#denypopup').click(this.btnDenyPopUp);
            $('#allowpopup').click(this.btnAllowPopUp);
            $('#keycheck').click(this.checkAll);
            $('#btnRefresh').click(this.loadData);
            $('#frmDialogDetail input').change(this.removeStyleInputDialog);
            $("#btn-first-page").on("click", Enum.Pagging.FirstPage, this.paggingData.bind(this));
            $("#btn-prev-page").on("click", Enum.Pagging.PreviousPage, this.paggingData.bind(this));
            $("#btn-next-page").on("click", Enum.Pagging.NextPage, this.paggingData.bind(this));
            $("#btn-last-page").on("click", Enum.Pagging.LastPage, this.paggingData.bind(this));
            $("#pagenum").keypress(this.paginationByPageNumberEnter.bind(this));
            $("#sltpagesize").change(this.btnResizeOnClick.bind(this));
            $("#deleteimg").click(this.deleteImg);
        } catch (e) {
            console.log(e);
        }

    }
    /** Sự kiện khi ấn các nút từ bàn phím

     * */
    keyPressEvent() {
        var me = this;

        $(window).bind('keydown', function (event) {
            if (event.ctrlKey || event.metaKey) {

                switch (String.fromCharCode(event.which).toLowerCase()) {
                    case 's':
                        event.preventDefault();
                        me.saveMode();
                        break;
                    case 'q':
                        event.preventDefault();
                        me.btnCancelOnClick();
                        break;
                    case 'f':
                        event.preventDefault();
                        alert('ctrl-f');
                        break;
                }
                if (event.shiftKey) {
                    switch (String.fromCharCode(event.which).toLowerCase()) {
                        case 's':
                            me.saveData();
                            me.btnAddOnClick();
                            break;
                    }


                }


            }
            if (event.which == 27) {
                event.preventDefault();
                me.btnCloseHeaderOnClick();
            }

        });





    }
    /**
     * Hiển thị Dialog theo chức năng
     * @param {any} sender

     */
    toolbarItemsOnClick(sender) {
        try {
            var me = this

            switch (sender.data) {
                case Enum.FormMode.Add:
                    this.btnAddOnClick();
                    me.getNumReCord();

                    this.showDialog();
                    $('#txtEmployeeCode ').focus();
                    mode = true;
                    break;
                case Enum.FormMode.Edit:
                    this.btnEditOnClick();
                    me.showDialog();
                    mode = false;
                    break;
                case Enum.FormMode.Delete:
                    this.btnDeleteOnClick();

                    break;
                case Enum.FormMode.Duplicate:

                    this.btnEditOnClick();

                    me.showDialog();

                    mode = true;
                    break;
            }


        } catch (e) {
            console.log(e);
        }
    }

    /** Điều chỉnh nút Cất 

     * */
    saveMode() {
        if (mode) {
            return this.saveData();
            //$("#frmDialogDetail").hide();
        } else {
            return this.editData();
        }
    }

    /** HIển thị form thông tin nhân viên 

     */
    showDialog() {
        $("#frmDialogDetail").show();
    }

    /** Ẩn form thông tin nhân viên

     * */
    hideDialog() {
        $("#frmDialogDetail").hide();
    }


    /** Ẩn  nút trên toolbar

     * */
    hideToolbarButton() {
        $('#btnEdit').prop('disabled', 'disabled');
        $('#btnDelete').prop('disabled', 'disabled');
        $('#btnDuplicate').prop('disabled', 'disabled');
    }

    /** Hiện  nút trên toolbar

    * */
    showToolbarButton() {
        $('#btnEdit').removeAttr('disabled');
        $('#btnDelete').removeAttr('disabled');
        $('#btnDuplicate').removeAttr('disabled');
    }

    /** Check tất cả các ô checkbox
     *  
     * 
     * */
    checkAll() {
        if ($(this).is(':checked')) {
            $('.idcheck').prop('checked', true);
            $('#tableListEmployee tbody tr').addClass('.row-selected');
        } else $('.idcheck').prop('checked', false);
    }

    /** Chỉnh sửa PageSize 
     * */
    btnResizeOnClick() {
        var me = this;
        me.PageSize = parseInt($('#sltpagesize').val());
        console.log(me.PageSize);
        me.paginationByPageNumberEnter();

    }

    /** Xét avatar mặc định cho input file

     * */
    deleteImg() {

        $('#imgView').attr('src', '/content/images/ava.png');

    }

    /**UP load file Image */
    /** Lấy Url Ảnh để hiển thị file ảnh được chọn */
    readURL() {

        var reader = new FileReader();
        reader.onload = function () {
            var output = document.getElementById('imgView');
            output.src = reader.result;
        };
        reader.readAsDataURL(event.target.files[0]);
    }

    /** Sự kiện khi click vào một hàng

     * */


    rowOnclick() {
        var me = this;
        try {
            multidelete = false;
            if (window.event.ctrlKey) {
                multidelete = true;
                $('#btnEdit,#btnDelete,#btnDuplicate').removeAttr('disabled');
                $(this).addClass('row-selected');
                //$('.row-selected td:nth-child(1) input[type=checkbox]').prop('checked', true);
                var id = $(this).data("id");
                listemployeeid.push(id);
            }
            else {
                multidelete = false;
                listemployeeid = [];
                $('#btnEdit,#btnDelete,#btnDuplicate').removeAttr('disabled');
                if (!$(this).hasClass('row-selected')) {
                    $(this).addClass("row-selected");
                    $(this).siblings().removeClass("row-selected");
                    var id = $(this).data("id");
                    listemployeeid.push(id);
                }
                else {
                    $(this).removeClass("row-selected");
                }
            }
        } catch (e) {
            alert(1);
        }

    }

    /** Sự kiện khi Click vào nút hủy trên Dialog

     * */
    btnCancelOnClick() {
        var res = confirm(Resource.Language.VI.IsCancel);
        if (res) {
            $("#frmDialogDetail").hide();
        }
    }

    /**Sự kiện khi Click vào nút đóng trên góc phải

     * */

    btnCloseHeaderOnClick() {
        $("#frmDialogDetail").hide();
    }
    /**Sự kiện khi Click vào nút Thêm

    * */
    btnAddOnClick() {
        $('#titleDiaglog').text("Thêm mới thông tin nhân viên");
        $('#frmDialogDetail input').val("");
        $('#frmDialogDetail select').val("");
        $("#frmDialogDetail input[type='checkbox']").prop("checked", false);
        $('#frmDialogDetail input[type="file"]').val("");
        $('#imgView').attr('src', '/content/images/ava.png');



        //$('#imgUrl').removeAttr('src');
    }

    /** Xóa các dữ liệu trên form dialog

     * */
    removeFormDialog() {
        $('#frmDialogDetail input').val("");
        $('#frmDialogDetail select').val("");
        $("#frmDialogDetail input[type='checkbox']").prop("checked", false);
        $('#frmDialogDetail input[type="file"]').val("");
    }

    btnDenyPopUp() {
        $('.popup-confirm').hide();
    }
    btnAllowPopUp() {
        $('.popup-confirm').hide();
    }



    /** Validate Email

     * */
    validateEmail(email) {
        const re = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,7}(\.[a-z0-9]{2,4}){1,2}$/gm;
        return re.test(String(email).toLowerCase());
    }

    /** Validate dữ liệu trên form dialog

     * */
    ValidateForm() {
        var me = this;
        var employeecode = $('#txtEmployeeCode').val() ? $('#txtEmployeeCode').val() : false;
        var employeename = $('#txtEmployeeName').val() ? $('#txtEmployeeName').val() : false;
        var email = $('#txtEmail').val() ? $('#txtEmail').val() : false;
        var phonenumber = $('#txtPhoneNumber').val() ? $('#txtPhoneNumber').val() : false;
        var check = me.validateEmail(email);
        if (!employeecode || !employeename || !email || !phonenumber || check == false) {
            if (!employeecode) {
                $('#txtEmployeeCode').addClass('validatedialog');
            }
            if (!employeename) {
                $('#txtEmployeeName').addClass('validatedialog');
            }
            if (!email || check == false) {
                $('#txtEmail').addClass('validatedialog');
            }
            if (!phonenumber) {
                $('#txtPhoneNumber').addClass('validatedialog');
            }

            return false;
        }


        return true;
    }

    /** Xóa cảnh báo khi nhập sai dữ liệu trên form dialog

     * */
    removeStyleInputDialog() {
        var employeecode = $('#txtEmployeeCode').val() ? $('#txtEmployeeCode').val() : false;
        var employeename = $('#txtEmployeeName').val() ? $('#txtEmployeeName').val() : false;
        var email = $('#txtEmail').val() ? $('#txtEmail').val() : false;
        var phonenumber = $('#txtPhoneNumber').val() ? $('#txtPhoneNumber').val() : false;
        if (employeecode) {
            $('#txtEmployeeCode').removeClass('validatedialog');
        }
        if (employeename) {
            $('#txtEmployeeName').removeClass('validatedialog');
        }
        if (email) {
            $('#txtEmail').removeClass('validatedialog');
        }
        if (phonenumber) {
            $('#txtPhoneNumber').removeClass('validatedialog');
        }


    }

    /** Lấy dữ liệu từ Form

     * */
    getDataFromDialog() {
        try {
            var emp = {};
            if (!this.ValidateForm()) {

                return false;
            }
            //emp.EmployeeId = $('.row-selected').data("id");
            emp.EmployeeCode = $('#txtEmployeeCode').val();
            emp.EmployeeName = $('#txtEmployeeName').val();
            emp.Gender = $('#sltGender').val();
            emp.DateOfBirth = $('#txtBirthday').val();
            emp.PhoneNumber = $('#txtPhoneNumber').val();
            emp.Email = $('#txtEmail').val();
            emp.Position = $('#sltPosition').val();
            emp.Department = $('#sltDepartment').val();
            emp.Salary = commonJS.formatMoneyToNum($('#txtSalary').val());
            emp.State = $('#sltState').val();
            emp.Passport = $('#txtPassport').val();
            emp.IssuedBy = $('#txtIssuedBy').val();
            emp.TaxCode = $('#txtTaxCode').val();
            emp.IssuedDate = $('#txtIssuedDate').val();
            emp.JoinDate = $('#txtJoinDate').val();

            return emp;
        } catch (e) {
            console.log(e);
        }


    }

    /** Lấy số lượng bản ghi nhân viên

     * */
    getNumReCord() {
        var me = this;
        try {
            $.ajax({
                url: "/api/Employees/GetNumEmployee/count",
                method: "GET",
                //dataType: 'json',
                //contentType: 'application/json'
            }).done(function (res) {

                var empcode = res;
                var code = `00000${empcode + 1}`.substr(-5);
                $('#txtEmployeeCode').val(`NV${code}`);


            }).fail(function (res) {
                alert(res)
            });
        } catch (e) {
            console.log(e);
        }

    }

    /** Sự kiện khi Click vào nút Sửa

     * */
    btnEditOnClick() {
        try {
            var me = this;
            var employeeId = $('.row-selected').data("id");
            if (!employeeId) {
                alert(Resource.Language.VI.NotChoose);
                return;
            }
            $.ajax({
                url: "/api/Employees/" + employeeId,
                method: "GET",
                data: {},
                dataType: "json",
                contentType: "application/json",
            }).done(function (response) {
                if (!response) {
                    alert(Resource.Language.VI.Error);
                } else {
                    /** Binding dữ liệu lên form dựa theo customerId của hàng được chọn*/
                    $('#txtEmployeeCode').val(response.EmployeeCode);
                    $('#txtEmployeeName').val(response.EmployeeName);
                    $('#sltGender').val(response.Gender);
                    $('#txtBirthday').val(commonJS.formatDatetoShow(response.DateOfBirth));
                    $('#txtPhoneNumber').val(response.PhoneNumber);
                    $('#txtEmail').val(response.Email);
                    $('#sltPosition').val(response.Position);
                    $('#sltDepartment').val(response.Department);
                    $('#txtSalary').val(commonJS.formatMoney(response.Salary));
                    $('#sltState').val(response.State);
                    $('#txtPassport').val(response.Passport);
                    $('#txtIssuedBy').val(response.IssuedBy);
                    $('#txtIssuedDate').val(commonJS.formatDatetoShow(response.IssuedDate));
                    $('#txtTaxCode').val(response.TaxCode);
                    $('#txtJoinDate').val(commonJS.formatDatetoShow(response.JoinDate));
                    if (response.ImageUrl !== null) {
                        $('#imgView').attr('src', `/${response.ImageUrl}`);
                    } else {
                        $('#imgView').attr('src', '/content/images/ava.png');
                    }

                    $('#txtEmployeeCode ').focus();

                }
            }).fail(function (response) {
                alert("fail");
            })

        } catch (e) {
            alert(e);
        }
    }

    /** Sự kiện khi Click vào nút Xóa

     * */
    btnDeleteOnClick() {
        try {
            var me = this;
            if (multidelete == false) {

                var EmployeeId = $('.row-selected').data("id");
                if (EmployeeId) {
                    var result = confirm(Resource.Language.VI.OnlyDelete);
                    if (result) {
                        $.ajax({
                            url: "/api/Employees/" + EmployeeId,
                            method: "DELETE",
                        }).done(function (res) {
                            me.loadData();
                            alert(Resource.Language.VI.Delete);
                            me.hideToolbarButton();
                        }).fail(function (res) {

                        }
                        )
                    }
                } else {
                    alert(Resource.Language.VI.NotChoose);
                }
            } else {
                var result = confirm(Resource.Language.VI.MulDelete);
                if (result) {
                    $.ajax({
                        url: "/api/Employees",
                        data: JSON.stringify(listemployeeid),
                        contentType: 'application/json',
                        method: "DELETE",
                    }).done(function (res) {
                        me.loadData();
                        listemployeeid = [];
                        me.hideToolbarButton();
                    }).fail(function (res) {
                        alert(1);
                    })
                }
            }
        } catch (e) {
            alert(e);
        }


    }

    /** Lưu và chỉnh sửa ảnh
     * 
     * 
     * @param {any} resp đối tượng employee 

     */
    saveImage(resp) {
        try {

            var formdata = new FormData();
            formdata.append('file', $('input[type=file]')[0].files[0]);
            console.log(resp);

            var cid;
            if (resp)
                cid = resp.EmployeeId;
            else
                cid = $('.row-selected').data("id");

            $.ajax({
                url: `/api/employees/${cid}`,
                method: "PATCH",
                data: formdata,
                processData: false,
                contentType: false
            }).done(function (res) {
                //$('#imgView').attr('src',  `/${res.ImageUrl}` );
            }).fail(function (res) {
                alert(Resource.Language.VI.Error);
            }).always(function (res) {

            });
        } catch (e) {

        }
    }
    /** Sửa dữ liệu

     * */
    editData() {
        try {
            var me = this;
            var employeeId = $('.row-selected').data("id");
            /** Thu thâp thông tin trên form khi đã chỉnh sửa */

            if (me.ValidateForm() == false) {
                return;
            } else {
                var emp = me.getDataFromDialog();
                emp.EmployeeId = employeeId;
                if (!emp) return;

                $.ajax({
                    url: `/api/Employees/${employeeId}`,
                    method: "PUT",
                    data: JSON.stringify(emp),
                    dataType: "text",
                    contentType: "application/json",
                }).done(function (response) {
                    if ($('#uploadfile').val()) {
                        var path = response ? JSON.parse(response) : null;
                        me.saveImage(JSON.parse(path));
                    }
                    alert(Resource.Language.VI.Edit);
                    me.loadData();
                    //me.hideToolbarButton();
                    $("#frmDialogDetail").hide();

                }).fail(function (response) {
                    alert(1);
                })
            }
        } catch (e) {
            console.log(e);
        }


    }

    /**
     * Cất dữ liệu
     * @param {any} sender

     */
    saveData(sender) {
        try {
            var me = this;
            if (me.ValidateForm() == false) {


                return;
            } else {
                var emp = me.getDataFromDialog();
                if (!emp) return;
                $.ajax({
                    url: "/api/Employees",
                    method: "POST",
                    data: JSON.stringify(emp),
                    dataType: "text",
                    contentType: "application/json",
                }).done(function (response) {

                    if ($('#uploadfile').val()) {
                        me.saveImage(JSON.parse(response));

                    }

                    alert(Resource.Language.VI.AddNew);
                }).fail(function (response) {
                    alert(Resource.Language.VI.ExistRecord);
                }).always(function () {
                    me.loadData();
                    me.hideToolbarButton();
                })
                $("#frmDialogDetail").hide();
            }

        } catch (e) {
            console.log(e);
        }


    }

    /** Cất và thêm dữ liệu
     * 
     * @param {any} sender

     */
    saveAsData(sender) {
        try {
            var me = this;
            if (me.ValidateForm() == false) {
                return;
            } else {
                var emp = me.getDataFromDialog();
                if (!emp) return;
                $.ajax({
                    url: "/api/Employees",
                    method: "POST",
                    data: JSON.stringify(emp),
                    dataType: "text",
                    contentType: "application/json",
                }).done(function (response) {
                    me.loadData();
                    me.hideToolbarButton();
                    alert(Resource.Language.VI.AddNew);
                }).fail(function (response) {
                    alert("fail");
                }).always(function () {

                })
                me.removeFormDialog();
            }

        } catch (e) {
            console.log(e);
        }


    }

    /**    Phân trang bằng cách nhập vào ô input

     * */
    paginationByPageNumberEnter() {
        $('#tableListEmployee tbody').empty();
        this.PageNum = $("#pagenum").val();
        if (!isNaN(this.PageNum) && this.PageNum != "") {
            if (parseInt(this.PageNum) > parseInt(this.TotalPage)) {
                alert(Resourse.Language.VI.Error);
                return;
            } else {
                $.ajax({
                    url: '/api/employees/Pagging/' + this.PageNum + '/' + this.PageSize,
                    method: "GET",
                    dataType: 'json',
                    contentType: 'application/json'
                }).done(function (res) {
                    $.each(res, function (index, item) {

                        var EmployeeIndex = $(`<tr class="checkable">
                             <td align="center" ><input type='checkbox' class="idcheck" ></td>
                             <td align="left">`+ item['EmployeeCode'] + `</td>
                             <td align="left">`+ item['EmployeeName'] + `</td>
                             <td align="left">`+ commonJS.formatGender(item['Gender']) + `</td>                          
                             <td align="center">`+ commonJS.formatDate(item['DateOfBirth']) + `</td>
                             <td align="left">`+ item['PhoneNumber'] + `</td>
                             <td align="left">`+ item['Email'] + `</td>
                             <td align="left">`+ item['Position'] + `</td>
                             <td align="left">`+ item['Department'] + `</td>                            
                             <td align="right">`+ commonJS.formatMoney(item['Salary']) + `</td>
                             <td align="left">`+ item['State'] + `</td>
                                 </tr>`);
                        EmployeeIndex.data("id", item["EmployeeId"]);
                        EmployeeIndex.data("index", index);
                        //listemployeeid.push(EmployeeIndex.data('id'));
                        $('#tableListEmployee tbody').append(EmployeeIndex);
                    })
                }).fail(function (res) {

                    console.log(res);
                })
            }
        }
    }

    /**
     * Phân trang bảng dữ liệu
     * @param {any} sender

     */
    paggingData(sender) {
        $('#tableListEmployee tbody').empty();
        try {
            if (sender.data === Enum.Pagging.FirstPage) {
                this.PageNum = 1;
                //console.log(this.PageNum);
            } else if (sender.data === Enum.Pagging.NextPage) {
                this.PageNum < this.TotalPage ? this.PageNum++ : this.TotalPage;
                //console.log(this.PageNum);
            } else if (sender.data === Enum.Pagging.PreviousPage) {
                this.PageNum > 1 ? this.PageNum-- : this.PageNum = 1;

                //console.log(this.PageNum);
            } else if (sender.data === Enum.Pagging.LastPage) {
                this.PageNum = this.TotalPage;
                //console.log(this.PageSize);
                //console.log(this.PageNum);               
            }
            $("#pagenum").val(this.PageNum);
            var me = this;
            $.ajax({
                url: '/api/employees/Pagging/' + this.PageNum + '/' + this.PageSize,
                method: "GET",
                dataType: 'json',
                contentType: 'application/json'
            }).done(function (res) {
                $.each(res, function (index, item) {

                    var EmployeeIndex = $(`<tr class="checkable">
                             <td align="center" ><input type='checkbox' class="idcheck" ></td>
                             <td align="left">`+ item['EmployeeCode'] + `</td>
                             <td align="left">`+ item['EmployeeName'] + `</td>
                             <td align="left">`+ commonJS.formatGender(item['Gender']) + `</td>                          
                             <td align="center">`+ commonJS.formatDate(item['DateOfBirth']) + `</td>
                             <td align="left">`+ item['PhoneNumber'] + `</td>
                             <td align="left">`+ item['Email'] + `</td>
                             <td align="left">`+ item['Position'] + `</td>
                             <td align="left">`+ item['Department'] + `</td>                            
                             <td align="right">`+ commonJS.formatMoney(item['Salary']) + `</td>
                             <td align="left">`+ item['State'] + `</td>
                                 </tr>`);
                    EmployeeIndex.data("id", item["EmployeeId"]);
                    EmployeeIndex.data("index", index);
                    //listemployeeid.push(EmployeeIndex.data('id'));
                    $('#tableListEmployee tbody').append(EmployeeIndex);

                });
                if (me.PageNum === me.TotalPage) {
                    var x = me.TotalRecord - (me.PageSize * (me.TotalPage - 1));
                    console.log(x);
                    $('.numberRecordOnpage span').text(x + " trên " + me.TotalRecord);
                }
                else $('.numberRecordOnpage span').text(me.PageSize + " trên " + me.TotalRecord);
            }).fail(function (res) {

                console.log(res);
            });

        } catch (e) {
            alert(e)
        }


    }

    /** Hiển thị dữ liệu lên trang html

     * */
    loadData() {
        try {
            var me = this;

            $('#tableListEmployee tbody').empty();
            $.ajax({
                url: "/api/Employees",
                method: "GET",
                data: {},
                dataType: "json",
                contentType: "application/json",
            }).done(function (response) {
                if (response) {
                    $.each(response, function (index, item) {

                        var EmployeeIndex = $(`<tr class="checkable">
                             <td align="center" ><input type='checkbox' class="idcheck" ></td>
                             <td align="left">`+ item['EmployeeCode'] + `</td>
                             <td align="left">`+ item['EmployeeName'] + `</td>
                             <td align="left">`+ commonJS.formatGender(item['Gender']) + `</td>                          
                             <td align="center">`+ commonJS.formatDate(item['DateOfBirth']) + `</td>
                             <td align="left">`+ item['PhoneNumber'] + `</td>
                             <td align="left">`+ item['Email'] + `</td>
                             <td align="left">`+ item['Position'] + `</td>
                             <td align="left">`+ item['Department'] + `</td>                            
                             <td align="right">`+ commonJS.formatMoney(item['Salary']) + `</td>
                             <td align="left">`+ item['State'] + `</td>
                                 </tr>`);
                        EmployeeIndex.data("id", item["EmployeeId"]);
                        EmployeeIndex.data("index", index);
                        //listemployeeid.push(EmployeeIndex.data('id'));
                        $('#tableListEmployee tbody').append(EmployeeIndex);

                    });

                }
            }).fail(function (response) {
                alert("fail");
            });
            $.ajax({
                url: "/api/Employees/GetNumEmployee/count",
                method: "GET",
                data: {},
                dataType: "json",
                contentType: "application/json",
            }).done(function (response) {
                me.TotalRecord = response;
                me.TotalPage = parseInt(Math.ceil(parseFloat(me.TotalRecord) / parseFloat(me.PageSize)));

                $('#total-page').text("Trên " + me.TotalPage);
                if (me.PageNum == me.TotalPage) {
                    var x = me.TotalRecord - (me.PageSize * (me.TotalPage - 1));
                    console.log(x);
                    $('.numberRecordOnpage span').text(x + " trên " + me.TotalRecord);
                }
                else $('.numberRecordOnpage span').text(me.PageSize + " trên " + me.TotalRecord);
            })

        } catch (e) {
            alert(e);
        }
    }
}
/*** Các cách dùng khác nhau của nút Cất (true-dùng khi thêm;false- dùng khi sửa) */
var mode = true; 
var listemployeeid = [];
var listID = [];
var count = 0;
var multidelete = false;