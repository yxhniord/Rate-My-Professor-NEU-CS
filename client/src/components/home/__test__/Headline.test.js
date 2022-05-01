import {render, screen} from '@testing-library/react';
import Headline from "../Headline";

test('Test headline texts',()=>{
    const professorTest = [{
        _id: 1,
        first_name: "Test First Name",
        last_name: "Test Last Name",
        rate: 0
    }];

    const commentTest = [{
        _id: 1,
        course: "Test Course",
        rate: 0,
        content: "Test Content"
    }];

    const dbUserTest = {
        nickname: "User Test"
    };

    render(<Headline loading={false} dbUser={dbUserTest} professors={professorTest} comments={commentTest}/>)
    expect(screen.getByText(`Course: Test Course`)).toBeInTheDocument();
    expect(screen.getByText(`Comment: Test Content`)).toBeInTheDocument();

});