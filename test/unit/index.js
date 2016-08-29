var testsContext = require.context('.', true, /\.spec$/);
// ['./ripple.spec']
testsContext.keys().forEach(testsContext);