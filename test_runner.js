function test_runner(test_functions) {

    function execute_test(fn, results) {
        console.log("Running " + fn.name);

        var passed = false;
        try {
            let result = fn();
            passed = true;
        } catch (e) {
            if (e.name == 'AssertionFailedException') {
                results.push({msg: fn.name + " assertion failed with message: " + e.message});
            } else {
                results.push({msg: fn.name + " ERROR"});
            }
        }

        var status = passed ? 'passed' : 'failed';
        let msg = fn.name + " " + status;
        console.log(msg);
    }

    function fail(name, msg, results) {
        console.log(msg);
        results.push({name: name, msg: msg});
        return 0;
    }

    function assert(name, condition, results) {
        if (condition) {
            console.log("Assertion OK");
            return 1;
        }

        return fail(name, "Failed assertion", results);
    }

    return function() {
        console.log("Running tests!");
        const results = [];

        for (i=0; i<test_functions.length; i++) {
            execute_test(test_functions[i], results);
        }

        return results;
    };
}

function assert(condition, msg) {
    if (!condition) {
        throw {
            name: 'AssertionFailedException',
            msg: msg
        };
    }
}


function my_test1() {
    assert(1==1);
}

function my_test2() {
    fail(1==2);
}

let results = test_runner([my_test1, my_test2])();
console.log(results);






