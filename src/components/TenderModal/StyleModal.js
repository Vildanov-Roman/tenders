import styled from "styled-components";

export const ColumnsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

export const LeftColumn = styled.div`
  flex: 1;
  min-width: 200px;
`;

export const RightColumn = styled.div`
  flex: 2;
  min-width: 500px;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; // Изменено с space-around
  border-bottom: 1px solid black;
  padding: 10px 0;
  gap: 15px;
`;

export const ContactInfo = styled.div`
  margin-top: 10px;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 4px;

  p {
    margin: 5px 0;
    font-size: 0.9em;
    color: #666;
  }
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 800px;
  max-width: 90%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const ScrollableContent = styled.div`
  overflow-y: auto;
  padding-right: 8px;
  margin-bottom: 20px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
  }
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
  padding: 10px 0;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  flex-wrap: wrap;
  gap: 10px;
`;

export const InfoBlock = styled.div`
  flex: 1;

  p {
    margin-bottom: 5px;
    margin-top: 5px;
    font-size: 12px
  }
`;

export const ButtonGroup = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 10px;
`;

export const ButtonLink = styled.a`
  display: inline-block;
  padding: 5px;
  font-size: 12px;
  color: #000;
  background-color: lightblue;
  text-decoration: none;
  border-radius: 5px;
  border: 0.5px solid transparent;
  transition: background-color 0.3s ease;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: #0056b3;
    color: #fff;
  }
`;


export const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &.danger {
    background: #ff4d4f;
    color: white;
  }
`;

export const NomenclaturesList = styled.ul`
  list-style: none;
  max-height: 8em;
  overflow-y: auto;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: rgba(243, 242, 243, 0.8);

  li {
    padding: 4px 0;
    border-bottom: 1px solid rgba(222, 222, 222, 0.8);
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  li:last-child {
    border-bottom: none;
  }

  span:first-child {
    flex: 1;
    text-align: left;
    padding-right: 10px;
  }

  span:last-child {
    flex-shrink: 0;
    text-align: right;
    color: #666;
  }
`;

export const Lots = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

export const Buttonlot = styled.button`
  background-color: ${({ isActive }) => (isActive ? "lightblue" : "#f0f0f0")};
  text-align: center;
  display: inline-block;
  padding: 5px;
  cursor: pointer;
  position:relative;  
  border: 1px solid transparent;
  border-bottom: 2px solid lightblue;
  border-radius: 10px;

  &:before {
    content: "";
    position: absolute;
    width: 0;
    background : lightblue;
    left: 45%;
    height: 2px;
    top: 0;
    transition: all .3s;
    opacity: 0.7;
  }
  
  &:hover:before {
    width: 100%;
    left:0;
  }
`;
