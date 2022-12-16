import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
{/* <button
            type="button"
            onClick={() => {
              if (isDisabled) {
                saveData();
              } else {
                updateUser();
              }
            }}
          >
            Save New User
          </button>
          <button
            onClick={() => {
              if (!isDisabled) {
                saveData();
              } else {
                updateUser();
              }
            }}
          >
            Update User
          </button> */}
           {/* { isDisabled ?  
          <button onClick={updateUser} disabled={!isDisabled}>Update User</button>
          :
          <button type="button" onClick={saveData} disabled={isDisabled}>
            Save New User
          </button>
       } */}