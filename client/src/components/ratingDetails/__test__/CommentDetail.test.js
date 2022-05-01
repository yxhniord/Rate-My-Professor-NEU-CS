import { render, screen } from "@testing-library/react";
import CommentDetail from "../CommentDetail";
import { MemoryRouter } from "react-router-dom";

test("CommentDetail renders correctly", () => {
    let comment = {
        _id: 1,
        rate: 5,
        course: "CS-5610",
        campus: "Vancouver",
        content: "Good course",
    };
    render(
        <MemoryRouter>
            <CommentDetail data={comment} />
        </MemoryRouter>
    );
    expect(
        screen.getByText(`From ${comment.campus} campus: ${comment.content}`)
    ).toBeInTheDocument();
    expect(screen.getByText(`${comment.rate} / 5`)).toBeInTheDocument();
    expect(screen.getByText(`${comment.course}`)).toBeInTheDocument();
});
