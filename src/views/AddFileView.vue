<template>
    <div class="card">
        <div class="card-body">
            <input type="file" name="file" id="file" multiple class="file-loading" />
        </div>
    </div>
</template>

<script type="text/javascript">
import $ from 'jquery';
// import { useStore } from 'vuex';
// import axios from 'axios';
// import { ref } from 'vue';

// $(function () {
//     FileInput('#file', '../assets')
// });

export default {
    name: 'AddFileView',
    setup: () => {
        $(document).ready(function () {
            $('#file').fileinput({
                // language: 'zh',     //设置语言
                dropZoneEnabled: true,      //是否显示拖拽区域
                dropZoneTitle: "将文件拖到此处上传",    //拖拽区域显示文字
                uploadUrl: '../assets',  //上传路径
                // allowedFileExtensions: ['jpg', 'png', 'gif', 'jpeg'],   //指定上传文件类型
                minFileSize: 0,
                maxFileSize: 2048,   //上传文件最大值，单位kb
                uploadAsync: true,  //异步上传
                maxFileCount: 1,   //上传文件最大个数。
                enctype: 'multipart/form-data',
            }).on("fileuploaded", function (event, data) { //异步上传成功后回调
                console.log(data);		//data为返回的数据
            });
        })
    },
}
</script>

<style scoped></style>