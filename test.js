var test = {
    run : function test () {
        console.log("");
        console.log("+ -------------------- +");
        console.log("| testing              |");
        console.log("+ -------------------- +");
        console.log("");
        for (let i = 0; i < this.case.length; i++) {
            this.case[i]();
        }
    },
    case : [
        function () {
            console.log("no tests so far");
        }
    ]
}
