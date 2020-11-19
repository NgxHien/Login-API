var commonJS = {
    /**
    * Hàm định dạng hiển thị tiền
    * @param {number} money
    */
    formatMoney(money,x) {
        if (money != null) {
            money = Math.floor(money);   
            if (x == 1) return money;
            return money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        }else return '0';
       
    },
    /**
     * Hàm định dạng tiền để lấy kết quả từ form
     * @param {any} money
     */
    formatMoneyToNum(money) {
        var reg = /\./g;
        money = parseFloat(money.replace(reg, ''));
        return money;
    },

    /**
    * Tạo chuỗi HTML checkbox tương ứng với trư/false
    * @param {boolean} value true: checked
    */
    buildCheckBoxByValue(value) {
        var checkBoxHTML = $(`<input type="checkbox" />`);
        if (value) {
            checkBoxHTML = checkBoxHTML.attr("checked", true);
        }
        return checkBoxHTML[0].outerHTML;
    },
    /**
     * Fomat việc hiển thị ngày tháng
     * @param {string} date 
     */
    formatDate(date) {
        if (!date)
            return '';
        var date = new Date(date);
            var day = date.getDate();
            var month = (date.getMonth() +1);
            var year = date.getFullYear();
            month = (month < 10) ? "0" + month : month;
            day = (day < 10) ? "0" + day : day;
            return day.toString() + '/' + month.toString() + '/' + year.toString();
        
        
        
    },
    /**
     * Hiển thị ngày tháng trên form
     * @param {any} date
     */
    formatDatetoShow(date) {
        var date = new Date(date);
        var day = date.getDate();
        var month = (date.getMonth() + 1) ;
        var year = date.getFullYear();
        month = (month < 10) ? "0" + month : month;
        day = (day < 10) ? "0" + day : day;
        return year.toString() + '-' + month.toString() + '-' + day.toString();
        
    },
    /**
     * HIển thị giới tính
     * @param {any} gender
     */
    formatGender(gender) {
        if (gender == 1) return "Nam";
        if (gender == 0) return "Nữ";
        if (gender == 2) return "Khác";
    },
   
}