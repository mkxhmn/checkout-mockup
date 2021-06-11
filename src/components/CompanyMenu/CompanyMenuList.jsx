import { useStoreActions, useStoreState } from 'easy-peasy';
import { MenuItem, MenuList, Paper } from '@material-ui/core';

export function CompanyMenuList({ handleClose }) {
  const companies = useStoreState(({ company }) => company.companies);
  const setCompany = useStoreActions(({ company }) => company.setCompany);
  const selectedCompany = useStoreState(({ company }) => company.company);

  const handleSelectCompany = (company) => (event) => {
    setCompany(company);

    handleClose(event);
  };

  return (
    <Paper>
      <MenuList>
        {companies.map((company) => (
          <MenuItem
            selected={company.name === selectedCompany.name}
            key={company.name}
            onClick={handleSelectCompany(company)}
          >
            {company.name}
          </MenuItem>
        ))}
      </MenuList>
    </Paper>
  );
}
