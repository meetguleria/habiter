import React from 'react';
import { darkTheme } from '../../theme';

function Header() {
  return (
    <header className="header" style={{ color: darkTheme.colors.primary }}>
      <h1 className="title" style={{ color: darkTheme.colors.text }}>
        Habiter
      </h1>
      <h2 className="subtitle" style={{ color: darkTheme.colors.secondary }}>
        Build Better Habits Every Day
      </h2>
    </header>
  );
}

export default Header;
