import styled from "styled-components";

export const DrawerParent = styled.div`
  display: flex;
  background-color: #131a4e;
  border-radius: 0.5rem 0rem 0rem 0.5rem;
  flex-direction: column;
  align-items: center;
`;

export const DrawerToggler = styled.div`
  padding-top: 1.5rem;
  cursor: pointer;
`;

export const ToggleIcon = styled.svg`
  height: 1.5rem;
  width: 1.5rem;
`;

export const DrawerMenuStyled = styled.div<{ isDocked: boolean }>`
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;
  box-sizing: border-box;
  width: ${({ isDocked }) => (isDocked ? "4rem" : "12rem")};
  transition: width 0.4s ease-in-out;
  padding-top: 5rem;
`;

export const DrawerMenuList = styled.ul`
  list-style: none;
  margin: 0px;
  padding: 0px 8px;
  position: relative;
`;

export const DrawerListItem = styled.li<{ isSelected: boolean }>`
  position: relative;
  text-decoration: none;
  width: 100%;
  box-sizing: border-box;
  text-align: left;
  display: block;
  color: #ffffff;
  font-size: 1.5rem;
  cursor: pointer;
  &:hover {
    background-color: #778899;
  }

  ${({ isSelected }) => isSelected && "background-color: #778899;"};
`;

export const DrawerItemWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const DrawerIconWrapper = styled.div<{ isDocked: boolean }>`
  min-width: 0px;
  min-height: 48px;
  position: relative;
  display: inline-flex;
  margin-right: 25px;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  flex-basis: ${({ isDocked }) => (isDocked ? "100%" : "2rem")};
`;

/*child icon

style={{
                      width: "1em",
                      height: "1em",
                      display: "inline-block",
                      flexShrink: "0",
                      fontSize: "1.5rem",
                    }}

*/
