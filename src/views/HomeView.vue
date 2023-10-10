<template>
    <!-- 如果登陆成功 展示首页 -->
    <div v-if="$store.state.user.is_login" class="container">
        <div class="row">
            <!-- 左栏 -->
            <div class="col-3" style="background-color: rgb(248, 249, 250);
    border-style: solid;
    border-top: rgb(255, 255, 255);
    border-left: rgb(255, 255, 255);
    border-bottom: rgb(255, 255, 255);
    border-color: lightgray;
    border-width: 1px;

    padding-bottom: 100%;">
                <div class="row">
                    <!-- 搜索栏 -->
                    <div class="col-9" style="padding-left: 0;">
                        <nav class="navbar bg-body-tertiary">
                            <div class="container-fluid">
                                <form class="d-flex" role="search">
                                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                                    <button class="btn btn-sm btn-outline-success" type="submit">Search</button>
                                </form>
                            </div>
                        </nav>
                    </div>
                    <!-- 添加文件按钮 -->
                    <div class="col-3" style="padding: 0;">
                        <button @click="jumpToAdd" type="button" class="btn btn-light">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                class="bi bi-plus-square" viewBox="0 0 16 16">
                                <path
                                    d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                <path
                                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <!-- 索引栏 -->
                <div v-for="cla in classifications" :key="cla.id" class="accordion" id="accordionPanelsStayOpenExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                            <!-- 点击类名按钮时 触发display_all_pas事件 更新当前在中栏展示的所有文章 -->
                            <button @click="display_all_pas(cla.id)" class="accordion-button" type="button"
                                data-bs-toggle="collapse" :data-bs-target="get_data_bs_target(cla.id)" aria-expanded="true"
                                :aria-controls="get_id(cla.id)">
                                {{ cla.class_name }}
                            </button>
                        </h2>
                        <div :id="get_id(cla.id)" class="accordion-collapse collapse show"
                            aria-labelledby="panelsStayOpen-headingOne">
                            <div class="accordion-body">
                                <div v-for="pas in cla.passages" :key="pas.id" class="list-group">
                                    <a @click="display_one_pas(pas.id)" href="#"
                                        class="list-group-item list-group-item-action" style="margin-bottom: 10px;">
                                        {{ pas.title }}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="accordion-item">
                        <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false"
                                aria-controls="panelsStayOpen-collapseTwo">
                                Accordion Item #2
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse"
                            aria-labelledby="panelsStayOpen-headingTwo">
                            <div class="accordion-body">
                                <div class="list-group">
                                    <a href="#" class="list-group-item list-group-item-action">
                                        The current link item
                                    </a>
                                    <a href="#" class="list-group-item list-group-item-action">A second link item</a>
                                    <a href="#" class="list-group-item list-group-item-action">A third link item</a>
                                    <a href="#" class="list-group-item list-group-item-action">A fourth link item</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="panelsStayOpen-headingThree">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false"
                                aria-controls="panelsStayOpen-collapseThree">
                                Accordion Item #3
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse"
                            aria-labelledby="panelsStayOpen-headingThree">
                            <div class="accordion-body">
                                <div class="list-group">
                                    <a href="#" class="list-group-item list-group-item-action">
                                        The current link item
                                    </a>
                                    <a href="#" class="list-group-item list-group-item-action">A second link item</a>
                                    <a href="#" class="list-group-item list-group-item-action">A third link item</a>
                                    <a href="#" class="list-group-item list-group-item-action">A fourth link item</a>
                                </div>
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>
            <!-- 中栏 -->
            <div class="col-3" style="background-color: white;
    border-style: solid;
    border-top: rgb(255, 255, 255);
    border-left: rgb(255, 255, 255);
    border-bottom: rgb(255, 255, 255);
    border-color: lightgrey;
    border-width: 1px;

    padding-bottom: 100%;
    padding-top: 10px;">
                <div v-if="!(current_class_name === '')" class="alert alert-light" role="alert"
                    style="background-color: rgb(90, 130, 247); color: white;">
                    {{ current_class_name }}
                </div>
                <div v-else class="tishi">点击左侧分类名称以预览该类文本</div>
                <div v-for="pas in current_passages" :key="pas.id" class="list-group">
                    <a @click="display_one_pas(pas.id)" href="#" class="list-group-item list-group-item-action"
                        style="margin-bottom: 10px;">
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
            <div class="col-6" style="padding-top: 10px; margin-right: 0; margin-left: 0;">
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

                <div v-if="!(one_passage.title === undefined)" data-bs-spy="scroll" data-bs-target="#navbar-example3"
                    data-bs-smooth-scroll="true" class="scrollspy-example-2" tabindex="0">
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
        <div class="alert alert-primary" role="alert" style="text-align: center;">
            当前未登陆 请前往 <router-link :to="{ name: 'login' }" class="alert-link">登陆</router-link>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from 'vue';
import router from '../router/index';
import { useStore } from 'vuex';

export default {
    name: 'HomeView',

    setup: () => {
        const store = useStore();

        let classifications = ref(store.state.user.data);

        // 当前类下所有的文章
        let current_passages = ref([]);
        // 当前所在的文章的类的id 数据类型是整型
        let current_class_id = ref();
        //当前所在类的名称
        let current_class_name = ref('');

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
                            one_passage.content = classifications.value[i].passages[j].content;
                            one_passage.title = classifications.value[i].passages[j].title;
                            break;
                        }
                    }
                }
            }

            // console.log('当前one_passage为');
            // console.log(one_passage);
        };

        const jumpToAdd = () => {
            router.push({ name: 'addfile' });
        };

        const get_id = (cla_id) => {
            var id = String(cla_id);
            return 'panelsStayOpen-collapse' + id;
        };

        const get_data_bs_target = (cla_id) => {
            var id = String(cla_id);
            return '#panelsStayOpen-collapse' + id;
        };

        let is_searching = ref('');

        return {
            classifications,
            current_passages,
            display_all_pas,
            current_class_id,
            display_one_pas,
            one_passage,
            jumpToAdd,
            get_id,
            get_data_bs_target,
            current_class_name,
            is_searching,
        };
    }
}
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
    height: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: lightgray;
}
</style>