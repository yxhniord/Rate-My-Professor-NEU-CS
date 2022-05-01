import {render, screen} from '@testing-library/react';
import Comment from "../Comment";
import {MemoryRouter} from "react-router-dom";
import userEvent from "@testing-library/user-event";

test('Comment renders correctly', () => {
  const data = {
    _id: 1,
    course:"course",
    campus:"campus",
    rate:5,
    user: 1,
    professor: 1,
    date: "2022-01-01",
    content: "content",
  }

  render(
      <MemoryRouter>
        <Comment data={data} fn={jest.fn()}/>
      </MemoryRouter>
  );
  expect(screen.getByText(`${data.content}`)).toBeInTheDocument();
  const buttons = screen.getAllByRole('button',{hidden:true});
  expect(buttons.length).toBe(2);
  const deleteButton = buttons[1];
  userEvent.click(deleteButton);
  expect(screen.getByText('Delete')).toBeInTheDocument();
  expect(screen.getByText('Cancel')).toBeInTheDocument();
});
