import styled from "styled-components";

export const MenuItemContainer = styled.div`
  width: 180px;
  padding: 15px;
  border-radius: 10px;
  background: #f9f9f9;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin: 10px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

export const ItemImage = styled.img`
  width: 100%;
  height: 120px;
  border-radius: 8px;
  object-fit: cover;
`;

export const ItemInfo = styled.div`
  margin-top: 10px;
`;

export const ItemName = styled.h3`
  font-size: 16px;
  color: #333;
  margin: 5px 0;
`;

export const ItemPrice = styled.p`
  font-size: 14px;
  color: #666;
  font-weight: bold;
`;

export const AddButton = styled.button`
  width: 100%;
  padding: 8px;
  margin-top: 10px;
  background: #0288d1;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background: #0277bd;
  }
`;