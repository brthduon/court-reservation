// This will be the object that will contain the Vue attributes
// and be used to initialize it.
let app = {};


// Given an empty app object, initializes it filling its attributes,
// creates a Vue instance, and then initializes the Vue instance.
let init = (app) => {

    // This is the Vue data.
    app.data = {
        table_rows: [],
    };

    app.enumerate = (a) => {
        // This adds an _idx field to each element of the array.
        let k = 0;
        a.map((e) => {e._idx = k++;});
        return a;
    };


//    app.add_post_button = function () {
//// This will give the data to the server
//        axios.post(add_new_post_url,
//        {
//// Send data to the server in controller.py through add_new_post
//            post_data: app.vue.add_post_data,
//        }).then(function (response) {
//            app.vue.table_rows.push({
//// Retrieves back the id from the server to access it again
//                id: response.data.id,
//                post_data: app.vue.add_post_data,
//            });
//            app.enumerate(app.vue.table_rows);
//            app.reset_form();
//            app.set_add_status(false);
//
//        });
//    };

//    app.reset_form = function () {
//        app.vue.add_post_data = "";
//    };

//    app.delete_post_button = function (row_idx) {
//        let id = app.vue.table_rows[row_idx].id;
//        axios.get(delete_post_url, {params: {id: id}}).then(function (response) {
//            for(let i = 0; i < app.vue.table_rows.length; i++) {
//                if (app.vue.table_rows[i].id === id) {
//                    app.vue.table_rows.splice(i, 1);
//                    app.enumerate(app.vue.table_rows);
//                    break;
//                }
//            }
//        });
//    };

//    app.set_add_status = function (new_status) {
//        app.vue.add_mode = new_status;
//    };


    // This contains all the methods.
    app.methods = {
        add_post_button: app.add_post_button,
        delete_post_button: app.delete_post_button,

    };

    // This creates the Vue instance.
    app.vue = new Vue({
        el: "#vue-target",
        data: app.data,
        methods: app.methods,
    });

    // And this initializes it.
    app.init = () => {
        // Put here any initialization code.
        // Typically this is a server GET call to load the data.
        axios.get(load_reservation_table_url).then(function(response) {
            app.vue.table_rows = app.enumerate(response.data.table_rows);
        });
    };

    // Call to the initializer.
    app.init();
};

// This takes the (empty) app object, and initializes it,
// putting all the code i
init(app);
