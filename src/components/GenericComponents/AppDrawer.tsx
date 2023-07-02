import React, { useState } from "react";
import {
  DrawerIconWrapper,
  DrawerItemWrapper,
  DrawerListItem,
  DrawerMenuStyled,
  DrawerMenuList,
  DrawerParent,
  DrawerToggler,
  ToggleIcon,
} from "./styled-elements/drawer-styles";
import { useMatch, useNavigate } from "react-router-dom";

const headerProps = {
  title: "My Dive Log",
  description: "Log, Track, Review your dive logs and relive the experience",
  links: [
    {
      key: 1,
      label: "Inventory",
      data: "M19 3H4.99c-1.11 0-1.98.9-1.98 2L3 19c0 1.1.88 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 12h-4c0 1.66-1.35 3-3 3s-3-1.34-3-3H4.99V5H19v10zm-3-5h-2V7h-4v3H8l4 4 4-4z",
      path: "/inventory",
    },
    {
      key: 2,
      label: "Customers",
      data: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z",
      path: "/contacts",
    },
    {
      key: 3,
      label: "Orders",
      data: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z",
      path: "/orders",
    },
  ],
};

function AppDrawer() {
  const [isDocked, setToggle] = useState(true);
  const navigate = useNavigate();
  const match = useMatch("*");

  return (
    <DrawerParent id="drawer">
      <DrawerToggler
        id="drawerToggle"
        onClick={() => setToggle((toggle) => !toggle)}
      >
        <ToggleIcon>
          <path
            fill="#FFFFFF"
            d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
          />
        </ToggleIcon>
      </DrawerToggler>
      <DrawerMenuStyled id="docked" isDocked={isDocked}>
        <DrawerMenuList>
          {headerProps?.links.map((data) => (
            <DrawerListItem
              key={data.key}
              isSelected={match?.pathname === data.path}
              onClick={() => navigate(data.path)}
            >
              <DrawerItemWrapper>
                <DrawerIconWrapper isDocked={isDocked} className="docker-icon">
                  <ToggleIcon>
                    <path fill="#FFFFFF" d={data.data} />
                  </ToggleIcon>
                </DrawerIconWrapper>
                {!isDocked && (
                  <div className="docker-text">
                    <span>{data.label}</span>
                  </div>
                )}
              </DrawerItemWrapper>
            </DrawerListItem>
          ))}
        </DrawerMenuList>
      </DrawerMenuStyled>
    </DrawerParent>
  );
}

export default AppDrawer;
