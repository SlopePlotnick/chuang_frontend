import $ from "jquery";
import { toRaw } from "vue";
// import jwt_decode from "jwt-decode";

const ModuleUser = {
  state: {
    user: {
      id: "",
      username: "",
      //这里为了测试拟造了数据
      data: [],
      // photo: "",
      // followerCount: 0,
      // access: "",
      // refresh: "",
      is_login: false,
    },
  },
  getters: {},
  //更新state的操作只能在mutations里进行 不能在actions里进行
  //不直接写在mutations里是习惯问题
  //另外需要注意的是 mutations里只能写同步的api 所以异步的api一般都放在actions里写
  mutations: {
    //state是要更新的state 后面的user是自己传的参数
    updateUser: (state, user) => {
      state.id = user.id;
      state.username = user.username;
      state.data = user.data;
      // state.photo = user.photo;
      // state.followerCount = user.followerCount;
      // state.access = user.access;
      // state.refresh = user.refresh;
      state.is_login = user.is_login;
    },
    //此处写法因为没有和后端统一测试所以存疑 需不需要加user
    updateData: (state, attr) => {
      let list = toRaw(state.user.data);
      let is_in = false;
      for (let cls of list) {
        if (attr.channelName === cls.class_name) {
          cls.passages.push({
            id: cls.passages.length + 1,
            title: attr.title,
            content: attr.content,
          });
          is_in = true;
          break;
        }
      }

      //若结束循环依然没有加入 则创建新类
      if (is_in === false) {
        list.push({
          class_name: attr.channelName,
          id: list.length + 1,
          passages: [
            {
              id: 1,
              title: attr.title,
              content: attr.content,
            },
          ],
        });
      }

      state.data = list;
      console.log(state.data);
    },
    updateKnowledge(state) {
      // 调用api获取知识库名称列表
      $.ajax({
        url: "https://u8606i6360.vicp.fun/knowledge_base/list_knowledge_bases",
        type: "GET",
        success: (resp) => {
          if (resp.msg === "success") {
            let name_ku = resp.data;
            let list = [];

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

              list.push(new_cls);
            }

            state.data = list;
            console.log("更新知识库信息成功");
          } else {
            console.log("更新知识库信息失败");
          }
        },
        error: () => {
          console.log("更新知识库信息api访问失败");
        },
      });
    },
    //此处将logout的逻辑写在了mutations中是因为该操作是同步的 且逻辑上相当于是对state的一次更新
    logout: (state) => {
      state.id = "";
      state.username = "";
      state.data = [];
      // state.photo = "";
      // state.followerCount = 0;
      // state.access = "";
      // state.refresh = "";
      state.is_login = false;
    },
  },
  actions: {
    // context是默认要传给login的参数 后面的data是自己传的
    // 一般都是传这样两个参数给login
    login: (context, data) => {
      $.ajax({
        //下面是获取token信息
        url: "http://192.168.43.171:8000/login",
        type: "POST",
        //注意这里的data类似于关键字 用来存储ajax调用api时需要传入的参数
        // 而上面的data是传入给login函数的参数 两者完全不同
        data: {
          username: data.username,
          password: data.password,
        },
        success: (resp) => {
          if (resp.result === "success") {
            // console.log(resp);
            //下面是调用mutations里的更新函数
            //api是context.commit
            context.commit("updateUser", {
              ...resp,
              // access: access,
              // refresh: refresh,
              is_login: true,
            });
            context.commit("updateKnowledge");
            data.success();
          } else {
            data.error();
          }
        },
        error: () => {
          console.log("访问api失败");
        },
      });
    },
  },
  modules: {},
};

export default ModuleUser;
