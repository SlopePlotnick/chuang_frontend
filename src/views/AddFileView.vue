<template>
    <!-- <div class="form-floating">
                <input type="text" class="form-control" id="floatingPassword" placeholder="请输入文件名">
                <label for="floatingPassword">文件名</label>
            </div> -->
    <input type="file" name="file" id="file" multiple class="file-loading" />
    <!-- 分割线 -->
    <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="100" aria-valuemin="0"
        aria-valuemax="100" style="height: 5px; border-radius: 0; margin-top: 10px;">
        <div class="progress-bar progress-bar-striped bg-success" style="width: 100%; height: 5px;"></div>
    </div>
    <table v-if="cls_ok === false" class="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">channelName</th>
                <th scope="col">Title</th>
                <th scope="col">Content</th>
            </tr>
        </thead>
        <tbody v-for="attr in file_attr" :key="attr.id">
            <tr>
                <!-- 这里实际上应该是{{ cnt }}但为了调试方便 改成文章id -->
                <th scope="row">{{ attr.id }}</th>
                <td>
                    <div class="card">
                        <div class="card-body">
                            {{ attr.channelName }}
                            <button style="float: right;" class="btn btn-primary" type="button" data-bs-toggle="collapse"
                                :data-bs-target="get_data_bs_target(attr.id)" aria-expanded="false"
                                aria-controls="collapseExample">
                                修改
                            </button>
                        </div>
                    </div>
                    <div style="margin-top: 5px;" class="collapse" :id="get_id(attr.id)">
                        <div class="input-group mb-3">
                            <input v-model="new_channelName" type="text" class="form-control" placeholder="新类名"
                                aria-label="Recipient's username" aria-describedby="button-addon2">
                            <button @click="update_channelName(attr.id)" class="btn btn-outline-secondary" type="button"
                                id="button-addon2">确认</button>
                        </div>
                    </div>
                </td>
                <td>{{ attr.title }}</td>
                <td>{{ attr.content }}</td>
            </tr>
        </tbody>
    </table>
    <div class="card">
        <div class="card-body">
            <button @click="update_user_data" style="width: 100%;" type="button" class="btn btn-danger">添加完成</button>
        </div>
    </div>
</template>

<script type="text/javascript">
import $ from 'jquery';
import { useStore } from 'vuex';
// import axios from 'axios';
import { ref } from 'vue';
// import { reactive } from 'vue';

// $(function () {
//     FileInput('#file', '../assets')
// });

export default {
    name: 'AddFileView',
    setup: () => {
        const store = useStore();
        let new_channelName = ref('');
        let cnt = 0;
        let cls_ok = false;
        let file_attr = ref([
            {
                id: 1,
                channelName: 'sports',
                title: 't4',
                content: 'asdiufhpasiduhflikahsd',
            },
            {
                id: 2,
                channelName: 'sports',
                title: 't5',
                content: 'adisfjb;askdjfh;asudihf;asidhf;ia',
            },
            {
                id: 3,
                channelName: 'ecology',
                title: 't3',
                content: 'adsiufhaisduhfklasdhflkasdhflkashdflauhsd',
            },
            {
                id: 4,
                channelName: 'happy',
                title: 't4',
                content: 'adsiufhaisduhfklasdhflkasdhflkashdflauhsd',
            },
        ]);

        const get_data_bs_target = (attr_id) => {
            let id = String(attr_id);
            return '#' + 'collapseExample' + id;
        };

        const get_id = (attr_id) => {
            let id = String(attr_id);
            return 'collapseExample' + id;
        };

        const update_channelName = (attr_id) => {
            for (let attr of file_attr.value) {
                if (attr.id === attr_id) {
                    attr.channelName = new_channelName.value;
                }
            }
        };

        const update_user_data = () => {
            for (let attr of file_attr.value) {
                store.commit('updateData', attr);
            }
            // store.commit('updateData');
        };

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
            }).on("fileuploaded", function (event, data) { //异步上传成功后回调 data为返回的数据
                if (data.result === 'success') {
                    cls_ok = true;
                    cnt = cnt + 1; //可以直接把这里的计数视为前端的id 后端返回给前端时不需要id
                    //这里还需要把新文章加入到当前存储的文件中 具体逻辑还没有实现
                    file_attr.value.push({
                        id: cnt,
                        channelName: data.channelName,
                        title: data.title,
                        content: data.content,
                    });
                }
            });
        });

        return {
            cls_ok,
            file_attr,
            cnt,
            get_data_bs_target,
            get_id,
            new_channelName,
            update_channelName,
            store,
            update_user_data,
        };
    },
}
</script>

<style scoped>
/* .form-control {
    margin-bottom: 10px;
} */
table {
    margin-top: 10px;
}
</style>