import { ClickAwayListener, IconButton, Popper } from '@material-ui/core';
import { SettingsOutlined } from '@material-ui/icons';
import { Fragment, useRef, useState } from 'react';
import { CompanyMenuList } from './CompanyMenuList';

export function CompanyMenu() {
  const [isOpenMenu, setIsOpenMenu] = useState(() => false);
  const anchorRef = useRef();

  function handleToggleMenu() {
    setIsOpenMenu((prevState) => !prevState);
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setIsOpenMenu(false);
  };

  return (
    <Fragment>
      <ClickAwayListener onClickAway={handleClose}>
        <IconButton
          ref={anchorRef}
          aria-controls="company-list"
          aria-haspopup="true"
          onClick={handleToggleMenu}
        >
          <SettingsOutlined />
        </IconButton>
      </ClickAwayListener>
      <Popper
        placement="bottom-end"
        open={isOpenMenu}
        anchorEl={anchorRef.current}
        role={undefined}
        disablePortal
      >
        <CompanyMenuList />
      </Popper>
    </Fragment>
  );
}
