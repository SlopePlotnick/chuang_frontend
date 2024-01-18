<template>
  <div class="card">
    <div class="card-body">
      <!--        <div class="mb-3">-->
      <!--          <select-->
      <!--            v-model="choice"-->
      <!--            class="form-select"-->
      <!--            required-->
      <!--            aria-label="select example"-->
      <!--          >-->
      <!--            <option value="">请选择要传输的文件</option>-->
      <!--            <option v-for="name in name_ku" :key="name.id" :value="name.id">-->
      <!--              {{ name.class_name }}-->
      <!--            </option>-->
      <!--          </select>-->
      <!--          <div class="invalid-feedback">请选择知识库名称</div>-->
      <!--        </div>-->

      <div class="input-group mb-3">
        <input
          type="file"
          class="form-control"
          id="inputGroupFile02"
          required
          @change="getFile"
        />
        <button
          class="btn btn-primary"
          type="button"
          id="inputGroupFileAddon04"
          data-bs-toggle="collapse"
          data-bs-target="#collapseUpload"
          aria-expanded="false"
          aria-controls="collapseUpload"
          @click="uploadFile"
        >
          上传
        </button>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" style="display: none">
        <symbol id="check-circle-fill" viewBox="0 0 16 16">
          <path
            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
          />
        </symbol>
        <symbol id="info-fill" viewBox="0 0 16 16">
          <path
            d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
          />
        </symbol>
        <symbol id="exclamation-triangle-fill" viewBox="0 0 16 16">
          <path
            d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
          />
        </symbol>
      </svg>
      <div class="collapse" id="collapseUpload">
        <div
          v-if="file_finish === false"
          class="alert alert-warning d-flex align-items-center"
          role="alert"
        >
          <svg
            width="20px"
            height="20px"
            class="bi flex-shrink-0 me-2"
            role="img"
            aria-label="Warning:"
          >
            <use xlink:href="#exclamation-triangle-fill" />
          </svg>
          <div>文件上传中</div>
        </div>
        <div
          v-if="file_success === false && file_finish === true"
          class="alert alert-danger d-flex align-items-center"
          role="alert"
        >
          <svg
            width="20px"
            height="20px"
            class="bi flex-shrink-0 me-2"
            role="img"
            aria-label="Danger:"
          >
            <use xlink:href="#exclamation-triangle-fill" />
          </svg>
          <div>文件上传失败</div>
        </div>
        <div
          v-if="file_success === true && file_finish === true"
          class="alert alert-success d-flex align-items-center"
          role="alert"
        >
          <svg
            width="20px"
            height="20px"
            class="bi flex-shrink-0 me-2"
            role="img"
            aria-label="Success:"
          >
            <use xlink:href="#check-circle-fill" />
          </svg>
          <div>文件上传成功</div>
        </div>
        <button
          @click="conversation"
          style="width: 100%"
          v-if="file_success === true && file_finish === true"
          type="button"
          class="btn btn-success"
          data-bs-toggle="collapse"
          data-bs-target="#collapseConversation"
          aria-expanded="false"
          aria-controls="collapseConversation"
        >
          获取分析结果
        </button>
      </div>
      <div class="collapse" id="collapseConversation">
        <div
          v-if="conv_finish === false"
          class="alert alert-warning"
          role="alert"
          style="margin-top: 5px"
        >
          <h4 class="alert-heading">模型思考ing...</h4>
          <hr />
          <p class="mb-0">请稍候</p>
        </div>
        <div
          v-if="conv_finish === true && conv_success === true"
          class="alert alert-success"
          role="alert"
          style="margin-top: 5px"
        >
          <h4 class="alert-heading">对话成功</h4>
          <p>{{ ans }}</p>
          <hr />
          <p class="mb-0">现在您可以根据ai分析结果将文本上传至对应的知识库</p>
        </div>
        <div
          v-if="conv_finish === true && conv_success === false"
          class="alert alert-danger"
          role="alert"
          style="margin-top: 5px"
        >
          <h4 class="alert-heading">对话失败</h4>
          <hr />
          <p class="mb-0">请检查网络状况</p>
        </div>
      </div>
    </div>
  </div>

  <!--  &lt;!&ndash; 分割线 &ndash;&gt;-->
  <!--  <div-->
  <!--    class="progress"-->
  <!--    role="progressbar"-->
  <!--    aria-label="Basic example"-->
  <!--    aria-valuenow="100"-->
  <!--    aria-valuemin="0"-->
  <!--    aria-valuemax="100"-->
  <!--    style="height: 5px; border-radius: 0; margin-top: 10px"-->
  <!--  >-->
  <!--    <div-->
  <!--      class="progress-bar progress-bar-striped bg-success"-->
  <!--      style="width: 100%; height: 5px"-->
  <!--    ></div>-->
  <!--  </div>-->
  <!--  <table v-if="cls_ok === false" class="table">-->
  <!--    <thead>-->
  <!--      <tr>-->
  <!--        <th scope="col">#</th>-->
  <!--        <th scope="col">channelName</th>-->
  <!--        <th scope="col">Title</th>-->
  <!--        <th scope="col">Content</th>-->
  <!--      </tr>-->
  <!--    </thead>-->
  <!--    <tbody v-for="attr in file_attr" :key="attr.id">-->
  <!--      <tr>-->
  <!--        &lt;!&ndash; 这里实际上应该是{{ cnt }}但为了调试方便 改成文章id &ndash;&gt;-->
  <!--        <th scope="row">{{ attr.id }}</th>-->
  <!--        <td>-->
  <!--          <div class="card">-->
  <!--            <div class="card-body">-->
  <!--              {{ attr.channelName }}-->
  <!--              <button-->
  <!--                style="float: right"-->
  <!--                class="btn btn-primary"-->
  <!--                type="button"-->
  <!--                data-bs-toggle="collapse"-->
  <!--                :data-bs-target="get_data_bs_target(attr.id)"-->
  <!--                aria-expanded="false"-->
  <!--                aria-controls="collapseExample"-->
  <!--              >-->
  <!--                修改-->
  <!--              </button>-->
  <!--            </div>-->
  <!--          </div>-->
  <!--          <div style="margin-top: 5px" class="collapse" :id="get_id(attr.id)">-->
  <!--            <div class="input-group mb-3">-->
  <!--              <input-->
  <!--                v-model="new_channelName"-->
  <!--                type="text"-->
  <!--                class="form-control"-->
  <!--                placeholder="新类名"-->
  <!--                aria-label="Recipient's username"-->
  <!--                aria-describedby="button-addon2"-->
  <!--              />-->
  <!--              <button-->
  <!--                @click="update_channelName(attr.id)"-->
  <!--                class="btn btn-outline-secondary"-->
  <!--                type="button"-->
  <!--                id="button-addon2"-->
  <!--              >-->
  <!--                确认-->
  <!--              </button>-->
  <!--            </div>-->
  <!--          </div>-->
  <!--        </td>-->
  <!--        <td>{{ attr.title }}</td>-->
  <!--        <td>{{ attr.content }}</td>-->
  <!--      </tr>-->
  <!--    </tbody>-->
  <!--  </table>-->
  <!--  <div class="card">-->
  <!--    <div class="card-body">-->
  <!--      <button-->
  <!--        @click="update_user_data"-->
  <!--        style="width: 100%"-->
  <!--        type="button"-->
  <!--        class="btn btn-danger"-->
  <!--      >-->
  <!--        添加完成-->
  <!--      </button>-->
  <!--    </div>-->
  <!--  </div>-->
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
    let file = ref(null);
    let ans = ref("");
    let file_finish = ref(false);
    let file_success = ref(false);
    let conv_finish = ref(false);
    let conv_success = ref(false);
    const getFile = (e) => {
      console.log(e);
      // var data = new FormData();
      // data.append("file", e.target.files[0]);
      file.value = e.target.files[0];
      console.log(file.value);
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

    const uploadFile = () => {
      const obj = {
        files: file.value,
        knowledge_base_name: "unknown",
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
      // 调用上传文件的api
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
          file_finish.value = true;
          file_success.value = true;
        },
        error: (resp) => {
          console.log("文件上传失败");
          console.log(resp);
          file_finish.value = true;
          file_success.value = false;
        },
      });
    };

    const conversation = () => {
      let name_in_query = "";
      for (let i = 0; i < name_ku.value.length; i++) {
        if (name_ku.value[i].class_name === "unknown") {
          continue;
        } else {
          if (i === name_ku.value.length - 1) {
            name_in_query += name_ku.value[i].class_name;
          } else {
            name_in_query = name_in_query + name_ku.value[i].class_name + "，";
          }
        }
      }
      console.log(name_in_query);

      let question =
        "当前知识库与什么领域有关？请在以下领域中选一个作答：" +
        name_in_query +
        "回答中不要包含除领域名称外的其他字符。";

      $.ajax({
        url: "https://u8606i6360.vicp.fun/chat/knowledge_base_chat",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
          query: question,
          knowledge_base_name: "unknown",
          top_k: 3,
          score_threshold: 1,
          stream: false,
          model_name: "Qwen-1.8B-Chat-Int4",
          temperature: 0.7,
          prompt_name: "default",
        }),
        success: (resp) => {
          console.log("知识库对话成功");
          conv_finish.value = true;
          ans.value = resp;
          // 进行对返回字符串的解析
          let i = 12;
          while (ans.value[i] !== '"') {
            i++;
          }
          let j = i + 1;
          while (ans.value[j] !== '[') {
            j++;
          }
          ans.value = '分类结果: ' + ans.value.slice(12, i)
          + '分析来源: '
          + ans.value.slice(j + 2, ans.value.length - 3);
          conv_success.value = true;
        },
        error: (resp) => {
          console.log("知识库对话失败");
          console.log(resp);
          conv_finish.value = true;
          conv_success.value = false;
        },
      });
    };

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
      uploadFile,
      file,
      getFile,
      ans,
      file_finish,
      file_success,
      conv_finish,
      conv_success,
      conversation,
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
