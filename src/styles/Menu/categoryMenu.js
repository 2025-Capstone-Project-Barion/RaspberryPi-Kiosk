import styled from "styled-components";

export const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const CategoryItem = styled.div`
  padding: 10px;
  font-size: 18px;
  cursor: pointer;
  background: ${(props) => (props.$active ? "#0288d1" : "transparent")};
  color: ${(props) => (props.$active ? "white" : "black")};
  border-radius: 8px;
  &:hover {
    background: #03a9f4;
    color: white;
  }
`;