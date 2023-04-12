
//需要先引用 project_config.js
//需要先引用 jquery.js


//type: get post
//table :  table name
//option :  select insert update delete clean  get set
//arg_data :  {id:"xxx"}
//callback  function(data){}

function db_table_ops(type, table, option, arg_data, callback) {

    var data = {};
    var db_name = table;

    if (arg_data != null) {
        data = JsonDeepCopy(arg_data);
        // if (data.hasOwnProperty("time")) {
        //     delete data.time;
        // }
        // if (data.hasOwnProperty("时间")) {
        //     delete data.时间;
        // }
    }

    if (type == 'post') {
        request_url = cfg_db_option_url + "?option=" + option + "&data={}" + "&table=" + db_name;

        console.log(request_url);

        $.ajax({
            type: 'post',
            dataType: "json",
            data: data,
            url: request_url,
            success: function (data) {
                var json_data;
                try {
                    json_data = JSON.parse(data);
                } catch (error) {
                    json_data = data;
                }
                if (callback != undefined && callback != null) {
                    callback(json_data);
                }

            },
        });
    }
    else {
        request_url = cfg_db_option_url + "?option=" + option + "&data=" + JSON.stringify(data) + "&table=" + db_name;

        console.log(request_url);

        $.ajax({
            type: 'get',
            dataType: "json",
            url: request_url,
            success: function (data) {
                var json_data;
                try {
                    json_data = JSON.parse(data);
                } catch (error) {
                    json_data = data;
                }
                if (callback != undefined && callback != null) {
                    callback(json_data);
                }
            },
        });
    }
}


 

function sensor_ops(arg_data) {
    this.data = arg_data;
    this.get_value_int = function (sensor_type) {
        var value = 0;
        var flag_got_sensor = false;
        for (let item of this.data) {
            if (item.sensor_type == sensor_type) {
                value = parseInt(item.sensor_value);
                flag_got_sensor = true;
            }
        }
        if(flag_got_sensor == false)
        {
            console.log("sensor_ops:get_value_int: [ "+sensor_type+" ] 未找到")
        }
        return value;
    }

    this.get_value_str = function (sensor_type){
        var value = "";
        var flag_got_sensor = false;
        for (let item of this.data) {
            if (item.sensor_type == sensor_type) {
                value = item.sensor_value;
                flag_got_sensor = true;
            }
        }
        if(flag_got_sensor == false)
        {
            console.log("sensor_ops:get_value_str: [ "+sensor_type+" ] 未找到")
        }
        return value;
    }

    this.get_value = function (sensor_type){
        var value = "";
        var flag_got_sensor = false;
        for (let item of this.data) {
            if (item.sensor_type == sensor_type) {
                value = item.sensor_value;
                flag_got_sensor = true;
            }
        }
        if(flag_got_sensor == false)
        {
            console.log("sensor_ops:get_value: [ "+sensor_type+" ] 未找到")
        }
        return value;
    }

    this.set_value = function (sensor_type,sensor_value){

        var temp_item = {} ;
        var flag_got_sensor = false;
        for (let item of this.data) {
            if (item.sensor_type == sensor_type) {
                temp_item = item ;
                flag_got_sensor = true;
            }    
        }
        if(flag_got_sensor == false)
        {
            console.log("sensor_ops:set_value: [ "+sensor_type+" ] 未找到");
            return ;
        }

        temp_item.sensor_value = sensor_value;
        db_table_ops('get', 'sensor_update', 'set', temp_item, null);
    }

}



