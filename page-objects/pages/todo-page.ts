import { expect, Locator, Page } from "@playwright/test";
import { Task } from "../organisms/Task";

export class TodoPage {
  private readonly url = "https://todo-app.tallinn-learning.ee";
  readonly page: Page;
  readonly newTaskInputField: Locator;
  readonly footer: Locator;
  readonly todoList: Locator;
  readonly tasks: Task;
  readonly activeButton: Locator;
  readonly completedButton: Locator;
  readonly clearCompletedButton: Locator;
  readonly allTasksButton: Locator;
  readonly todoTaskField: Locator;
  readonly toggleAll: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newTaskInputField = page.getByTestId("text-input");
    this.footer = page.getByTestId("footer");
    this.todoList = page.getByTestId("todo-list");
    this.tasks = new Task(this.todoList);
    this.activeButton = page.getByTestId('[href="#/active"]'); //<a class="selected" href="#/active">Active</a>
    this.completedButton = page.getByTestId('[href="#/completed"]'); //<a class="" href="#/completed">Completed</"a>
    this.clearCompletedButton = page.getByTestId(".clear-completed"); //<button class="clear-completed">Clear completed</button>
    this.allTasksButton = page.locator('[href="#/"]'); //class="selected"
    this.todoTaskField = page.locator('data-testid="todo-item-label"');
    this.toggleAll = page.locator('data-testid="toggle-all"');
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

  async checkFooterButtonsAreVisible(): Promise<void> {
    await this.allTasksButton.isVisible();
    await this.activeButton.isVisible();
    await this.completedButton.isVisible();
    await this.clearCompletedButton.isVisible();
  }

  async checkActiveButtonFunctionality(innerText: string): Promise<void> {
    const activeButton = this.activeButton.locator("button", {
      hasText: "Active",
    });
    await expect(activeButton).toBeEnabled();
    await activeButton.hover();
    await activeButton.click();
    //const activeTasks = await this.activeButton.locator('.task.active');
    //await expect(activeTasks).toHaveCountGreaterThan(0);
    await expect(activeButton).toHaveClass(".selected");
    expect(this.todoTaskField).not.toBeNull;
  }

  // async clearCompletedButtonFunctionality(innerText: string): Promise<void> {
  //   await this.clearCompletedButton.isVisible();
  //   const locator = this.clearCompletedButton.locator("li", { hasText: innerText });
  //   await expect(locator).toHaveText(innerText);
  // }

  // async checkClearCompletedButtonFunctionality(): Promise<void> {
  //   await ...
  // }
}
