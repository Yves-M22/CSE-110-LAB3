import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from "./toDoList";
import { dummyGroceryList } from "./constants";

describe("Read toDoList", () => {
    test("Check Visibility of List Items", () => {
        render(<ToDoList/>)
        var listCount = 0;
        dummyGroceryList.map(item => 
            {
                const newItem = screen.getByText(item.name)
                listCount++;
                expect(newItem).toBeInTheDocument();
            }
        )
        expect(listCount).toBe(dummyGroceryList.length);
    });

    test("Check Item Checklist", () => {
        render(<ToDoList/>)
        var checkListButton = screen.getAllByRole("checkbox");

        // Before Checking
        expect(dummyGroceryList[0].isPurchased).toBe(false);
        expect(dummyGroceryList[1].isPurchased).toBe(false);

        var itemsBought = screen.getByText("Items bought: 0");


        // After Checking
        fireEvent.click(checkListButton[0]);
        itemsBought = screen.getByText("Items bought: 1");

        // After Dechecking
        fireEvent.click(checkListButton[1]);
        itemsBought = screen.getByText("Items bought: 0");

    })

    test("Checking off All Notes", () => {
        render(<ToDoList />)
        var checkItem = screen.getAllByRole("checkbox");
        var itemsBought = screen.getByText("Items bought: 0");
        fireEvent.click(checkItem[0]);
        fireEvent.click(checkItem[0]);
        itemsBought = screen.getByText("Items bought: 2");
    });
    
});