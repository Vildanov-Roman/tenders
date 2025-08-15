import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.45);
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

export const Box = styled.div`
  background: #fff;
  width: min(480px, 60vw);
  max-height: 80vh;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,.2);
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Header = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.h3`
  margin: 0;
`;

export const Close = styled.button`
  border: none;
  background: #eee;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  &:hover { background: #e4e4e4; }
`;

export const List = styled.div`
  overflow: auto;
  border: 1px solid #eee;
  border-radius: 8px;
`;

export const Section = styled.div`
  padding: 10px 12px;
  border-bottom: 1px solid #f2f2f2;
  background: #fafafa;
  font-weight: 600;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 10px;
  align-items: center;
  padding: 10px 12px;
  border-bottom: 1px solid #f6f6f6;
  &:last-child { border-bottom: 0; }
`;

export const Filename = styled.div`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Meta = styled.div`
  opacity: .7;
  font-size: 12px;
`;

export const Empty = styled.div`
  padding: 16px;
  text-align: center;
  opacity: .7;
`;

export const Button = styled.button`
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
    cursor: pointer;
  }
`;