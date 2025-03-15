import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
`;

export const Sidebar = styled.div`
  width: 250px;
  background: #e1f5fe;
  padding: 20px;
  flex-shrink: 0;
  overflow-y: auto;
  height: 100%;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

export const Content = styled.div`
  flex: 1;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  justify-content: start;
  align-content: start;
  overflow-y: auto;
  height: 100%;
  background: #f9f9f9;
`;

export const OrderSection = styled.div`
  width: 320px;
  background: #e1f5fe;
  padding: 20px;
  flex-shrink: 0;
  overflow-y: auto;
  height: 100%;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
`;