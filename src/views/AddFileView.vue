<template>
    <div class="mb-3">
        <label for="formFile" class="form-label">上传文件</label>
        <input @click="upload($e)" class="form-control" type="file" id="formFile">
    </div>
</template>

<script>
// import { ref } from 'vue';
import $ from 'jquery';
import { useStore } from 'vuex';
import { ref } from 'vue';

export default {
    name: 'AddFileView',
    setup: () => {
        // const ipt = ref();
        var e = ref();
        const store = useStore();
        const upload = () => {
            // var that = this;
            const fileObj = e.value.target.files[0];

            var formdata = new FormData();
            formdata.append('test', fileObj);

            $.ajax({
                url: 'http://192.168.43.171:8000/uploadfile',
                type: 'POST',
                data: {
                    title: 'test',
                    article: fileObj,
                    user_id: store.state.user.id,
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
            })
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