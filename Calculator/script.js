let vm = new Vue({
    el: "#app",
    delimiters: ["[[", "]]"],
    data: {
        expression: "",
        result: "",
        history: [],
        history_value: "",
        is_active: false,
    },
    mounted: function() {
        // function to handle keyboard events
        let self = this;
        document.addEventListener("keyup", function keyboard_display() {
            if (event.key <= 9 || event.key === "+" || event.key === "-" || event.key === "*" || event.key === "/" || event.key === ".") {
                self.expression += event.key;
                if (self.history_value === self.history[0] && self.is_active === true) {
                    self.expression = "";
                    self.result = "";
                    self.expression += event.key;
                    self.is_active = false;
                }
            } else if (event.key === "Enter") {
                self.calculate();
            } else if (event.key === "Backspace") {
                self.backspace();
            } else if (event.key === "Escape") {
                self.clear_display();
                self.close_history_modal();
            } else if (event.key === "c" || event.key === "C") {
                self.clear_display();
                self.close_history_modal();
            } else if (event.key === "h" || event.key === "H") {
                self.show_history();
            }
        });
    },
    methods: {
        display(ans) {
            // display the expression values
            if (this.expression.length < 16) {
                this.expression += ans;
            } else {
                this.expression = ans;
                this.result = "";
            }
            if (this.history_value === this.history[0] && this.is_active === true) {
                this.expression = "";
                this.result = "";
                this.expression += ans;
                this.is_active = false;
            }
        },
        perform_arithmetic_operation() {
            // function performs arithmetic operation 
            if (this.expression.includes("+")) {
                let result_data = this.expression.split("+");
                return parseFloat(result_data[0]) + parseFloat(result_data[1]);
            } else if (this.expression.includes("-")) {
                let result_data = this.expression.split("-");
                return parseFloat(result_data[0]) - parseFloat(result_data[1]);
            } else if (this.expression.includes("*")) {
                let result_data = this.expression.split("*");
                return parseFloat(result_data[0]) * parseFloat(result_data[1]);
            } else {
                let result_data = this.expression.split("/");
                return parseFloat(result_data[0]) / parseFloat(result_data[1]);
            }
        },
        calculate() {
            // display the result then store expression and result into history
            this.result = `= ${this.perform_arithmetic_operation()}`;
            let history_data = {
                "expression_value": this.expression,
                "result_value": this.result
            }
            for (let key in history_data) {
                this.history_value = `${history_data["expression_value"]} ${history_data["result_value"]}`;
            }
            this.history.push(this.history_value);
            this.history.reverse();
            this.is_active = true;
        },
        show_history() {
            document.getElementById("history-modal").classList.add("is-active");
        },
        close_history_modal() {
            document.getElementById("history-modal").classList.remove("is-active");
        },
        backspace() {
            this.expression = this.expression.slice(0, -1);
            this.result = "";
        },
        clear_display() {
            this.expression = "";
            this.result = "";
        },
    },
})
