<template>
    <div class="mb-3">
        <label for="formFile" class="form-label">上传文件</label>
        <input @change="upload" class="form-control" type="file" id="formFile" name="filename">
    </div>
</template>

<script>
// import { ref } from 'vue';
import $ from 'jquery';
import { useStore } from 'vuex';
import axios from 'axios';
// import { ref } from 'vue';

export default {
    name: 'AddFileView',
    setup: () => {
        // const ipt = ref();
        const store = useStore();
        const upload = (e) => {
            // var that = this;
            const files = Array.from(e.target.files);
            var file = files[0];
            console.log(files[0]);

            const formData = new FormData();
            formData.append('file', file);
            console.log(formData.get('file'));

            $.ajax({
                url: 'http://192.168.43.171:8000/uploadfile',
                type: 'POST',
                data: formData,
                contentType: false,
                processData: false,
                headers: {
                    "Content-Type": "multipart/form-data",
                    transformRequest: [file => file],
                },

                success: (resp) => {
                    if (resp.result === 'success') {
                        console.log('上传成功');
                    } else {
                        console.log('api调用成功 上传文件失败');
                    }
                },
                error: () => {
                    console.log('api调用失败');
                }
            });

            // axios({
            //     method: "post",
            //     url: "http://192.168.43.171:8000/uploadfile",
            //     data: formData,
            //     headers: {
            //         "Content-Type": "multipart/form-data",
            //         transformRequest: [file => file],
            //     }
            // }).then((resp) => {
            //     console.log('resp.result');
            //     console.log(resp.result);
            // })
        };

        return {
            upload,
            store,
            // ipt,
        };
    }
}
</script>

<style scoped></style>