<template>
  <div class="container">
    <div class="row">
      <!-- 左栏 -->
      <div
        class="col-3"
        style="
          background-color: rgb(248, 249, 250);
          border-style: solid;
          border-top: rgb(255, 255, 255);
          border-left: rgb(255, 255, 255);
          border-bottom: rgb(255, 255, 255);
          border-color: lightgray;
          border-width: 1px;
          padding-bottom: 100%;
        "
      >
        <div id="choice">请选择对话模式：</div>

        <div>
          <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingOne">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  知识库对话
                </button>
              </h2>
              <div
                id="collapseOne"
                class="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div
                  class="accordion-body"
                  v-for="cla in classifications"
                  :key="cla.id"
                >
                  <div class="d-grid gap-2 col-15 mx-auto row-8">
                    <button
                      type="button"
                      class="btn btn-outline-secondary"
                      @click="set_model(cla)"
                    >
                      {{ cla.class_name }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingTwo">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="true"
                  aria-controls="collapseTwo"
                >
                  智能模型对话
                </button>
              </h2>
              <div
                id="collapseTwo"
                class="accordion-collapse collapse show"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <div class="d-grid gap-2 col-15 mx-auto row-8">
                    <button
                      type="button"
                      class="btn btn-outline-secondary"
                      @click="set_llm"
                    >
                      LLM模型
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 右栏 -->
      <div class="col-9">
        <!-- 显示所选择的模式 -->
        <div
          class="card all"
          style="height: 60px; width: 70%; background-color: aliceblue"
        >
          <div
            class="card-body"
            style="
              font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
                'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
              font-size: larger;
              text-align: center;
            "
          >
            {{ con_model }}
          </div>
          <div class="mt-5">
            <textarea
              v-model="question"
              class="form-control"
              id="input_question"
              placeholder="请输入对话内容"
              rows="1"
              style="width: 85%; display: inline"
            ></textarea>
            <button
              @click="question_up"
              type="button"
              class="btn btn-outline-secondary"
              style="
                display: inline;
                margin-left: 30px;
                margin-top: -25px;
                width: 100px;
              "
            >
              提交
            </button>
          </div>
          <div class="mt-3" v-if="question_exist === true">
            <div class="card all" style="height: auto; width: 95%">
              <div
                class="card-body"
                style="font-family: Georgia, 'Times New Roman', Times, serif"
              >
                <div>Q: {{ conversation.question }}<br /></div>
                <br />
                <div>A: {{ conversation.answer }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
// import router from "../router/index";
import $ from "jquery";

export default {
  name: "UserProfileView",
  setup: () => {
    let classifications = ref([]);
    let con_model = ref("");
    let conversation = reactive({});
    let question_exist = ref(false);
    let question = ref("");

    // 直接从前端获取知识库信息
    $.ajax({
      url: "https://u8606i6360.vicp.fun/knowledge_base/list_knowledge_bases",
      type: "GET",
      success: (resp) => {
        if (resp.msg === "success") {
          let name_ku = resp.data;

          for (let i = 0; i < name_ku.length; i++) {
            let new_cls = {};
            new_cls.class_name = name_ku[i];
            new_cls.id = i;
            classifications.value.push(new_cls);
          }
        } else {
          console.log("更新知识库信息失败");
        }
      },
      error: () => {
        console.log("更新知识库信息api访问失败");
      },
    });

    const set_model = (cla) => {
      con_model.value = cla.class_name;
      console.log(con_model.value);
    };

    const set_llm = () => {
      con_model.value = "LLM模型";
    };

    const question_up = () => {
      conversation.question = question.value;

      if (con_model.value === "LLM模型") {
        $.ajax({
          url: "https://u8606i6360.vicp.fun/chat/chat",
          type: "POST",
          contentType: "application/json",
          data: JSON.stringify({
            query: conversation.question,
            stream: false,
            model_name: "Qwen-1.8B-Chat-Int4",
            temperature: 0.7,
            prompt_name: "default",
          }),
          success: (resp) => {
            console.log("对话成功");
            let obj = JSON.parse(resp);
            conversation.answer = obj.text;
            question_exist.value = true;
          },
          error: (resp) => {
            console.log("对话失败");
            console.log(resp);
            conversation.answer = resp;
          },
        });
      } else {
        $.ajax({
          url: "https://u8606i6360.vicp.fun/chat/knowledge_base_chat",
          type: "POST",
          contentType: "application/json",
          data: JSON.stringify({
            query: conversation.question,
            knowledge_base_name: con_model.value,
            top_k: 10,
            score_threshold: 1,
            stream: false,
            model_name: "Qwen-1.8B-Chat-Int4",
            temperature: 0.7,
            prompt_name: "default",
          }),
          success: (resp) => {
            console.log("对话成功");
            let obj = JSON.parse(resp);
            conversation.answer = obj.answer;
            console.log(obj.docs);
            question_exist.value = true;
          },
          error: (resp) => {
            console.log('对话失败');
            console.log(resp);
            conversation.answer = resp;
          }
        });
      }
    };

    return {
      classifications,
      question,
      con_model,
      conversation,
      question_exist,
      set_model,
      question_up,
      set_llm,
    };
  },
};
</script>

<style scoped>
.all {
  position: absolute;
  height: 88%;
  width: 20%;
  margin: 2%;
}

.container {
  width: 100%;
  max-width: 100%;
  margin-left: 0;
  margin-right: 0;
}

.col-3:nth-child(1) .col-3 {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#choice {
  background-color: aliceblue;
  height: 50px;
  text-align: center;
  line-height: 50px;
}
</style>
