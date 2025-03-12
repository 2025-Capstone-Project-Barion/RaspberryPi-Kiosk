import styled from "styled-components";

export const OrderContainer = styled.div`
  padding: 20px;
  background: #e1f5fe;
  border-radius: 10px;
`;

export const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  background: white;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
  div {
    display: flex;
    align-items: center;
    
    button {
      background: none;
      border: none;
      font-size: 18px;
      cursor: pointer;
      margin: 0 5px;
      color: #0288d1;
      
      &:hover {
        color: #0277bd;
      }
    }
    
    span {
      font-size: 16px;
      font-weight: bold;
    }
  }
`;

export const TotalPrice = styled.div`
  margin-top: 15px;
  font-size: 18px;
  font-weight: bold;
  text-align: right;
`;

export const OrderButton = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background: ${({ $primary }) => ($primary ? "#0288d1" : "#f44336")};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  
  &:hover {
    background: ${({ $primary }) => ($primary ? "#0277bd" : "#d32f2f")};
  }
`;