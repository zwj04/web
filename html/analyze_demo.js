//参数  context .  data 

var sensor = new sensor_ops(data);

var int_wendu1 = sensor.get_value_int("wendu1"); //获取温度
var str_wendu1 = sensor.get_value_str("wendu1"); //获取温度字符串
var int_l_mq11 = sensor.get_value_int("l_mq11"); //获取获取阈值


var show_txt = "";

if (int_wendu1 > int_l_mq11) {   //比较是否高温

    if (sensor.get_value("a_wen1") == 'on') {  //是否开启高温报警及提醒

        show_txt = show_txt + "温度太高了！";

        context.$notify({  //弹窗提醒
            title: '温度太高了！',
            message: '温度太高了！',
        });

        context.$message({  //弹窗提醒
            message: show_txt
        });

        sensor.set_value("beep1", "on"); //开蜂鸣器
    }

}
else {
    if (sensor.get_value("a_wen1") == 'on') {
        sensor.set_value("beep1", "off"); //关蜂鸣器
    }
}


