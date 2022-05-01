import {render, screen} from "@testing-library/react";
import ComponentPagination from "../ComponentPagination";
import Comment from "../comments/Comment";
import {MemoryRouter} from "react-router-dom";


test('Pagination renders correctly', () => {
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
        {
            _id: 3,
            course: "course",
            campus: "campus",
            rate: 5,
            user: 1,
            professor: 1,
            date: "2022-01-01",
            content: "content2",
        },
        {
            _id: 4,
            course: "course",
            campus: "campus",
            rate: 5,
            user: 1,
            professor: 1,
            date: "2022-01-01",
            content: "content2",
        },
        {
            _id: 5,
            course: "course",
            campus: "campus",
            rate: 5,
            user: 1,
            professor: 1,
            date: "2022-01-01",
            content: "content2",
        },
        {
            _id: 6,
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
            <ComponentPagination data={comments} dataLimit={3} RenderComponent={Comment} fn={jest.fn()}/>
        </MemoryRouter>
    );
    const buttons = screen.getAllByRole('button', {hidden: true});
    expect(buttons.length).toBe(9);
});