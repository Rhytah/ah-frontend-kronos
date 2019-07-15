import sampleReducer from '../../reducers/auth/registrationReducer';

describe('sampleReducer', () => {
  const initialState = {};

  it('should return success', () => {
    const successAction = {
      type: 'SAMPLE_STRING',
    };
    const successState = 'SUCCESS';
    expect(sampleReducer(initialState, successAction)).toEqual(successState);
  });
});
