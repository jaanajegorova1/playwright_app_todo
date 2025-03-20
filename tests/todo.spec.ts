import { test } from "@playwright/test";
import { TodoPage } from "../page-objects/pages/todo-page";

test.describe("Todo App tests", async () => {
  test("TL-19-1 common checks for tasks: create, remove and complete", async ({
    page,
  }) => {
    const todoPage = new TodoPage(page);
    await todoPage.open();
    await todoPage.createTask("Task 1");
    await todoPage.createTask("Task 2");
    await todoPage.createTask("Task 3");
    await todoPage.checkTaskCount(3);
    await todoPage.checkFooterButtonsAreVisible();
    await todoPage.tasks.removeTask("Task 1");
    await todoPage.tasks.completeTask("Task 2");
    await todoPage.tasks.checkTaskCompleted("Task 2");
  });

  test("TL-19-2 check 'toggle-all' and ‘Clear Completed’ functionalities", async ({
    page,
  }) => {
    const todoPage = new TodoPage(page);
    await todoPage.open();
    await todoPage.createTask("Task 1");
    await todoPage.createTask("Task 2");
    await todoPage.checkTaskCount(2);
    await todoPage.toggleAllButton.click();
    await todoPage.checkTaskCount(2);
    await todoPage.activeButton.click();
    await todoPage.checkTaskCount(0);
    await todoPage.completedButton.click();
    await todoPage.checkTaskCount(2);
    await todoPage.allButton.click();
    await todoPage.checkTaskCount(2);
    await todoPage.clearCompletedButton.click();
    await todoPage.newTaskInputField.isVisible();
    await todoPage.footer.isHidden();
  });

  test("TL-19-3 check todo app all functionalities", async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.open();
    await todoPage.createTask("Task 1");
    await todoPage.createTask("Task 2");
    await todoPage.createTask("Task 3");
    await todoPage.checkTaskCount(3);
    await todoPage.toggleAllButton.click();
    await todoPage.createTask("Task 4");
    await todoPage.createTask("Task 5");
    await todoPage.checkTaskCount(5);
    await todoPage.tasks.removeTask("Task 1");
    await todoPage.tasks.removeTask("Task 4");
    await todoPage.checkTaskCount(3);
    await todoPage.activeButton.click();
    await todoPage.checkTaskCount(1);
    await todoPage.completedButton.click();
    await todoPage.checkTaskCount(2);
    await todoPage.allTasks();
    await todoPage.checkTaskCount(3);
    await todoPage.clearCompletedButton.click();
    await todoPage.checkTaskCount(1);
    await todoPage.completedButton.click();
    await todoPage.checkTaskCount(0);
    await todoPage.allTasks();
    await todoPage.checkTaskCount(1);
    await todoPage.toggleItem.click();
    await todoPage.clearCompletedButton.click();
    await todoPage.checkTaskCount(0);
    await todoPage.newTaskInputField.isVisible();
    await todoPage.footer.isHidden();
  });
});
