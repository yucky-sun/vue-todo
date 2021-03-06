// https://jp.vuejs.org/v2/examples/todomvc.html
var STORAGE_KEY = 'todos-vuejs-demo'
var todoStorage = {
  fetch: function() {
    var todos = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    )
    todos.forEach(function(todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

const app = new Vue({
    el: '#app', 

    data: {
        todos: [],
        current: -1,
        options: [
            { value: -1, label: '全て' },
            { value: 0,  label: '作業中' },
            { value: 1,  label: '完了' }
        ]
    },

    computed: {
        computedTodos: function() {
            return this.todos.filter(function (el) {
                return this.current < 0 ? true : this.current === el.state
            }, this)
        },
        labels() {
            return this.options.reduce(function (a, b) {
                return Object.assign(a, { [b.value]: b.label })
            }, {})
        }
    },

    watch: {
        todos: {
            // 引数をウォッチしているプロパティの変更後の値
            handler: function (todos) {
                todoStorage.save(todos)
            },
            // deepオプションでネストしてるデータも監視
            deep: true
        }
    },

    created() {
        // インスタンス作成時に自動でfetch()する
        this.todos = todoStorage.fetch()
    },


    methods: {
        // Todo　追加処理
        doAdd: function(event, value) {
            // refで名前をつけておいたようをを参照
            var comment = this.$refs.comment
            // 入力がなければそのままreturn
            if (!comment.value.length) {
                return
            }
            // { 新しいID, コメント, 作業状態}のオブジェクトを
            // 現在のtodosリストにpushする
            // 作業状態「state」はデフォルトでは「作業中=0」で作成
            this.todos.push({
                id: todoStorage.uid++,
                comment: comment.value,
                state: 0
            })
            // フォーム要素を空にする
            comment.value = ''
        },

        // 状態変更の処理
        doChangeState: function(item) {
            item.state = item.state ? 0 : 1
        },

        // 削除の処理
        doRemove: function(item) {
            var index = this.todos.index0f(item)
            this.todos.splice(index, 1)
        }
    }
})