import {render, screen} from '@testing-library/react';
import Navigation from "../Navigation";
import {MemoryRouter} from "react-router-dom";
import {applyMiddleware, createStore} from "redux";
import reducers from "../../reducers";
import thunk from "redux-thunk";
import {Provider} from "react-redux";

const store = createStore(reducers, applyMiddleware(thunk));

test('Navigation render correctly', () => {
    render(
        <MemoryRouter>
            <Provider store={store}>
                <Navigation/>
            </Provider>
        </MemoryRouter>
    );
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Top-Professors')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
});