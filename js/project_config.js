
var project_pid = localStorage.getItem("project_pid");
var project_uid = localStorage.getItem("project_uid");
var project_data = localStorage.getItem("project_data");

console.log("@@@@@@@@@@@@@@@" + project_pid + "@@@@@@@@@@@@@");

var project_token = "/pid/" + project_pid + "/uid/" + project_uid;

var project_server_url = "https://www.xiaotongren.top/design/";


//login url
var cfg_user_login_url = project_server_url + "user_login/main";
var cfg_login_url = project_server_url + "db_option/main" + project_token;

//sensor dynamic curve
var cfg_sensor_dynamic_url = project_server_url + "sensor_monitor.php";
var dynamic_line_request_interval = 2000;

//sensor monitor and control
var cfg_sensor_monitor_url = project_server_url + "sensor_option/main" + project_token;

var cfg_user_monitor_url = project_server_url + "user_option/main" + project_token;

var cfg_data_monitor_url = project_server_url + "data_option/main" + project_token;

var cfg_sensor_record_url = project_server_url + "sensor_record/main" + project_token;

var cfg_rfid_monitor_url = project_server_url + "rfid_option/main" + project_token;

var cfg_message_monitor_url = project_server_url + "message_option/main" + project_token;

var cfg_card_record_url = project_server_url + "card_record/main" + project_token;

var cfg_card_location_url = project_server_url + "card_location/main" + project_token;

//check timeout
var cfg_check_timout_url = project_server_url + "check_permission/check_timeout_value" + project_token;

var cfg_db_option_url = project_server_url + "db_option/main" + project_token;

var cfg_face_id_url = project_server_url + "face/";



//video
var cfg_video_mqtt_server = "wss://mqtt.xiaotongren.top:1885";
var cfg_video_mqtt_username = "student";
var cfg_video_mqtt_passwd = "12345678";
var cfg_video_topic_img_upload = "/student/" + project_pid + "/media/img_upload";
var cfg_video_topic_img_take = "/student/" + project_pid + "/media/img_take";
var cfg_video_topic_video_take = "/student/" + project_pid + "/media/video_take";




//---------------------function-----------------------//


//json数据转excel
function JSONToExcelConvertor(JSONData, FileName) {
    //先转化json
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    var excel = '<table>';
    var row = "<tr>";
    //设置表头
    var keys = Object.keys(JSONData[0]);
    keys.forEach(function (item) {
        row += "<td>" + item + '</td>';
    });
    //换行
    excel += row + "</tr>";
    //设置数据
    for (var i = 0; i < arrData.length; i++) {
        var row = "<tr>";
        for (var index in arrData[i]) {
            console.log(arrData[i][index]);
            //var value = arrData[i][index] === "." ? "" : arrData[i][index];
            row += '<td>' + arrData[i][index] + '</td>';
        }
        excel += row + "</tr>";
    }

    excel += "</table>";

    var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
    excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
    excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel';
    excelFile += '; charset=UTF-8">';
    excelFile += "<head>";
    excelFile += "<!--[if gte mso 9]>";
    excelFile += "<xml>";
    excelFile += "<x:ExcelWorkbook>";
    excelFile += "<x:ExcelWorksheets>";
    excelFile += "<x:ExcelWorksheet>";
    excelFile += "<x:Name>";
    excelFile += "{worksheet}";
    excelFile += "</x:Name>";
    excelFile += "<x:WorksheetOptions>";
    excelFile += "<x:DisplayGridlines/>";
    excelFile += "</x:WorksheetOptions>";
    excelFile += "</x:ExcelWorksheet>";
    excelFile += "</x:ExcelWorksheets>";
    excelFile += "</x:ExcelWorkbook>";
    excelFile += "</xml>";
    excelFile += "<![endif]-->";
    excelFile += "</head>";
    excelFile += "<body>";
    excelFile += excel;
    excelFile += "</body>";
    excelFile += "</html>";

    var uri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile);

    var link = document.createElement("a");
    link.href = uri;

    link.style = "visibility:hidden";
    link.download = FileName + ".xls";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}




function isMobile() {
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)))
        return true;
    else
        return false;
}


function JsonDeepCopy(obj) {
    var txt = JSON.stringify(obj);
    return JSON.parse(txt);
}


function date_to_string(date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    var second = date.getSeconds();
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
};



function config_UI(name) {
    var config_data = JSON.parse(project_data);

    if (config_data == null || config_data == '') {
        console.log("config data is null");
        return;
    }

    console.log(config_data);

    if (name == "sensor_monitor") {
        if (config_data.ui_cfg_pc_sensor_monitor_texiao != null && config_data.ui_cfg_pc_sensor_monitor_texiao != '') {
            console.log(config_data.ui_cfg_pc_sensor_monitor_texiao);
            var script_url = "<script src='../js/texiao/texiao_" + config_data.ui_cfg_pc_sensor_monitor_texiao + ".js'><\/script>";

            console.log("texiao:" + script_url);
            document.write(script_url);

        }

        if (config_data.ui_cfg_pc_sensor_monitor_background != null && config_data.ui_cfg_pc_sensor_monitor_background != '') {

            var temp_url = "url(" + '../img/pc/' + config_data.ui_cfg_pc_sensor_monitor_background + ")";
            console.log(temp_url);
            document.body.style.backgroundImage = temp_url;
        }

        if (config_data.ui_cfg_pc_sensor_monitor_color != null && config_data.ui_cfg_pc_sensor_monitor_color != '') {

            console.log(config_data.ui_cfg_pc_sensor_monitor_color);
            
            if (config_data.ui_cfg_pc_sensor_monitor_color == "random") {
                var colors = ['#CCCCCC', '#FFCCCC', '#FFFFCC', '#0099CC', '#6699CC', '#99CCCC', '#CCCCFF', '#6699CC', '#CCCC99', '#99CCFF', '#FFFFFF', '#66CCCC'];
                var c = Math.floor(Math.random() * 12);
                document.body.style.backgroundColor = colors[c];
            }
            else
            {
                document.body.style.backgroundColor = config_data.ui_cfg_pc_sensor_monitor_color;
            }

        }
    }
    else if (name == "user_manage") {
        if (config_data.ui_cfg_pc_user_manage_texiao != null && config_data.ui_cfg_pc_user_manage_texiao != '') {
            console.log(config_data.ui_cfg_pc_user_manage_texiao);
            var script_url = "<script src='../js/texiao/texiao_" + config_data.ui_cfg_pc_user_manage_texiao + ".js'><\/script>";

            console.log("texiao:" + script_url);
            document.write(script_url);

        }

        if (config_data.ui_cfg_pc_user_manage_background != null && config_data.ui_cfg_pc_user_manage_background != '') {

            var temp_url = "url(" + '../img/pc/' + config_data.ui_cfg_pc_user_manage_background + ")";
            console.log(temp_url);
            document.body.style.backgroundImage = temp_url;
        }

        if (config_data.ui_cfg_pc_user_manage_color != null && config_data.ui_cfg_pc_user_manage_color != '') {

            console.log(config_data.ui_cfg_pc_user_manage_color);
            
            if (config_data.ui_cfg_pc_user_manage_color == "random") {
                var colors = ['#CCCCCC', '#FFCCCC', '#FFFFCC', '#0099CC', '#6699CC', '#99CCCC', '#CCCCFF', '#6699CC', '#CCCC99', '#99CCFF', '#FFFFFF', '#66CCCC'];
                var c = Math.floor(Math.random() * 12);
                document.body.style.backgroundColor = colors[c];
            }
            else
            {
                document.body.style.backgroundColor = config_data.ui_cfg_pc_user_manage_color;
            }

        }
    }
    else if (name == "default") {
        if (config_data.ui_cfg_pc_default_texiao != null && config_data.ui_cfg_pc_default_texiao != '') {
            console.log(config_data.ui_cfg_pc_default_texiao);
            var script_url = "<script src='../js/texiao/texiao_" + config_data.ui_cfg_pc_default_texiao + ".js'><\/script>";

            console.log("texiao:" + script_url);
            document.write(script_url);

        }

        if (config_data.ui_cfg_pc_default_background != null && config_data.ui_cfg_pc_default_background != '') {

            var temp_url = "url(" + '../img/pc/' + config_data.ui_cfg_pc_default_background + ")";
            console.log(temp_url);
            document.body.style.backgroundImage = temp_url;
        }

        if (config_data.ui_cfg_pc_default_color != null && config_data.ui_cfg_pc_default_color != '') {

            console.log(config_data.ui_cfg_pc_default_color);

            if (config_data.ui_cfg_pc_default_color == "random") {
                var colors = ['#CCCCCC', '#FFCCCC', '#FFFFCC', '#0099CC', '#6699CC', '#99CCCC', '#CCCCFF', '#6699CC', '#CCCC99', '#99CCFF', '#FFFFFF', '#66CCCC'];
                var c = Math.floor(Math.random() * 12);
                document.body.style.backgroundColor = colors[c];
            }
            else
            {
                document.body.style.backgroundColor = config_data.ui_cfg_pc_default_color;
            }
            
        }
    }
    else if (name == "main") {
    

        if (config_data.ui_cfg_pc_main_background != null && config_data.ui_cfg_pc_main_background != '') {

            var temp_url = "url(" + '../img/pc/' + config_data.ui_cfg_pc_main_background + ")";
            console.log(temp_url);
            document.body.style.backgroundImage = temp_url;
        }

        if (config_data.ui_cfg_pc_main_color != null && config_data.ui_cfg_pc_main_color != '') {

            console.log(config_data.ui_cfg_pc_main_color);

            if (config_data.ui_cfg_pc_main_color == "random") {
                var colors = ['#CCCCCC', '#FFCCCC', '#FFFFCC', '#0099CC', '#6699CC', '#99CCCC', '#CCCCFF', '#6699CC', '#CCCC99', '#99CCFF', '#FFFFFF', '#66CCCC'];
                var c = Math.floor(Math.random() * 12);
                document.body.style.backgroundColor = colors[c];
            }
            else
            {
                document.body.style.backgroundColor = config_data.ui_cfg_pc_main_color;
            }
            
        }
    }

}




