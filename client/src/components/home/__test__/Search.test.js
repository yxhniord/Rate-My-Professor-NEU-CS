import {fireEvent, render, screen} from '@testing-library/react';
import Search from "../Search";

test('Search field display text with inputs', () => {
    const setNameTest = jest.fn((value) => {
    })
    const {queryByPlaceholderText} = render(<Search setName={setNameTest}/>)

    const searchInput = queryByPlaceholderText('Type professor\'s name')

    fireEvent.change(searchInput, {target: {value: 'test'}})

    expect(searchInput.value).toBe('test');
});