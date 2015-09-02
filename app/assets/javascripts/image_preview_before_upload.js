//使用了html5的特性,低版本浏览器不支持


$(function(){
    //当前没用了,因为已使用bootstrap 框架的上传图片/预览功能
//    $("input[type='file']").change(function (evt) {
//
//        var files = evt.target.files;
//
//        for (var i = 0, f; f = files[i]; i++) {
//
//            if (!f.type.match('image.*')) {
//                continue;
//            }
//            var reader = new FileReader();
//            reader.onload = (function (theFile) {
//                return function (e) {
//                    $("#image_photo_preview").attr("src", e.target.result);  //预览图片的位置
//                };
//            })(f);
//
//            reader.readAsDataURL(f);
//        }
//    });
    });


