import styled from "styled-components";

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
