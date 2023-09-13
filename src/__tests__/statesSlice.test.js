import { setStates } from '../redux/states/statesSlice';

test('should create an action to set states', () => {
  const statesData = [{ state: 'Ontario' }];
  const expectedAction = {
    type: 'states/setStates',
    payload: statesData,
  };
  expect(setStates(statesData)).toEqual(expectedAction);
});
