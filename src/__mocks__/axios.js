const mockAxios = jest.createMockFromModule('axios');

mockAxios.create = () => mockAxios;

export default mockAxios;
