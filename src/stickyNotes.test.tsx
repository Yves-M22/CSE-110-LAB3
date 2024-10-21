import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";
import { dummyNotesList } from "./constants";

describe("Create StickyNote", () => {
    test("renders create note form", () => {
      render(<StickyNotes />);
   
      const createNoteButton = screen.getByText("Create Note");
      expect(createNoteButton).toBeInTheDocument();
    });
   
    test("creates a new note", () => {
      render(<StickyNotes />);
   
   // Please make sure your sticky note has a title and content input field with the following placeholders.
      const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
      const createNoteContentTextarea =
        screen.getByPlaceholderText("Note Content");
      const createNoteButton = screen.getByText("Create Note");
   
      fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
      fireEvent.change(createNoteContentTextarea, {
        target: { value: "Note content" },
      });
      fireEvent.click(createNoteButton);
   
      const newNoteTitle = screen.getByText("New Note");
      const newNoteContent = screen.getByText("Note content");
   
      expect(newNoteTitle).toBeInTheDocument();
      expect(newNoteContent).toBeInTheDocument();
    });
   });

describe("Read StickyNotes", () => {
    test("Check Dummy Notes List Visibility", () => {
        render(<StickyNotes />);
        var noteCount = 0;
        dummyNotesList.map(note => 
            {
                const newTitle = screen.getByText(note.title)
                const newContent = screen.getByText(note.content)
                noteCount++;
                expect(newTitle).toBeInTheDocument(),
                expect(newContent).toBeInTheDocument()
            }

        )

        expect(noteCount).toBe(dummyNotesList.length);

    })
})

describe("Update StickyNote", () => {
    test("Check if actual value of note is being updated", () => {
        render(<StickyNotes />);
        var updateButton = screen.getAllByText("Update");

        var noteTitle = screen.getAllByTestId("noteTitle");


        expect(noteTitle[0].innerHTML).toBe(" " + dummyNotesList[0].title + " ");

        fireEvent.click(updateButton[0]);
        
        noteTitle[0].innerHTML = "Faye Webster";
   
        fireEvent.click(updateButton[0]);

        screen.getByText("Faye Webster");
    }) 
})

describe("Delete StickyNote", () => {
    test("Deleting a note", () => {
        render(<StickyNotes />);

        var deleteNoteButton = screen.getAllByText("x");
        expect(deleteNoteButton[0]).toBeInTheDocument();

        const noteTitleDeleted = screen.getByText(dummyNotesList[0].title);
        const noteContentDeleted = screen.getByText(dummyNotesList[0].content);

        fireEvent.click(deleteNoteButton[0]);

        deleteNoteButton = screen.getAllByText("x");
        expect(noteTitleDeleted).not.toBeInTheDocument();
        expect(noteContentDeleted).not.toBeInTheDocument();
        expect(deleteNoteButton.length).toBe(dummyNotesList.length - 1);

    })
})

describe("Favorite StickyNote", () => {
    test("Favoriting a note", () => {
	    render(<StickyNotes />);
	    var favorites = screen.getAllByRole('button', { name: "heartButton" });
	    var favoriteNoteButton = favorites[0];	
	    fireEvent.click(favoriteNoteButton);
        var favoriteList = screen.getAllByText(dummyNotesList[0].title);
        expect(favoriteList[1]).toBeInTheDocument();
    }); 

})

   