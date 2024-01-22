<template>
  <!--  提醒事项-->
  <div
    style="margin-left: 10px; margin-right: 10px; margin-top: 10px"
    class="alert alert-info"
    role="alert"
  >
    您可以在本页面中上传本地文件，以调用ai模型进行辅助分类，在此列出如下注意事项：<br />
    <ol>
      <li>
        您可以上传200MB以内的HTML, MD, JSON, CSV, PDF, PNG, JPG, JPEG, BMP, EML,
        MSG, RST, RTF, TXT, XML, DOCX, EPUB, ODT, PPT, PPTX, TSV,
        HTM格式的文件，<strong>不支持DOC格式的文件</strong>
      </li>
      <li>
        目前仅支持一次上传一个文件
      </li>
      <li>
        一般而言，ai只能辅助您在已有的知识库类别中进行选择，当上传的文件不能归入已有类别时，ai将给出自己的分类意见
      </li>
      <li>
        <strong>经测试，ai的分类结果可能出错</strong>
      </li>
      <li>
        在该页面上传的文件只供进行ai分类，不会加入知识库中，请务必在当前文件分类任务完成后点击<strong>确认</strong>，否则将会<strong>极大影响您之后上传文本分类的正确率</strong>。您可以在<strong>知识库管理</strong>页面中将文本加入知识库
      </li>
    </ol>
  </div>
  <!--  下方正式页面-->
  <div class="card">
    <div class="card-body">
      <!--      文件上传组件-->
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
      <!--      上传提示组件-->
      <!--      这里的svg是提取网络素材-->
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
      <!--      用collapse的方式展示-->
      <div class="collapse" id="collapseUpload">
        <!--        上传中-->
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
        <!--        上传失败-->
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
        <!--        上传成功-->
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
        <!--        获取分析结果的按钮-->
        <button
          @click="conversation"
          style="width: 100%"
          v-if="file_success === true && file_finish === true"
          type="button"
          class="btn btn-outline-success"
          data-bs-toggle="collapse"
          data-bs-target="#collapseConversation"
          aria-expanded="false"
          aria-controls="collapseConversation"
        >
          获取分析结果
        </button>
      </div>
      <!--      分析结果组件 用collapse方式展示-->
      <div class="collapse" id="collapseConversation">
        <!--        思考过程-->
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
        <!--        对话成功-->
        <div
          v-if="conv_finish === true && conv_success === true"
          class="alert alert-success"
          role="alert"
          style="margin-top: 5px"
        >
          <h4 class="alert-heading">对话成功</h4>
          <p>{{ ans }}</p>
          <hr />
          <p class="mb-0">
            现在您可以根据ai分析结果将文本上传至对应的知识库<br /><strong
              >离开本页面前务必点击确认按钮</strong
            >
          </p>
          <!--          确认按钮-->
          <button
            @click="delete_file"
            style="width: 100%"
            type="button"
            class="btn btn-danger"
          >
            确认
          </button>
        </div>
        <!--        对话失败-->
        <div
          v-if="conv_finish === true && conv_success === false"
          class="alert alert-danger"
          role="alert"
          style="margin-top: 5px"
        >
          <h4 class="alert-heading">对话失败</h4>
          <hr />
          <p class="mb-0">
            请检查网络状况<br /><strong>离开本页面前务必点击确认按钮</strong>
          </p>
          <button
            @click="delete_file"
            style="width: 100%"
            type="button"
            class="btn btn-danger"
          >
            确认
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import $ from "jquery";
import { useStore } from "vuex";
import { ref } from "vue";
import router from "../router/index";

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

    // 获取知识库列表 之后有用
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

    const get_data_bs_target = (attr_id) => {
      let id = String(attr_id);
      return "#" + "collapseExample" + id;
    };

    const get_id = (attr_id) => {
      let id = String(attr_id);
      return "collapseExample" + id;
    };

    // 获取文件上传组件的文件信息
    const getFile = (e) => {
      file.value = e.target.files[0];
    };

    // 上传文件逻辑
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

    // 对话逻辑
    const conversation = () => {
      // 从name_ku中获取现有的所有知识库名称，并将unknown剔除 用于喂给ai
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

      // 问题定义
      let question =
        "当前知识库中的内容与什么领域相关性最强？你只能在以下领域中选一个相关性最强的作答：" +
        name_in_query +
        "如果当前知识库与上述领域都无关，你认为该知识库可以被划分到什么领域？" +
        "回答时，直接给出被归入领域的名称。" +
        "注意回答中不要有多余字符。";

      // 调用知识库对话api
      $.ajax({
        url: "https://u8606i6360.vicp.fun/chat/knowledge_base_chat",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
          query: question,
          knowledge_base_name: "unknown",
          top_k: 10,
          score_threshold: 1,
          history: [],
          stream: false,
          model_name: "Qwen-1.8B-Chat-Int4",
          temperature: 0.7,
          prompt_name: "default",
        }),
        success: (resp) => {
          console.log("知识库对话成功");
          conv_finish.value = true;
          let obj = JSON.parse(resp);
          ans.value = obj.answer;
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

    // 分类完毕后从unknown库中删除当前文件
    const delete_file = () => {
      $.ajax({
        url: "https://u8606i6360.vicp.fun/knowledge_base/delete_docs",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
          knowledge_base_name: "unknown",
          file_names: [file.value.name],
          delete_content: true,
          not_refresh_vs_cache: true,
        }),
        success: (resp) => {
          console.log(resp.msg);
          router.push({ name: "home" });
        },
        error: (resp) => {
          console.log(resp);
        },
      });
    };

    return {
      cls_ok,
      cnt,
      new_channelName,
      store,
      name_ku,
      choice,
      file,
      ans,
      file_finish,
      file_success,
      conv_finish,
      conv_success,
      get_data_bs_target,
      get_id,
      uploadFile,
      getFile,
      conversation,
      delete_file,
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
