<!DOCTYPE html>
<html>

<head>
    <title>数据节点图标</title>
</head>

<body>

 

    <?php
    $folder = "./";   // 文件夹路径
    $files = array();
    $handle = opendir($folder);  // 遍历文件夹
    while (false !== ($file = readdir($handle))) {
        if ($file != '.' && $file != '..') {
            $hz = strstr($file, ".");
            if (
                $hz == ".gif" or $hz == ".jpg" or $hz == ".JPG" or $hz == ".JPEG" or
                $hz == ".PNG" or $hz == ".png" or $hz == ".GIF"
            ) {
                $files[] = $file;
            }
        }
    }

    if ($files) {
        foreach ($files as $k => $v) {
            echo '<div style="width: 200px;height: 250px;float: left;padding: 10px 10px;margin: 20px 20px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">';
            echo '<img widht=200 height=200 src="' . $v . '">';  // 循环显示
            echo '<div style="text-align: center;width: 100%;">' . str_replace('.png','',$v) .'</div>';
            echo '</div>';
        }
    }
    ?>
</body>

</html>