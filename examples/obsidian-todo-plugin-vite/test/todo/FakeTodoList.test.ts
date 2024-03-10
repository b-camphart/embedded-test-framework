import { describe, it, beforeEach, beforeAll, afterAll, afterEach } from "vitest";
import { createModifiedFileReviewTodoListContract } from "../../contracts/todo/create/modifiedFileReview.contract";
import { FakeTodoList } from "./FakeTodoList";

describe(`Fake To-Do List`, () => {
	createModifiedFileReviewTodoListContract({
		describe,
		it,
		beforeEach,
        beforeAll,
        afterAll,
        afterEach
	})(() => new FakeTodoList());
});
