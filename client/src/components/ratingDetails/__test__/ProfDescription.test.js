import { render, screen } from "@testing-library/react";
import ProfDescription from "../ProfDescription";
import { MemoryRouter } from "react-router-dom";

test("ProfDescription renders correctly", () => {
    const professor = {
        first_name: "firstName",
        last_name: "lastName",
        rate: 5,
        comment: [],
    };

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
            <ProfDescription professor={professor} comments={comments} />
        </MemoryRouter>
    );

    expect(
        screen.getByText(`${professor.first_name} ${professor.last_name}`)
    ).toBeInTheDocument();
    expect(screen.getByText(`${professor.rate} / 5`)).toBeInTheDocument();
});
