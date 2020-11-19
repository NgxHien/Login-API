$(document).ready(function () {
    customer = new customerJS();
    
})


/**
 * Object JS quản lý sự kiện cho trang
 */
var mode = true;

class customerJS {
    constructor() {
        var me = this;
        me.loadData();
        me.initEvents();
      
        me.mode = true;
    }

    /**
     * Thực hiện gán sự kiện cho các thành phần 
     *  CREATED BY NQTRUNG (20/7/2020)
     */
    initEvents() {
        $('#btnAdd').on("click", Enum.FormMode.Add, this.ToolbarItemOnClick.bind(this));
        $('#btnEdit').on("click", Enum.FormMode.Edit, this.ToolbarItemOnClick.bind(this));
        $('#btnDelete').on("click", Enum.FormMode.Delete, this.ToolbarItemOnClick.bind(this));
        $('#btnDuplicate').on("click", Enum.FormMode.Duplicate, this.ToolbarItemOnClick.bind(this));
        $('#btnCancel').click(this.btnCancelOnClick);
        $('#btnCloseHeader').click(this.btnCloseHeaderOnClick);
        $('#btnSave').click(this.saveMode.bind(this));
        $('#imgProfile').change(this.readURL);//TODO:
        $("#tableListCustomer").on("click", "tbody tr", this.rowOnclick);
        $('.searchBy').on("keyup", this.searchRecord);
       


    }
    //searchMode() {
      
    //    $('#sName').on("keyup", Enum.Search.Name,  this.searchRecord);
    //    $('#sBirthday').on("keyup", Enum.Search.Birthday ,this.searchRecord);
    //    $('#sPhone').on("keyup", Enum.Search.Phone, this.searchRecord);
    //    $('#sEmail').on("keyup", Enum.Search.Email ,this.searchRecord);
    //    $('#sAddress').on("keyup", Enum.Search.Address ,this.searchRecord);
    //    $('#sCompany').on("keyup", Enum.Search.Company,this.searchRecord);
    //    $('#sTaxCode').on("keyup", Enum.Search.TaxCode, this.searchRecord);
    //    $('#sDebit').on("keyup", Enum.Search.Debit, this.searchRecord);
    //}

   /**Hàm tìm kiếm theo từng cột
    * Created by NQTrung (06/08/2020)
    * */
    searchRecord() {
        //var val = $(this).val();
        //$("#myTable td.col1:contains('" + $(this).val() + "')").parent().show();
        //$("#myTable td.col1:not(:contains('" + $(this).val() + "'))").parent().hide();
        
        var id = $(this)[0].id;
        var searchMode = null;
        switch (id) {
            case "sCode":
                searchMode = 0;
                break;
            case 'sName':
                searchMode = 1;  
                break;
            case 'sBirthday':
                searchMode = 2;
                break;
            case 'sPhone':
                searchMode = 3;
                break;
            case 'sEmail':
                searchMode = 4;
                break;
            case 'sAddress':
                searchMode = 5;
                break;
            case 'sCompany':
                searchMode = 6;
                break;
            case 'sTaxCode':
                searchMode = 7;
                break;
            case 'sDebit':
                searchMode = 8;
                break;
            

        }

       
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById(id);
        filter = input.value.toUpperCase();
        table = document.getElementById('myTable');
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[searchMode];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) < 0) {
                    tr[i].style.display = "none";
                } else {
                    tr[i].style.display = "";
                }
            }
        }
    }

    /**
     * Hiển thị Dialog theo chức năng
     * @param {any} sender
     * Created by NQTrung 29/07/2020
     */

    ToolbarItemOnClick(sender) {
        try {

            switch (sender.data) {
                case Enum.FormMode.Add:
                    this.btnAddOnClick();
                    this.showDialog();
                    mode = true;
                    break;
                case Enum.FormMode.Edit:
                    this.btnEditOnClick();
                    mode = false;
                    break;
                case Enum.FormMode.Delete:
                    this.btnDeleteOnClick();
                    break;
                case Enum.FormMode.Duplicate:
                    
                    this.btnDupOnClick();
                   
                    mode = true;
                    break;
            }


        } catch (e) {
            console.log(e);
        }
    }
    /** Hàm Lựa chọn cách cất dữ liệu (Thêm mới/Sửa)
     * Created by NQTrung 30/7/2020
     * */
    saveMode() {
        if (mode) {

            return this.SaveData();
        } else {
            return this.EditData();
        }
    }

    /** Hàm hiện Dialog* */

    showDialog() {
        $("#frmDialogDetail").show();
    }
    hideDialog() {
        $("#frmDialogDetail").hide();
    }
    hideToolbarButton() {
        $('#btnEdit').prop('disabled', 'disabled');
        $('#btnDelete').prop('disabled', 'disabled');
        $('#btnDuplicate').prop('disabled', 'disabled');
    }
    showToolbarButton() {
        $('#btnEdit').removeAttr('disabled');
        $('#btnDelete').removeAttr('disabled');
        $('#btnDuplicate').removeAttr('disabled');
    }

    /** Lấy Url Ảnh để hiển thị file ảnh được chọn */
    readURL() {

        var reader = new FileReader();
        reader.onload = function () {
            var output = document.getElementById('imgUrl');
            output.src = reader.result;
        };
        reader.readAsDataURL(event.target.files[0]);
    }
    /** Lấy dữ liệ từ form khi nhập liệu
     * Created by NQTrung (05/08/2020)
     **/
    getDataFromDialog() {
        try {
            var cus = {};
            if (!this.ValidateForm()) {

                return false;
            }
            //cus.CustomerId = $('.row-selected').data("id");
            cus.CustomerCode = $('#txtCustomerCode').val();
            cus.CustomerName = $('#txtCustomerName').val();
            cus.Birthday = $('#txtBirthday').val();
            cus.PhoneNumber = $('#txtPhoneNumber').val();
            cus.Email = $('#txtEmail').val();
            cus.Address = $('#txtAddress').val();
            cus.CompanyName = $('#txtCompanyName').val();
            cus.Taxcode = $('#txtTaxCode').val();
            cus.DebitAmount = $('#txtDebitAmount').val();
            cus.Is5FoodMember = $('#is5Food').is(":checked");
            
            return cus;
        } catch (e) {
            console.log(e);
        }
        

    }
    /**
     * Validate dữ liệu trên form
     * Created by NQTrung (04/08/2020)
     * */
    ValidateForm() {
        var customercode = $('#txtCustomerCode').val() ? $('#txtCustomerCode').val() : false;
        var customername = $('#txtCustomerName').val() ? $('#txtCustomerName').val() : false;
        if (!customercode) {
            alert("Error");
            return false;

        } else if (!customername) {
            alert("Name lost");
            return false;
        }
        return true;
    }
    /** Sự kiên xảy ra khi click vào một dòng 
     * Created by NQTrung (22/7/2020)
     * */
    rowOnclick() {

        $(this).addClass("row-selected");
        $(this).siblings().removeClass("row-selected");
        $('#btnEdit').removeAttr('disabled');
        $('#btnDelete').removeAttr('disabled');
        $('#btnDuplicate').removeAttr('disabled');
    }
    /**
     * Sự kiện khi ấn vào nút Hủy bỏ
     * Created by NQTrung (22/7/2020)
     * */
    btnCancelOnClick() {
        $("#frmDialogDetail").hide();
    }
    /**Sự kiên xảy ra khi ấn vào dấu x bên trên form
     * Created by NQTrung (22/7/2020)
     * */
    btnCloseHeaderOnClick() {
        $("#frmDialogDetail").hide();
    }
    /** Sự kiên xảy ra khi ấn vào nút delete
     * Created by NQTrung (22/7/2020)
     * */
    btnDeleteOnClick() {
        //$('.row-selected').remove();
        var me = this;
        var customerId = $('.row-selected').data("id");
        if (customerId) {
            $.ajax({
                url: "/api/Customers/" + customerId,
                method: "DELETE",
            }).done(function (res) {
                me.loadData();
            }).fail(function (res) {

            }
            )
        } else {
            alert(Resource.Language.VI.NotChoose);
        }

    }
    /**  Sự kiện khi Click vào button thêm mới
     *    Created by NQTrung (22/7/2020)
     */
    btnAddOnClick() {
        $('#frmDialogDetail input').val("");
        $("#frmDialogDetail input[type='checkbox']").prop("checked", false);
        $('#frmDialogDetail input[type="file"]').val("");
        $('#imgUrl').removeAttr('src');
    }
    /**Sự kiện khi click vào nút duplicate 
     Created by NQTrung (05/08/2020)
     
     */
    btnDupOnClick() {
        try {
            var me = this;
            var customerId = $('.row-selected').data("id");
            if (!customerId) {
                alert(Resource.Language.VI.NotChoose);
                return;
            }
            $.ajax({
                url: "/api/Customers/" + customerId,
                method: "GET",
                data: {},
                dataType: "json",
                contentType: "application/json",
            }).done(function (response) {
                if (!response) {
                    alert(Resource.Language.VI.Error);
                } else {
                    /** Binding dữ liệu lên form dựa theo customerId của hàng được chọn*/

                    $('#txtCustomerCode').val('');
                    $('#txtCustomerName').val(response.CustomerName);
                    $('#txtBirthday').val(commonJS.formatDatetoShow(response.Birthday));
                    $('#txtPhoneNumber').val(response.PhoneNumber);
                    $('#txtEmail').val(response.Email);
                    $('#txtAddress').val(response.Address);
                    $('#txtCompanyName').val(response.CompanyName);
                    $('#txtTaxCode').val(response.Taxcode);
                    $('#txtDebitAmount').val(response.DebitAmount);
                    $('#is5Food').val(response.Is5foodMember);
                    $('#imgUrl').attr('src', response.Image);
                    //$('#imgProfile').val( response.Image);
                    me.showDialog();
                }
            }).fail(function (response) {
                alert("fail");
            })

        } catch (e) {
            alert(e);
        }

    }
    /** SỰ kiện xảy ra khi Click vào nút Sửa
     * Created by NQTrung (27/7/2020)
     * */
    btnEditOnClick() {
        try {
            var me = this;
            var customerId = $('.row-selected').data("id");
            if (!customerId) {
                alert(Resource.Language.VI.NotChoose);
                return;
            } 
            $.ajax({
                url: "/api/Customers/" + customerId,
                method: "GET",
                data: {},
                dataType: "json",
                contentType: "application/json",
            }).done(function (response) {
                if (!response) {
                    alert(Resource.Language.VI.Error);
                } else {
                /** Binding dữ liệu lên form dựa theo customerId của hàng được chọn*/
                    
                    $('#txtCustomerCode').val(response.CustomerCode);
                    $('#txtCustomerName').val(response.CustomerName);
                    $('#txtBirthday').val(commonJS.formatDatetoShow(response.Birthday));
                    $('#txtPhoneNumber').val(response.PhoneNumber);
                    $('#txtEmail').val(response.Email);
                    $('#txtAddress').val(response.Address);
                    $('#txtCompanyName').val(response.CompanyName);
                    $('#txtTaxCode').val(response.Taxcode);
                    $('#txtDebitAmount').val(response.DebitAmount);
                    $('#is5Food').val(response.Is5foodMember);
                    $('#imgUrl').attr('src', response.Image);
                    //$('#imgProfile').val( response.Image);
                    me.showDialog();
                }
            }).fail(function (response) {
                alert("fail");
            })

        } catch (e) {
            alert(e);
        }
    }
    /** Sự kiện xảy ra khi click vào nút Cất và thêm 
     * Created by NQTrung (22/7/2020)
     *  */
    EditData() {
        var me = this;
        var customerId = $('.row-selected').data("id");
        /** Thu thâp thông tin trên form khi đã chỉnh sửa */
        if (me.ValidateForm() == false) {
            return;
        } else {
            var customer = me.getDataFromDialog();
            customer.CustomerId = customerId;
            if (!customer) return;
              
        $.ajax({
            url: "/api/Customers/" + customerId,
            method: "PUT",
            data: JSON.stringify(customer),
            dataType: "text",
            contentType:"application/json",
        }).done(function (response) {
            me.loadData();
            me.hideToolbarButton();
                $("#frmDialogDetail").hide();
           
        }).fail(function (response) {
            alert(1);
        })
        }
        
        
    }
    /**
      * Lưu dữ liệu - thêm mới một bản ghi 
      * @param {any} sender
      * Created by NQTrung (22/07/2020)
      */ 
    
    SaveData(sender) {
        //validate dữ liệu
        var me = this;
        if (me.ValidateForm() == false) {
            return;
        } else {
            var cus = me.getDataFromDialog();
            if (!cus) return;
            $.ajax({
                url: "/api/Customers",
                method: "POST",
                data: JSON.stringify(cus),
                dataType: "text",
                contentType: "application/json",
            }).done(function (response) {
                me.loadData();
                me.hideToolbarButton();
            }).fail(function (response) {
                alert("fail");
            }).always(function () {

            })
            $("#frmDialogDetail").hide();
        }
        
       
        }
    /**
    * Lấy dữ liệu về 
    * đọc dữ liệu và gen dữ liệu từng khách hàng với html
    * Created by NQTrung (20/7/2020)
    */
    loadData() {
        try {

           
            $('#tableListCustomer tbody').empty();
            $.ajax({
                url: "/api/Customers" ,
                method: "GET",
                data: { },
                dataType: "json",
                contentType: "application/json",
            }).done(function (response) {
                if (response) {
                    $.each(response, function (index, item) {
                        
                        var customerIndex = $(`<tr>
                             <td alt="text">`+ item['CustomerCode'] + `</td>
                             <td>`+ item['CustomerName'] + `</td>
                             <td>`+ commonJS.formatDate(item['Birthday']) + `</td>
                             <td>`+ item['PhoneNumber'] + `</td>
                             <td>`+ item['Email']+`</td>
                             <td>`+ item['Address'] +`</td>
                             <td>`+ item['CompanyName'] +`</td>
                             <td>`+ item['Taxcode'] +`</td>
                             <td>`+ commonJS.formatMoney(item['DebitAmount']) + `</td>
                             <td >`+ commonJS.buildCheckBoxByValue(item['Is5FoodMember']) + `</td>
                                 </tr>`);
                        customerIndex.data("id", item["CustomerId"]);
                        
                        $('#tableListCustomer tbody').append(customerIndex);
                        
                    })
                }
            }).fail(function (response) {
                alert("fail");
            })

        } catch (e) {
            alert(e);
        }
    }


}


///**
//     * Hiển thị popup theo các yêu cầu
//     * @param {any} msg
//     * Created by NQTrung (12/08/2020)
//     */
//showPopUp(msg) {
//    switch (msg) {
//        //case 'Xóa': {
//        //    $('.popup-confirm').show();
//        //    $('#text-popup').text('Bạn có Chắc chắn muốn xóa');
//        //    $('#imgChange').attr('src', '/content/images/hoiPNG.PNG')
//        //    break;
//        //} 
//        case 'Code': {
//            $('.popup-confirm').show();
//            $('#text-popup').text('Bạn chưa nhập Mã nhân viên');
//            $('#imgchange').attr('src', '/content/images/warning.PNG')
//            $('#denypopup').hide();
//            break;
//        }
//        case 'Name': {
//            $('.popup-confirm').show();
//            $('#text-popup').text('Bạn chưa nhập Tên nhân viên');
//            $('#imgchange').attr('src', '/content/images/warning.PNG')
//            $('#denypopup').hide();
//            break;
//        }
//        case 'Email': {
//            $('.popup-confirm').show();
//            $('#text-popup').text('Bạn chưa nhập Email');
//            $('#imgchange').attr('src', '/content/images/warning.PNG')
//            $('#denypopup').hide();
//            break;
//        }
//        case 'Phone': {
//            $('.popup-confirm').show();
//            $('#text-popup').text('Bạn chưa nhập Số điện thoại');
//            $('#imgchange').attr('src', '/content/images/warning.PNG')
//            $('#denypopup').hide();
//            break;
//        }


//    }
//}