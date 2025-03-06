import { test } from "@playwright/test";
import { TodoPage } from "../page-objects/pages/todo-page";

test.describe("Todo App tests", async () => {
  test("TL-19 common checks", async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.open();
    await todoPage.createTask("Task 1");
    await todoPage.createTask("Task 2");
    await todoPage.createTask("Task 3");
    await todoPage.checkTaskCount(3);
    await todoPage.tasks.removeTask("Task 1");
    await todoPage.tasks.completeTask("Task 2");
    await todoPage.tasks.checkTaskCompleted("Task 2");
  });
});
