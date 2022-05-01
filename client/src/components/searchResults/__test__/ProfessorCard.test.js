import {render, screen} from '@testing-library/react';
import ProfessorCard from "../ProfessorCard";
import {MemoryRouter} from "react-router-dom";


test('ProfessorCard renders correctly', () => {
    const professor = {
        _id: 1,
        first_name: "John",
        last_name: "Doe",
        rate: 4.5,
        comment: [
            {
                _id: 1
            }
        ]
    }
    render(
        <MemoryRouter>
            <ProfessorCard data={professor}/>
        </MemoryRouter>
    );
    expect(screen.getByText(`${professor.first_name} ${professor.last_name}`)).toBeInTheDocument();
    const buttonElements = screen.getAllByRole('button');
    expect(buttonElements.length).toBe(1);
    const textElement = screen.getByText(`Rating: ${professor.rate} / 5`);
    expect(textElement).toBeInTheDocument();
});