import { expect, Locator, Page } from "@playwright/test";
import { Task } from "../organisms/Task";

export class TodoPage {
  private readonly url = "https://todo-app.tallinn-learning.ee";
  readonly page: Page;
  readonly newTaskInputField: Locator;
  readonly footer: Locator;
  readonly todoList: Locator;
  readonly tasks: Task;

  constructor(page: Page) {
    this.page = page;
    this.newTaskInputField = page.getByTestId("text-input");
    this.footer = page.getByTestId("footer");
    this.todoList = page.getByTestId("todo-list");
    this.tasks = new Task(this.todoList);
  }

  async open(): Promise<void> {
    await this.page.goto(this.url);
  }

  async createTask(text: string): Promise<void> {
    await this.newTaskInputField.fill(text);
    await this.newTaskInputField.press("Enter");
  }

  async checkTaskCount(expected_count: number): Promise<void> {
    const count = await this.tasks.taskLocator.count();
    expect(count).toBe(expected_count);
  }
}
