import { expect, Locator, Page } from "@playwright/test";
import { Task } from "../organisms/Task";

export class TodoPage {
  private readonly url = "https://todo-app.tallinn-learning.ee";
  readonly page: Page;
  readonly newTaskInputField: Locator;
  readonly footer: Locator;
  readonly todoList: Locator;
  readonly tasks: Task;
  readonly allButton: Locator;
  readonly activeButton: Locator;
  readonly completedButton: Locator;
  readonly clearCompletedButton: Locator;
  readonly toggleAllButton: Locator;
  readonly todoItemField: Locator;
  readonly toggleItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newTaskInputField = page.getByTestId("text-input");
    this.footer = page.getByTestId("footer");
    this.todoList = page.getByTestId("todo-list");
    this.tasks = new Task(this.todoList);
    this.allButton = page.locator('[href="#/"]'); //('a.selected');
    this.activeButton = page.locator('[href="#/active"]');
    this.completedButton = page.locator('[href="#/completed"]');
    this.clearCompletedButton = page.locator(".clear-completed");
    this.toggleAllButton = page.getByTestId("toggle-all");
    this.todoItemField = page.getByTestId("todo-item-label");
    this.toggleItem = page.locator(".toggle");
  }

  async open(): Promise<void> {
    await this.page.goto(this.url);
  }

  async createTask(text: string): Promise<void> {
    await this.newTaskInputField.fill(text);
    await this.newTaskInputField.press("Enter");
  }

  async allTasks(): Promise<void> {
    await this.allButton.hover();
    await this.allButton.click();
  }

  async checkTaskCount(expected_count: number): Promise<void> {
    const count = await this.tasks.taskLocator.count();
    expect(count).toBe(expected_count);
  }

  async checkFooterButtonsAreVisible(): Promise<void> {
    await this.allButton.isVisible();
    await this.activeButton.isVisible();
    await this.completedButton.isVisible();
    await this.clearCompletedButton.isVisible();
  }
}
