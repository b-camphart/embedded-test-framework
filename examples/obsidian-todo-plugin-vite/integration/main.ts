import { Plugin } from "obsidian";
import RootTestSuite from "../../../modules/define/RootTestSuite";
import { obsidianFileTodoListTest } from "./todo/obsidianFileTodoList.intTest";
import ConsoleReporter from "../../../modules/report/ConsoleReporter";
import { enqueueSuite } from "../../../modules/run/enqueueSuite";

export default class IntTestPlugin extends Plugin {
	onload(): void {
		const builder = new RootTestSuite();

		// collect the tests
		obsidianFileTodoListTest(builder.bound(), this.app);

		const reporter = new ConsoleReporter();

		this.app.workspace.onLayoutReady(() => {
			const run = enqueueSuite("", builder.definition(), reporter);
			run(reporter, [], []);
		});
	}
}
