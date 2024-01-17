<template>
  <!-- <div class="form-floating">
              <input type="text" class="form-control" id="floatingPassword" placeholder="请输入文件名">
              <label for="floatingPassword">文件名</label>
          </div> -->
  <div class="card">
    <div class="card-body">
      <form class="was-validated">
        <div class="mb-3">
          <select
            v-model="choice"
            class="form-select"
            required
            aria-label="select example"
          >
            <option value="">请选择要传输的文件</option>
            <option v-for="name in name_ku" :key="name.id" :value="name.id">
              {{ name.class_name }}
            </option>
          </select>
          <div class="invalid-feedback">请选择知识库名称</div>
        </div>

        <div class="mb-3">
          <input
            type="file"
            class="form-control"
            aria-label="file example"
            ref="fileInput"
            required
            @change="getFile"
          />
          <div class="invalid-feedback">请选择上传的文件</div>
        </div>

        <div class="mb-3">
          <button @click="updateFile" class="btn btn-primary" type="button">
            确认上传
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- 分割线 -->
  <div
    class="progress"
    role="progressbar"
    aria-label="Basic example"
    aria-valuenow="100"
    aria-valuemin="0"
    aria-valuemax="100"
    style="height: 5px; border-radius: 0; margin-top: 10px"
  >
    <div
      class="progress-bar progress-bar-striped bg-success"
      style="width: 100%; height: 5px"
    ></div>
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
              <button
                style="float: right"
                class="btn btn-primary"
                type="button"
                data-bs-toggle="collapse"
                :data-bs-target="get_data_bs_target(attr.id)"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                修改
              </button>
            </div>
          </div>
          <div style="margin-top: 5px" class="collapse" :id="get_id(attr.id)">
            <div class="input-group mb-3">
              <input
                v-model="new_channelName"
                type="text"
                class="form-control"
                placeholder="新类名"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
              />
              <button
                @click="update_channelName(attr.id)"
                class="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
              >
                确认
              </button>
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
      <button
        @click="update_user_data"
        style="width: 100%"
        type="button"
        class="btn btn-danger"
      >
        添加完成
      </button>
    </div>
  </div>
</template>

<script type="text/javascript">
import $ from "jquery";
import { useStore } from "vuex";
// import axios from 'axios';
import { ref } from "vue";
// import { reactive } from 'vue';

export default {
  name: "AddFileView",
  setup: () => {
    const store = useStore();
    let new_channelName = ref("");
    let cnt = 0;
    let cls_ok = false;
    let name_ku = ref([]);
    let choice = ref();
    let fileInput = ref(null);
    let file = ref(null);
    const getFile = (e) => {
      console.log(e);
      // var data = new FormData();
      // data.append("file", e.target.files[0]);
      file.value = e.target.files[0];
      // console.log(file.value);
    };
    $.ajax({
      url: "https://u8606i6360.vicp.fun/knowledge_base/list_knowledge_bases",
      type: "GET",
      success: (resp) => {
        if (resp.msg === "success") {
          for (let i = 0; i < resp.data.length; i++) {
            let new_cls = {};
            new_cls.id = i;
            new_cls.class_name = resp.data[i];

            name_ku.value.push(new_cls);
          }
          console.log("获取知识库名称列表成功");
        } else {
          console.log("获取知识库名称列表失败");
        }
      },
      error: () => {
        console.log("获取知识库名称列表api失败");
      },
    });

    let file_attr = ref([
      {
        id: 1,
        channelName: "sports",
        title: "t4",
        content: "asdiufhpasiduhflikahsd",
      },
      {
        id: 2,
        channelName: "sports",
        title: "t5",
        content: "adisfjb;askdjfh;asudihf;asidhf;ia",
      },
      {
        id: 3,
        channelName: "ecology",
        title: "t3",
        content: "adsiufhaisduhfklasdhflkasdhflkashdflauhsd",
      },
      {
        id: 4,
        channelName: "happy",
        title: "t4",
        content: "adsiufhaisduhfklasdhflkasdhflkashdflauhsd",
      },
    ]);

    const get_data_bs_target = (attr_id) => {
      let id = String(attr_id);
      return "#" + "collapseExample" + id;
    };

    const get_id = (attr_id) => {
      let id = String(attr_id);
      return "collapseExample" + id;
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
        store.commit("updateData", attr);
      }
      // store.commit('updateData');
    };

    const updateFile = () => {
      // console.log(name_ku.value[choice])
      // console.log(typeof name_ku.value[choice])

      let choice_ku = name_ku.value[choice.value].class_name;
      // console.log(choice_ku);
      // console.log(typeof choice_ku);
      // console.log(fileInput.value.files[0]);
      // console.log(typeof fileInput.value.files[0]);
      // let file = fileInput.value.files[0];
      // let filesArray = [...[file]];
      // console.log(filesArray);
      // console.log(typeof filesArray);
      const obj = {
        files: file.value,
        knowledge_base_name: choice_ku,
        override: false,
        to_vector_store: true,
        chunk_size: 250,
        chunk_overlap: 50,
        zh_title_enhance: false,
        not_refresh_vs_cache: false,
      };
      let formData = new FormData();
      for (const key in obj) {
        formData.append(key, obj[key]);
      }
      $.ajax({
        url: "https://u8606i6360.vicp.fun/knowledge_base/upload_docs",
        type: "POST",
        Headers: {
          "content-type": "multipart/form-data",
        },
        contentType: false,
        processData: false,
        data: formData,
        success: (resp) => {
          console.log("文件上传成功");
          console.log(resp.msg);
        },
        error: (resp) => {
          console.log("文件上传失败");
          console.log(resp);
        },
      });
    };

    // $(document).ready(function () {
    //   $("#file")
    //     .fileinput({
    //       // language: 'zh',     //设置语言
    //       dropZoneEnabled: true, //是否显示拖拽区域
    //       dropZoneTitle: "将文件拖到此处上传", //拖拽区域显示文字
    //       uploadUrl: "https://u8606i6360.vicp.fun/knowledge_base/upload_docs", //上传路径
    //       // allowedFileExtensions: ['jpg', 'png', 'gif', 'jpeg'],   //指定上传文件类型
    //       uploadExtraData: {
    //         files: fileInput.value.files[0],
    //         knowledge_base_name: choice_ku,
    //         override: false,
    //         to_vector_store: true,
    //         chunk_size: 250,
    //         chunk_overlap: 50,
    //         zh_title_enhance: false,
    //         not_refresh_vs_cache: false,
    //       },
    //       minFileSize: 0,
    //       maxFileSize: 2048, //上传文件最大值，单位kb
    //       uploadAsync: true, //异步上传
    //       maxFileCount: 1, //上传文件最大个数。
    //       enctype: "multipart`/form-data",
    //     })
    //     .on("fileuploaded", function (event, data) {
    //       //异步上传成功后回调 data为返回的数据
    //       if (data.result === "success") {
    //         // cls_ok = true;
    //         // cnt = cnt + 1; //可以直接把这里的计数视为前端的id 后端返回给前端时不需要id
    //         // //这里还需要把新文章加入到当前存储的文件中 具体逻辑还没有实现
    //         // file_attr.value.push({
    //         //   id: cnt,
    //         //   channelName: data.channelName,
    //         //   title: data.title,
    //         //   content: data.content,
    //         // });
    //         console.log("文件上传成功");
    //       }
    //     });
    // });

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
      name_ku,
      choice,
      updateFile,
      fileInput,
      file,
      getFile,
    };
  },
};
</script>

<style scoped>
/* .form-control {
    margin-bottom: 10px;
} */
table {
  margin-top: 10px;
}

.was-validated {
  margin-top: 20px;
  margin-left: 30px;
  margin-right: 30px;
}

.card {
  margin-top: 15px;
  margin-left: 15px;
  margin-right: 15px;
}
</style>
