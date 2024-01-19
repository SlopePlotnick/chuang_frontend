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
          <!-- 添加文件按钮 -->
          <div class="col-3" style="padding: 0; width: 95%; margin: 5px auto">
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
          <!--          点击加号按钮后出现操作选项 用collapse方式展现-->
          <div style="margin-bottom: 10px" class="collapse" id="collapseAdd">
            <div class="card card-body">
              <!--              创建知识库按钮-->
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
              <!--              上传文件按钮-->
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
              <!--              点击对应操作后出现该操作的表单 用collapse方式显示-->
              <div
                style="margin-top: 10px"
                class="collapse"
                id="collapseExample"
              >
                <!--              知识库创建表单-->
                <!--                一个提示-->
                <div
                  v-if="add_kb_start === true"
                  class="alert alert-warning"
                  role="alert"
                >
                  <storng>知识库名称不支持英文！</storng>
                </div>
                <div v-if="add_kb_start === true && add_file_start === false" class="card card-body">
                  <!--                  表单本体-->
                  <div class="input-group mb-3">
                    <!--                    输入标签-->
                    <input
                      type="text"
                      class="form-control"
                      placeholder="新建知识库名称"
                      aria-label="新建知识库名称"
                      aria-describedby="button-addon2"
                      v-model="new_name"
                    />
                    <!--                    确认按钮-->
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
                  <!--                  提示组件-->
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
                  <!--                  提示信息 用collapse方式显示-->
                  <div class="collapse" id="collapseKu">
                    <!--                    创建中-->
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
                    <!--                    创建失败-->
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
                    <!--                    创建成功-->
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
                <!--                上传文件组件-->
                <div v-if="add_file_start === true && add_kb_start === false" class="card card-body">
                  <!--                  表单本体-->
                  <form class="was-validated">
                    <div class="mb-3">
                      <!--                      选项卡-->
                      <select
                        v-model="choice"
                        class="form-select"
                        required
                        aria-label="select example"
                      >
                        <option selected>请选择要传输的文件</option>
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
                      <!--                      文件上传框-->
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
                  <!--                  上传按钮-->
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
                  <!--                  提示组件 collapse方式显示-->
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
                    <!--                    上传中-->
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
                    <!--                    上传失败-->
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
                    <!--                    上传成功-->
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
                      <div>文件上传成功 刷新以查看结果</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 索引栏 -->
        <div>
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
        <!--        知识库名称-->
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
        <!--        删除知识库按钮-->
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
        <!--        弹窗 警告用户是否删除-->
        <!--        弹窗页面1-->
        <div
          class="modal fade"
          id="staticKu"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticKuLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <!--                弹窗标题-->
                <h1 class="modal-title fs-5" id="staticKuLabel">Warning</h1>
                <!--                关闭按钮-->
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <!--              提示信息-->
              <div class="modal-body">
                您确定要删除知识库{{ current_class_name }}吗？该操作<strong
                  >不可撤销</strong
                >
              </div>
              <div class="modal-footer">
                <!--                取消按钮-->
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  取消
                </button>
                <!--                确定按钮-->
                <button
                  @click="delete_kb"
                  type="button"
                  class="btn btn-danger"
                  data-bs-target="#staticKu2"
                  data-bs-toggle="modal"
                >
                  确定
                </button>
              </div>
            </div>
          </div>
        </div>
        <!--        弹窗页面2-->
        <div
          class="modal fade"
          id="staticKu2"
          aria-hidden="true"
          aria-labelledby="staticKuLabel2"
          tabindex="-1"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticKuLabel2">Warning</h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">页面将刷新供您检查结果</div>
              <div class="modal-footer">
                <!--                取消按钮-->
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                  @click="refresh"
                >
                  确定
                </button>
              </div>
            </div>
          </div>
        </div>
        <!--        没有选中知识库时的提示信息-->
        <div v-if="current_class_name === ''" class="tishi">
          点击左侧知识库名称以预览知识库
        </div>
        <!--        分割线-->
        <hr />
        <!--        正式展示文章-->
        <div
          style="margin-top: 5px"
          v-for="pas in current_passages"
          :key="pas.id"
          class="list-group"
        >
          <a
            href="#"
            class="list-group-item list-group-item-action"
            style="margin-bottom: 10px"
          >
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{ pas.title }}</h5>
            </div>
            <p class="mb-1 text-truncate">{{ pas.content }}</p>
            <div
              style="width: 100%"
              class="btn-group"
              role="group"
              aria-label="Basic mixed styles example"
            >
              <button
                @click.stop="delete_file(pas.title)"
                type="button"
                class="btn btn-outline-danger"
                data-bs-toggle="modal"
                data-bs-target="#staticFile"
              >
                删除
              </button>
              <button
                @click.stop="download_file(pas.title)"
                type="button"
                class="btn btn-outline-success"
              >
                下载
              </button>
            </div>
          </a>
        </div>
        <div
            class="modal fade"
            id="staticFile"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticFileLabel"
            aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <!--                弹窗标题-->
                <h1 class="modal-title fs-5" id="staticKuLabel">Warning</h1>
                <!--                关闭按钮-->
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                ></button>
              </div>
              <!--              提示信息-->
              <div class="modal-body">
                您确定要删除该文件吗？该操作<strong
              >不可撤销</strong
              >
              </div>
              <div class="modal-footer">
                <!--                取消按钮-->
                <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                >
                  取消
                </button>
                <!--                确定按钮-->
                <button
                    @click="delete_file"
                    type="button"
                    class="btn btn-danger"
                    data-bs-target="#staticKu2"
                    data-bs-toggle="modal"
                >
                  确定
                </button>
              </div>
            </div>
          </div>
        </div>
        <!--        弹窗页面2-->
        <div
            class="modal fade"
            id="staticFile2"
            aria-hidden="true"
            aria-labelledby="staticFileLabel2"
            tabindex="-1"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticKuLabel2">Warning</h1>
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">页面将刷新供您检查结果</div>
              <div class="modal-footer">
                <!--                取消按钮-->
                <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                    @click="refresh"
                >
                  确定
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 右栏 -->
      <div
        class="col-6"
        style="padding-top: 10px; margin-right: 0; margin-left: 0"
      >
        <div
          style="text-align: center"
          class="alert alert-success"
          role="alert"
        >
          检索区
        </div>
        <div class="card">
          <div class="card-body">
            <form>
              <div class="row mb-3">
                <label for="keyword" class="col-sm-2 col-form-label"
                  >关键词(必填)</label
                >
                <div class="col-sm-10">
                  <input
                    v-model="key_word"
                    type="text"
                    class="form-control"
                    id="keyword"
                    required
                    placeholder="请输入关键词"
                  />
                </div>
              </div>
              <div class="row mb-3">
                <label for="kb_choice" class="col-sm-2 col-form-label"
                  >知识库(必填)</label
                >
                <div class="col-sm-10">
                  <select
                    v-model="search_choice"
                    class="form-select"
                    required
                    aria-label="select example"
                    id="kb_choice"
                  >
                    <option selected>请选择要搜索的知识库</option>
                    <option
                      v-for="name in name_ku"
                      :key="name.id"
                      :value="name.id"
                    >
                      {{ name.class_name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="row mb-3">
                <label for="topk" class="col-sm-2 col-form-label"
                  >匹配向量数</label
                >
                <div class="col-sm-10">
                  <input
                    v-model="top_k"
                    type="number"
                    class="form-control"
                    id="topk"
                    min="0"
                    max="20"
                    step="1"
                    placeholder="可输入0-20的整数 非必填"
                  />
                </div>
              </div>
              <button
                @click="search"
                style="width: 100%"
                type="button"
                class="btn btn-outline-success"
                data-bs-toggle="collapse"
                data-bs-target="#collapseSearch"
                aria-expanded="false"
                aria-controls="collapseSearch"
              >
                Search
              </button>
            </form>
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
            <div style="margin-top: 5px" class="collapse" id="collapseSearch">
              <!--        检索中-->
              <div
                v-if="search__finish === false"
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
                <div>模型检索中</div>
              </div>
              <!--        检索失败-->
              <div
                v-if="search_success === false && search_finish === true"
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
                <div>检索失败</div>
              </div>
              <!--        检索成功-->
              <div
                v-if="search_success === true && search_finish === true"
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
                <div>检索成功</div>
              </div>
              <!--              展示搜索结果-->
              <div v-if="search_success === true && search_finish === true">
                <ol
                  v-for="ans in search_ans"
                  :key="ans.id"
                  class="list-group list-group-numbered"
                >
                  <li
                    style="margin: 2.5px auto" class="list-group-item d-flex justify-content-between align-items-start"
                  >
                    <div class="ms-2 me-auto">
                      <div class="fw-bold">{{ ans.metadata.source }}</div>
                      {{ ans.page_content }}
                    </div>
                  </li>
                </ol>
              </div>
              <!--        重新搜索的按钮-->
              <button
                @click="research"
                style="width: 100%; margin-top: 5px;"
                v-if="search_success === true"
                type="button"
                class="btn btn-outline-success"
              >
                重新搜索
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!--  未登陆时的提示信息-->
  <div v-else>
    <div class="alert alert-primary" role="alert" style="text-align: center">
      当前未登陆 请前往
      <router-link :to="{ name: 'login' }" class="alert-link">登陆</router-link>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import $ from "jquery";
// import router from "../router/index";

export default {
  name: "HomeView",

  setup: () => {
    // 存储知识库信息
    let classifications = ref([]);
    // 存储知识库名称列表`
    let name_ku = ref([]);
    // 新建知识库名称
    let new_name = ref("");
    // 当前类下所有的文章
    let current_passages = ref([]);
    // 当前所在的文章的类的id 数据类型是整型
    let current_class_id = ref();
    //当前所在类的名称
    let current_class_name = ref("");
    // 添加知识库状态
    let add_kb_start = ref(false);
    // 添加文件状态
    let add_file_start = ref(false);
    // 存储文件信息
    let file = ref(null);
    // 知识库选择
    let choice = ref();
    // 文件传输状态
    let file_finish = ref(false);
    let file_success = ref(false);
    // 知识库创建状态
    let ku_finish = ref(false);
    let ku_success = ref(false);
    // 知识库删除状态
    let de_ku_finish = ref(false);
    let de_ku_success = ref(false);
    // 选中的展示的唯一的文章
    let one_passage = reactive({});
    // 检索关键字
    let key_word = ref("");
    // 选择的知识库
    let search_choice = ref();
    // 匹配向量数
    let top_k = ref();
    // 检索状态
    let search_finish = ref(false);
    let search_success = ref(false);
    let search_ans = ref([]);

    // 直接从前端获取知识库信息 存入classifications
    // 获取知识库列表
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

    // 单独获取知识库名称列表 存入name_ku
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

    //展示具体文章事件 同时使用类id和文章id进行查找 保证结果唯一
    const display_one_pas = (pas_id) => {
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
    };

    const get_id = (cla_id) => {
      let id = String(cla_id);
      return "panelsStayOpen-collapse" + id;
    };

    const get_data_bs_target = (cla_id) => {
      let id = String(cla_id);
      return "#panelsStayOpen-collapse" + id;
    };

    // 进入创建知识库状态
    const add_kb = () => {
      add_kb_start.value = true;
    };

    // 进入上传文件状态
    const add_file = () => {
      add_file_start.value = true;
    };

    // 转换创建知识库状态
    const over_add_kb = () => {
      add_kb_start.value = !add_kb_start.value;
    };

    // 转换上传文件状态
    const over_add_file = () => {
      add_file_start.value = !add_file_start.value;
    };

    // 获取文件信息
    const getFile = (e) => {
      file.value = e.target.files[0];
    };

    // 调用创建知识库api
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

    // 上传文件
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

    // 删除知识库
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

    // 刷新操作
    const refresh = () => {
      window.location.reload();
    };

    const delete_file = (pas_title) => {
      console.log(current_class_name.value);
      console.log(typeof current_class_name.value);
      console.log(pas_title);
      console.log(typeof pas_title);

      $.ajax({
        url: "https://u8606i6360.vicp.fun/knowledge_base/delete_docs",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
          knowledge_base_name: current_class_name.value,
          file_names: [pas_title],
          delete_content: true,
          not_refresh_vs_cache: true,
        }),
        success: (resp) => {
          console.log("文件删除成功");
          console.log(resp.msg);
        },
        error: (resp) => {
          console.log("文件删除失败");
          console.log(resp);
        },
      });
    };

    const download_file = (pas_title) => {
      console.log(current_class_name.value);
      console.log(typeof current_class_name.value);
      console.log(pas_title);
      console.log(typeof pas_title);

      $.ajax({
        url: "https://u8606i6360.vicp.fun/knowledge_base/download_doc?knowledge_base_name=astronautics&file_name=test.txt",
        type: "GET",
        success: (resp) => {
          console.log("文件下载成功");
          console.log(typeof resp);
        },
        error: (resp) => {
          console.log("文件下载失败");
          console.log(resp);
        },
      });
    };

    // 调用搜索api进行搜索
    const search = () => {
      $.ajax({
        url: "https://u8606i6360.vicp.fun/knowledge_base/search_docs",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
          query: key_word.value,
          knowledge_base_name: name_ku.value[search_choice.value].class_name,
          top_k: top_k.value,
        }),
        success: (resp) => {
          console.log("知识库搜索成功");
          for (let i = 0; i < resp.length; i++) {
            let obj = { ...resp[i] };
            obj.id = i;
            search_ans.value.push(obj);
          }
          search_finish.value = true;
          search_success.value = true;
        },
        error: (resp) => {
          console.log("知识库搜索失败");
          search_finish.value = true;
          search_success.value = false;
          console.log(resp);
        },
      });
    };

    const research = () => {
      search_finish.value = false;
      search_success.value = false;
    };

    return {
      classifications,
      current_passages,
      current_class_id,
      one_passage,
      current_class_name,
      add_kb_start,
      add_file_start,
      choice,
      name_ku,
      file_finish,
      file_success,
      new_name,
      ku_finish,
      ku_success,
      de_ku_finish,
      de_ku_success,
      key_word,
      search_choice,
      top_k,
      search_finish,
      search_success,
      search_ans,
      display_all_pas,
      display_one_pas,
      get_id,
      get_data_bs_target,
      add_kb,
      add_file,
      over_add_kb,
      over_add_file,
      getFile,
      uploadFile,
      create_knowledge_base,
      delete_kb,
      refresh,
      delete_file,
      download_file,
      search,
      research,
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
