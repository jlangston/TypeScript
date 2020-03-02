// @strict: true
// @target: es2015

const foo = {
    test() {
        return true;
    }
}

if (foo.test) { // error
    console.log(true);
}

if (foo.test) { // ok
    foo.test;
}

const a = foo.test ? true : false; // error
const b = foo.test ? foo.test : false; // ok

function test() {}
if (test) { // error
    console.log(true);
}

if (test) { // ok
    test;
}

const a = test ? true : false; // error
const b = test ? test : false; // ok
