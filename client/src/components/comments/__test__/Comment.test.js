import {render, screen} from '@testing-library/react';

test('Comment renders correctly', () => {
  const {container} = render(<Comment />);
  expect(container).toMatchSnapshot();
});