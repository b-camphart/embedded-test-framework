# Embedded Testing Framework
## Introduction
The Embedded Testing Framework offers a flexible solution for developers seeking to embed and execute tests within specific development environments. Whether you're working on plugin development, application testing, or any other scenario where tests need to be tightly integrated with the environment, this framework provides the tools you need to streamline the testing process.

## Modules
### Define
The `define` module provides interfaces for defining test suites and test cases. It includes a default implementation of a test suite builder [RootTestSuite](./modules/define/RootTestSuite.ts) to help you get started quickly.

### Run
The `run` module provides methods for running defined test suites. It includes two main functions:

- `enqueueSuite`: Enqueues a test suite and all descendant tests for later execution. It allows for structured reporting of suite and test events.
- `enqueueTest`: Enqueues an individual test for later execution within a test suite. This function is useful for running tests at a lower level of granularity.

### Report
The `report` module provides interfaces for reporting test results. It includes a default implementation [ConsoleReporter](./modules/report/ConsoleReporter.ts) for displaying test results in the console. Users can also create custom reporters to integrate with other reporting tools or systems.

### Global
This module provides a way to simply import the test builder methods: `describe`, `it`, etc.  It uses the default `RootTestSuite`, but you can change it to any suite you'd like.

## Usage
To use the library, follow these steps:

1. **Choose Modules**: Select the modules that best fit your testing needs. You can use the define module to define test suites and cases, the run module to run tests, and the report module to report test results.
2. **Define Tests**: Define your test suites and test cases using the interfaces provided in the define module. You can use the default implementation (RootTestSuite) to build test suites quickly.
3. **Run Tests**: Use the methods provided in the run module (enqueueSuite and enqueueTest) to enqueue test suites and tests for later execution. This allows for structured execution of tests and reporting of test events.
4. **Report Results**: Choose a reporter from the report module to display or report test results. You can use the default ConsoleReporter to display results in the console, or create custom reporters for more advanced reporting needs.

## Example
Tests are organized within test suites.  You can use the default `RootTestSuite`, or build your own.
```typescript
import { RootTestSuite } from "define/RootTestSuite";

const suite = new RootTestSuite();
```
Within which, you can use the standard methods you're used to: `describe`, `it`, `beforeAll`, `beforeEach`, `afterEach`, and `afterAll`.
```typescript
suite.describe(`some functionality`, () => {

    suite.beforeAll(() => {});
    suite.beforeEach(() => {});

    suite.afterEach(() => {});
    suite.afterAll(() => {});

    suite.it(`runs tests`, () => {

    });

    suite.it(`runs async tests`, async () => {

    });

});
```
You can also destructure the methods, almost like you would when importing them from a more standard test library.  But, be careful with this!  You'll need to bind the methods:
```typescript
let { describe, it, beforeAll, beforeEach, afterEach, afterAll } = suite;

describe = describe.bind(suite);
it = it.bind(suite);
beforeAll = beforeAll.bind(suite);
beforeEach = beforeEach.bind(suite);
afterEach = afterEach.bind(suite);
afterAll = afterAll.bind(suite);
```
Because this is an expected, common use case, the `RootTestSuite` provides a `bound` method that will do this for you:
```typescript
const { describe, it, beforeAll, beforeEach, afterEach, afterAll } = suite.bound();
```
If you build your own test suite, keep this in mind.

## Running Tests
After defining your test suite and test cases, you need to set up a reporter to capture and display test results. The library provides a ConsoleReporter for displaying results in the console:
```typescript
import { ConsoleReporter } from "report/ConsoleReporter";

const reporter = new ConsoleReporter();
```
Finally, use the `enqueueSuite` function to enqueue the test suite for execution. This function returns a function that can be called to start running the tests:
```typescript
import { enqueueSuite } from 'testing-library';

const run = enqueueSuite("", suite.definition(), reporter);

// Run the tests
run(reporter, [], []);
```
You can pass an empty string "" as the identifier for the test suite. Optionally, you can provide beforeEach and afterEach functions to set up and tear down the entire test environment.

## Cusomization
Feel free to customize the library by creating your own implementations of test suites, reporters, or other components. The modular design of the library allows for flexibility and extensibility to suit your specific testing requirements.

## Contribution
Contributions to the Embedded Testing Framework are welcome! Whether it's reporting bugs, suggesting features, or submitting pull requests, your contributions help improve the framework for the entire community.

## License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
