// This will be the object that will contain the Vue attributes
// and be used to initialize it.
let app = {};


// Given an empty app object, initializes it filling its attributes,
// creates a Vue instance, and then initializes the Vue instance.
let init = (app) => {

    // This is the Vue data.
    app.data = {
        // Complete as you see fit.
        display_court_layout: false;
        table_rows: [],
    };

    app.enumerate = (a) => {
        // This adds an _idx field to each element of the array.
        let k = 0;
        a.map((e) => {e._idx = k++;});
        return a;
    };


    app.edit_reservation = function() {                     // Function definition (aka what it does)
        // TODO;
    };


    app.delete_reservation = function() {                   // Function definition
        // TODO;
    };



    // This contains all the methods.
    app.methods = {                                          // This is where we define methods called in html file
        edit_reservation: app.edit_reservation,              // This is called in the row in table_rows when doing table
        delete_reservation: app.delete_reservation,          // This is called in the row in table_rows when doing table
    };

    // This creates the Vue instance.
    app.vue = new Vue({
        el: "#vue-target",
        data: app.data,
        methods: app.methods
    });

    // And this initializes it.
    app.init = () => {
        // Put here any initialization code.
        // Typically this is a server GET call to load the data.

        axios.get(load_reservation_table_url).then(function(response) {              // axios library allows communication with the server (1)
            app.vue.table_rows = app.enumerate(response.data.table_rows);       // fetches a row from database and puts a number on it
        });


    };

    // Call to the initializer.
    app.init();
};

// This takes the (empty) app object, and initializes it,
// putting all the code i
init(app);
