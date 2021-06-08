// This will be the object that will contain the Vue attributes
// and be used to initialize it.
let app = {};


// Given an empty app object, initializes it filling its attributes,
// creates a Vue instance, and then initializes the Vue instance.
let init = (app) => {

    // This is the Vue data.
    app.data = {
        adding_reservation_day: "",
        adding_reservation_time: "",
        adding_reservation_location: "",
        adding_reservation_court_number: "",
        table_rows: [],
    };

    app.edit_reservation = function() {                     // Function definition (aka what it does)
        // TODO;
    };


    app.delete_reservation = function (row_idx) {                   // Function definition
        let id = app.vue.table_rows[row_idx].id;
        axios.get(delete_reservation_url, {params: {id: id}}).then(function (response) {
            for (let i = 0; i < app.vue.table_rows.length; i++) {
                if (app.vue.table_rows[i].id === id) {
                    app.vue.table_rows.splice(i, 1);
                    app.enumerate(app.vue.table_rows);
                    break;
                }
            }
        })
    };

    app.enumerate = (a) => {
        // This adds an _idx field to each element of the array.
        let k = 0;
        a.map((e) => {e._idx = k++;});
        return a;
    };


    app.add_new_reservation = function () {
        axios.post(add_new_reservation_url,
        {

            reservation_day: app.vue.adding_reservation_day,
            reservation_time: app.vue.adding_reservation_time,
            reservation_location: app.vue.adding_reservation_location,
            reservation_court_number: app.vue.adding_reservation_court_number,
        }).then(function (response) {
            app.vue.table_rows.push({
                id: response.data.id,
                reservation_day: app.vue.adding_reservation_day,
                reservation_time: app.vue.adding_reservation_time,
                reservation_location: app.vue.adding_reservation_location,
                reservation_court_number: app.vue.adding_reservation_court_number,
            });
            app.enumerate(app.vue.table_rows);
            app.reset_fields();
        });
// Maybe try to call redirect home here??????

    };

    app.reset_fields = function () {
        app.vue.adding_reservation_day = "";
        app.vue.adding_reservation_time = "";
        app.vue.adding_reservation_location = "";
        app.vue.adding_reservation_court_number = "";
    };



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
        edit_reservation: app.edit_reservation,              // This is called in the row in table_rows when doing table
        delete_reservation: app.delete_reservation,          // This is called in the row in table_rows when doing table
        add_new_reservation: app.add_new_reservation

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
