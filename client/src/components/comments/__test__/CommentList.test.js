import {render, screen} from '@testing-library/react';
import CommentList from "../CommentList";
import {MemoryRouter} from "react-router-dom";

test('Test Comment List with no comments', () => {
    render(<CommentList comments={[]} deleteComment={jest.fn()}/>);
    expect(screen.getByText('No Ratings!')).toBeInTheDocument();
});

test('Test Comment List with comments', () => {
    const comments = [
        {
            _id: 1,
            course: "course",
            campus: "campus",
            rate: 5,
            user: 1,
            professor: 1,
            date: "2022-01-01",
            content: "content",
        },
        {
            _id: 2,
            course: "course",
            campus: "campus",
            rate: 5,
            user: 1,
            professor: 1,
            date: "2022-01-01",
            content: "content2",
        },
    ];
    render(
        <MemoryRouter>
            <CommentList comments={comments} deleteComment={jest.fn()}/>
        </MemoryRouter>
    );
    expect(screen.getByText(`${comments[0].content}`)).toBeInTheDocument();
    expect(screen.getByText(`${comments[1].content}`)).toBeInTheDocument();
    const buttons = screen.getAllByRole('button', {hidden: true});
    expect(buttons.length).toBe(4);
});
