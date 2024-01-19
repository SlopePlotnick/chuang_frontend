<template>
  <!-- 如果登陆成功 展示首页 -->
  <div v-if="!$store.state.user.is_login" class="container">
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
        <div class="row">
          <!-- 搜索栏 -->
          <div class="col-9" style="padding-left: 0">
            <nav class="navbar bg-body-tertiary">
              <div class="container-fluid">
                <form class="d-flex" role="search">
                  <input
                    class="form-control me-2"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button
                    @click="search"
                    class="btn btn-sm btn-outline-success"
                    type="button"
                  >
                    Search
                  </button>
                </form>
              </div>
            </nav>
          </div>
          <!-- 添加文件按钮 -->
          <div class="col-3" style="padding: 0">
            <button
              type="button"
              class="btn btn-light"
              data-bs-toggle="collapse"
              data-bs-target="#collapseAdd"
              aria-expanded="false"
              aria-controls="collapseAdd"
              style="margin-right: 5px"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                class="bi bi-plus-square"
                viewBox="0 0 16 16"
              >
                <path
                  d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                />
                <path
                  d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                />
              </svg>
            </button>
          </div>
          <div style="margin-bottom: 10px" class="collapse" id="collapseAdd">
            <div class="card card-body">
              <button
                @click="over_add_kb"
                type="button"
                class="btn btn-outline-primary"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                创建知识库
              </button>
              <button
                style="margin-top: 10px"
                type="button"
                class="btn btn-outline-primary"
                @click="over_add_file"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                上传文件
              </button>
              <div
                style="margin-top: 10px"
                class="collapse"
                id="collapseExample"
              >
                <div
                  v-if="add_kb_start === true"
                  class="alert alert-warning"
                  role="alert"
                >
                  <storng>知识库名称不支持英文！</storng>
                </div>
                <div v-if="add_kb_start === true" class="card card-body">
                  <div class="input-group mb-3">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="新建知识库名称"
                      aria-label="新建知识库名称"
                      aria-describedby="button-addon2"
                      v-model="new_name"
                    />
                    <button
                      class="btn btn-outline-secondary"
                      type="button"
                      id="button-addon2"
                      @click="create_knowledge_base"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseKu"
                      aria-expanded="false"
                      aria-controls="collapseKu"
                    >
                      确认
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
                  <div class="collapse" id="collapseKu">
                    <div
                      v-if="ku_finish === false"
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
                      <div>知识库创建中</div>
                    </div>
                    <div
                      v-if="ku_success === false && ku_finish === true"
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
                      <div>知识库创建失败</div>
                    </div>
                    <div
                      v-if="ku_success === true && ku_finish === true"
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
                      <div>知识库创建成功 刷新查看结果</div>
                    </div>
                  </div>
                </div>
                <div v-if="add_file_start === true" class="card card-body">
                  <form class="was-validated">
                    <div class="mb-3">
                      <select
                        v-model="choice"
                        class="form-select"
                        required
                        aria-label="select example"
                      >
                        <option value="">请选择要传输的文件</option>
                        <option
                          v-for="name in name_ku"
                          :key="name.id"
                          :value="name.id"
                        >
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
                        @change="getFile"
                        required
                      />
                      <div class="invalid-feedback">请选择要上传的文件</div>
                    </div>
                  </form>
                  <div class="mb-3">
                    <button
                      @click="uploadFile"
                      style="width: 100%"
                      class="btn btn-primary"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseUpload"
                      aria-expanded="false"
                      aria-controls="collapseUpload"
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 索引栏 -->
        <!-- 未进入搜索状态 -->
        <div v-if="is_searching === false">
          <div
            v-for="cla in classifications"
            :key="cla.id"
            class="accordion"
            id="accordionPanelsStayOpenExample"
          >
            <div style="margin-bottom: 10px" class="accordion-item">
              <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                <!-- 点击类名按钮时 触发display_all_pas事`件 更新当前在中栏展示的所有文章 -->
                <button
                  @click="display_all_pas(cla.id)"
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  :data-bs-target="get_data_bs_target(cla.id)"
                  aria-expanded="true"
                  :aria-controls="get_id(cla.id)"
                >
                  {{ cla.class_name }}
                </button>
              </h2>
              <div
                :id="get_id(cla.id)"
                class="accordion-collapse collapse"
                aria-labelledby="panelsStayOpen-headingOne"
              >
                <div class="accordion-body">
                  <div
                    v-for="pas in cla.passages"
                    :key="pas.id"
                    class="list-group"
                  >
                    <a
                      @click="display_one_pas(pas.id)"
                      href="#"
                      class="list-group-item list-group-item-action"
                      style="margin-bottom: 10px"
                    >
                      {{ pas.title }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 进入搜索状态 -->
        <div v-if="is_searching === true">
          <button
            @click="unsearch"
            style="width: 100%; margin-bottom: 10px"
            type="button"
            class="btn btn-secondary"
          >
            退出搜索
          </button>
          <div
            v-for="cla in classifications_searching"
            :key="cla.id"
            class="accordion"
            id="accordionPanelsStayOpenExample"
          >
            <div class="accordion-item">
              <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                <!-- 点击类名按钮时 触发display_all_pas事件 更新当前在中栏展示的所有文章 -->
                <button
                  @click="display_all_pas(cla.id)"
                  class="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  :data-bs-target="get_data_bs_target(cla.id)"
                  aria-expanded="true"
                  :aria-controls="get_id(cla.id)"
                >
                  {{ cla.class_name }}
                </button>
              </h2>
              <div
                :id="get_id(cla.id)"
                class="accordion-collapse collapse show"
                aria-labelledby="panelsStayOpen-headingOne"
              >
                <div class="accordion-body">
                  <div
                    v-for="pas in cla.passages"
                    :key="pas.id"
                    class="list-group"
                  >
                    <a
                      @click="display_one_pas(pas.id)"
                      href="#"
                      class="list-group-item list-group-item-action"
                      style="margin-bottom: 10px"
                    >
                      {{ pas.title }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 中栏 -->
      <div
        class="col-3"
        style="
          background-color: white;
          border-style: solid;
          border-top: rgb(255, 255, 255);
          border-left: rgb(255, 255, 255);
          border-bottom: rgb(255, 255, 255);
          border-color: lightgrey;
          border-width: 1px;

          padding-bottom: 100%;
          padding-top: 10px;
        "
      >
        <div
          v-if="!(current_class_name === '')"
          class="alert alert-light"
          role="alert"
          style="
            background-color: rgb(90, 130, 247);
            color: white;
            margin-bottom: 2px;
          "
        >
          {{ current_class_name }}
        </div>
        <button
          style="width: 100%; margin-top: 2px"
          v-if="!(current_class_name === '')"
          type="button"
          class="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#staticKu"
        >
          删除知识库
        </button>
        <div
          class="modal fade"
          id="staticKu"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">
                  Warning
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                您确定要删除知识库{{ current_class_name }}吗？该操作<strong
                  >不可撤销</strong
                >
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  取消
                </button>
                <button
                  @click="delete_kb"
                  type="button"
                  class="btn btn-danger"
                  data-bs-dismiss="modal"
                >
                  确定
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="current_class_name === ''" class="tishi">
          点击左侧分类名称以预览该类文本
        </div>
        <hr />
        <div
          style="margin-top: 5px"
          v-for="pas in current_passages"
          :key="pas.id"
          class="list-group"
        >
          <a
            @click="display_one_pas(pas.id)"
            href="#"
            class="list-group-item list-group-item-action"
            style="margin-bottom: 10px"
          >
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{ pas.title }}</h5>
            </div>
            <p class="mb-1 text-truncate">{{ pas.content }}</p>
          </a>
          <!-- <a href="#" class="list-group-item list-group-item-action">
              <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">List group item heading</h5>
                  <small class="text-muted">3 days ago</small>
              </div>
              <p class="mb-1 text-truncate">Some placeholder content in a paragraph.</p>
              <small class="text-muted">And some muted small print.</small>
          </a>
          <a href="#" class="list-group-item list-group-item-action">
              <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">List group item heading</h5>
                  <small class="text-muted">3 days ago</small>
              </div>
              <p class="mb-1 text-truncate">Some placeholder content in a paragraph.</p>
              <small class="text-muted">And some muted small print.</small>
          </a> -->
        </div>
      </div>
      <!-- 右栏 -->
      <div
        class="col-6"
        style="padding-top: 10px; margin-right: 0; margin-left: 0"
      >
        <!-- <div class="col-3">
                <nav id="navbar-example3" class="h-100 flex-column align-items-stretch pe-4 border-end">
                    <nav class="nav nav-pills flex-column">
                        <a class="nav-link" href="#item-1">Item 1</a>
                        <nav class="nav nav-pills flex-column">
                            <a class="nav-link ms-3 my-1" href="#item-1-1">Item 1-1</a>
                            <a class="nav-link ms-3 my-1" href="#item-1-2">Item 1-2</a>
                        </nav>
                        <a class="nav-link" href="#item-2">Item 2</a>
                        <a class="nav-link" href="#item-3">Item 3</a>
                        <nav class="nav nav-pills flex-column">
                            <a class="nav-link ms-3 my-1" href="#item-3-1">Item 3-1</a>
                            <a class="nav-link ms-3 my-1" href="#item-3-2">Item 3-2</a>
                        </nav>
                    </nav>
                </nav>
            </div> -->

        <div
          v-if="!(one_passage.title === undefined)"
          data-bs-spy="scroll"
          data-bs-target="#navbar-example3"
          data-bs-smooth-scroll="true"
          class="scrollspy-example-2"
          tabindex="0"
        >
          <h4>{{ one_passage.title }}</h4>
          <p>{{ one_passage.content }}</p>
          <!-- <div id="item-1">
                      <h4>Item 1</h4>
                      <p>tenglin</p>
                  </div>
                  <div id="item-1-1">
                      <h5>Item 1-1</h5>
                      <p>zengao</p>
                  </div>
                  <div id="item-1-2">
                      <h5>Item 1-2</h5>
                      <p>chenyizhou</p>
                  </div>
                  <div id="item-2">
                      <h4>Item 2</h4>
                      <p>...</p>
                  </div>
                  <div id="item-3">
                      <h4>Item 3</h4>
                      <p>...</p>
                  </div>
                  <div id="item-3-1">
                      <h5>Item 3-1</h5>
                      <p>...</p>
                  </div>
                  <div id="item-3-2">
                      <h5>Item 3-2</h5>
                      <p>...</p>
                  </div> -->
        </div>
        <div v-else class="tishi">点击中部按钮以阅读文章</div>
      </div>
    </div>
  </div>

  <div v-else>
    <div class="alert alert-primary" role="alert" style="text-align: center">
      当前未登陆 请前往
      <router-link :to="{ name: 'login' }" class="alert-link">登陆</router-link>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import $ from "jquery";

export default {
  name: "HomeView",

  setup: () => {
    let classifications = ref([]);
    let name_ku = ref([]);
    let new_name = ref("");
    const store = useStore();
    store.commit("updateKnowledge");
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
            new_cls.passages = [];

            // 调用api获取该名称知识库中的文件列表
            let get_file_url =
              "https://u8606i6360.vicp.fun/knowledge_base/list_files?knowledge_base_name=" +
              new_cls.class_name;
            $.ajax({
              url: get_file_url,
              type: "GET",
              success: (resp) => {
                if (resp.msg === "success") {
                  let name_file = resp.data;

                  for (let j = 0; j < name_file.length; j++) {
                    let new_pas = {};
                    new_pas.id = j;
                    new_pas.title = name_file[j];
                    new_pas.content = "暂不支持预览";

                    new_cls.passages.push(new_pas);
                  }

                  console.log("获取知识库文件成功");
                } else {
                  console.log("获取知识库文件失败");
                }
              },
              error: () => {
                console.log("获取知识库文件api访问失败");
              },
            });

            classifications.value.push(new_cls);
          }
          console.log("更新知识库信息成功");
        } else {
          console.log("更新知识库信息失败");
        }
      },
      error: () => {
        console.log("更新知识库信息api访问失败");
      },
    });

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

    // 当前类下所有的文章
    let current_passages = ref([]);
    // 当前所在的文章的类的id 数据类型是整型
    let current_class_id = ref();
    //当前所在类的名称
    let current_class_name = ref("");
    // 是否进入添加状态
    let add_kb_start = ref(false);
    let add_file_start = ref(false);
    let file = ref(null);
    let choice = ref();
    let file_finish = ref(false);
    let file_success = ref(false);
    let ku_finish = ref(false);
    let ku_success = ref(false);
    let de_ku_finish = ref(false);
    let de_ku_success = ref(false);

    //展示某类下所有文章的事件 用id进行查找可以保证查找结果唯一
    const display_all_pas = (class_id) => {
      current_class_id.value = class_id; // 更新当前类id
      //根据class_name对classifications中的对象进行查找
      for (let i = 0; i < classifications.value.length; i++) {
        if (classifications.value[i].id === class_id) {
          current_passages.value = classifications.value[i].passages;
          current_class_name.value = classifications.value[i].class_name;
          break;
        }
      }
    };

    //选中的展示的唯一的文章
    let one_passage = reactive({});

    //展示具体文章事件 同时使用类id和文章id进行查找 保证结果唯一
    const display_one_pas = (pas_id) => {
      // console.log('执行display_one_pas')
      // console.log('当前类id为');
      // console.log(current_class_id.value);
      // console.log('当前文章id为');
      // console.log(pas_id)
      // 此处应该是根据api对文本内容进行返回？
      // 这里写的是直接对内容进行查找返回的结果
      for (let i = 0; i < classifications.value.length; i++) {
        if (classifications.value[i].id === current_class_id.value) {
          for (let j = 0; j < classifications.value[i].passages.length; j++) {
            if (classifications.value[i].passages[j].id === pas_id) {
              one_passage.id = classifications.value[i].passages[j].id;
              one_passage.content =
                classifications.value[i].passages[j].content;
              one_passage.title = classifications.value[i].passages[j].title;
              break;
            }
          }
        }
      }

      // console.log('当前one_passage为');
      // console.log(one_passage);
    };

    const get_id = (cla_id) => {
      let id = String(cla_id);
      return "panelsStayOpen-collapse" + id;
    };

    const get_data_bs_target = (cla_id) => {
      let id = String(cla_id);
      return "#panelsStayOpen-collapse" + id;
    };

    let is_searching = ref(false);

    const search = () => {
      is_searching.value = true;
    };

    const unsearch = () => {
      is_searching.value = false;
    };

    //此处应该用api返回 但暂未与后端测试 所以拟造数据
    let classifications_searching = ref([
      {
        class_name: "sports",
        id: 1,
        passages: [
          {
            id: 1,
            title: "t1",
            content: "aslidhaklsjdhkasjhdfkljashdkflhasldf",
          },
          {
            id: 2,
            title: "t2",
            content: "kjhblkjhfiauhsifhpaioufiuhlihuiouhadslfihls",
          },
          {
            id: 3,
            title: "t3",
            content: "ojnasciujsedlifuhasdkjfhlihuasdifhasdilfkuh",
          },
        ],
      },
    ]);

    const add_kb = () => {
      add_kb_start.value = true;
    };

    const add_file = () => {
      add_file_start.value = true;
    };

    const over_add_kb = () => {
      add_kb_start.value = !add_kb_start.value;
    };

    const over_add_file = () => {
      add_file_start.value = !add_file_start.value;
    };

    const getFile = (e) => {
      file.value = e.target.files[0];
    };

    const create_knowledge_base = () => {
      $.ajax({
        url: "https://u8606i6360.vicp.fun/knowledge_base/create_knowledge_base",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
          knowledge_base_name: new_name.value,
          vector_store_type: "faiss",
          embed_model: "m3e-base",
        }),
        success: (resp) => {
          console.log("知识库创建成功");
          console.log(resp.msg);
          ku_finish.value = true;
          ku_success.value = true;
        },
        error: (resp) => {
          console.log("知识库创建失败");
          console.log(resp);
          ku_finish.value = true;
          ku_success.value = false;
        },
      });
    };

    const uploadFile = () => {
      let choice_ku = name_ku.value[choice.value].class_name;
      console.log(choice_ku);
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

    const delete_kb = () => {
      $.ajax({
        url: "https://u8606i6360.vicp.fun/knowledge_base/delete_knowledge_base",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(current_class_name.value),
        success: (resp) => {
          console.log("知识库删除成功");
          console.log(resp.msg);
          de_ku_finish.value = true;
          de_ku_success.value = true;
        },
        error: (resp) => {
          console.log("知识库删除失败");
          console.log(resp);
          de_ku_finish.value = true;
          de_ku_success.value = false;
        },
      });
    };

    return {
      classifications,
      current_passages,
      display_all_pas,
      current_class_id,
      display_one_pas,
      one_passage,
      get_id,
      get_data_bs_target,
      current_class_name,
      is_searching,
      search,
      classifications_searching,
      unsearch,
      add_kb,
      add_kb_start,
      add_file_start,
      add_file,
      over_add_kb,
      over_add_file,
      getFile,
      choice,
      name_ku,
      uploadFile,
      file_finish,
      file_success,
      create_knowledge_base,
      new_name,
      ku_finish,
      ku_success,
      delete_kb,
      de_ku_finish,
      de_ku_success,
    };
  },
};
</script>

<style scoped>
.col-3:nth-child(1) .col-3 {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.container {
  width: 100%;
  max-width: 100%;
  margin-left: 0;
  margin-right: 0;
}

.tishi {
  text-align: center;
  color: lightgray;
}
</style>
