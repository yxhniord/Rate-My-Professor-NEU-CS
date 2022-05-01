import { render, screen } from "@testing-library/react";
import CommentDetailList from "../CommentDetailList";
import { MemoryRouter } from "react-router-dom";

test("CommentDetailList renders correctly", () => {
    const comments = [
        {
            _id: 1,
            course: "course1",
            campus: "campus",
            rate: 5,
            user: 1,
            professor: 1,
            date: "2022-01-01",
            content: "content",
        },
        {
            _id: 2,
            course: "course2",
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
            <CommentDetailList comments={comments} />
        </MemoryRouter>
    );
    expect(screen.getByText(`${comments[0].course}`)).toBeInTheDocument();
    expect(screen.getByText(`${comments[1].course}`)).toBeInTheDocument();
});
