import styled from 'styled-components';
export const GridContainer = styled.div`
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      padding: 20px;
    `;

export const SearchContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`;

export const SearchInput = styled.input`
    width: 500px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    margin-right: 10px;
    background-color: rgba(60, 60, 60, 0.5);
    color: #DAA520;
`;

