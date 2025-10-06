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
  z-index: 1;
  backdrop-filter: blur(5px);
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  background: rgba(255, 195, 50, 0.6);  
  padding: 20px;
  border-radius: 8px;
  width: 850px;
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
  box-shadow: 0 0 40px 40px #DAA520 inset, 0 0 0 0 #DAA520;
  color: #000;
  transition: .15s ease-in-out;
  text-decoration: none;
  border-radius: 5px;
  border: 0.5px solid transparent;  
  cursor: pointer;
  text-align: center;

  &:hover {
    box-shadow: 0 0 10px 0 #DAA520 inset, 0 0 10px 4px #DAA520;
    color: #DAA520;
    background: #282c34;
    border: 0.5px solid #DAA520;
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