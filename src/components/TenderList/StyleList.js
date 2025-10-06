import styled from 'styled-components';
export const GridContainer = styled.div`
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      padding: 20px;
    `;

export const SearchContainer = styled.div`
  align-items: center;
  color: #DAA520;
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  box-shadow:
          0 5px 15px rgba(218, 165, 32, 0.5),
          inset 0 2px 5px rgba(255, 215, 0, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 10px
`;

export const SearchInput = styled.input`
  width: 70%;
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  background-color: rgba(60, 60, 60, 0.5);
  color: #DAA520;
`;

export const Button = styled.button`
  width: 117.97px;
  text-decoration: none;
  display: inline-block;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 40px 40px #DAA520 inset, 0 0 0 0 #DAA520;
  color: #000;
  transition: .15s ease-in-out;

  &:hover {
    box-shadow: 0 0 10px 0 #DAA520 inset, 0 0 10px 4px #DAA520;
    color: #DAA520;
    background: #282c34;
  }
`;

export const ImgWrap = styled.div`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 800px; 
  margin: 0 auto;
`

export const Title = styled.p`
  color: #DAA520;
  font-size: 24px;
  font-weight: bold;
  margin-right: 50px;
  margin-bottom: 10px;
`;

export const WrapTitle = styled.div`
  display: flex;
  justify-content: space-around;
`;

