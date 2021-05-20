import React, {FC} from 'react';
import './MenuLink.css';
import {Page} from "../../models";
import { NavLink } from 'react-router-dom';

const isLeaf = (item: Page) => !item.children?.length

const MenuLinkItem: FC<{menuItem: Page}> = ({ menuItem }) => {
  return (
      <div className={`menu-link-item ${isLeaf(menuItem) ? 'leaf' : ''}`}>
          <NavLink
            exact
            data-test-id="menu-link-item__title"
            activeClassName="active"
            to={`/${menuItem.url}`}
          >
              { menuItem.title }
          </NavLink>

        {menuItem.children?.length && <MenuLink data={menuItem.children} />}
      </div>
  )
}

const MenuLink: FC<{data: Page[]}> = ({ data }) => <>{ data.map((menuItem: Page) => <MenuLinkItem key={menuItem.url} menuItem={menuItem}/>) }</>

const MenuLinkWrapper: FC<{data: Page[]}> = ({data}) => {
  const delay = 500;
  const [searchDebouncedValue, setDebouncedSearchValue] = React.useState('');
  const [searchValue, setSearchValue] = React.useState('');
  const [filteredData, setFilteredData] = React.useState(data);

  React.useEffect(() => {
      const timer = setTimeout(() => {
          setSearchValue(searchDebouncedValue.toLowerCase())
      }, delay);

      return () => {
          clearTimeout(timer);
      }
  }, [searchDebouncedValue]);


  React.useEffect(() => {
      if (!data) { return; }

      const getChildren = (result: Page[], object: Page) => {
        const title = object.title.toLowerCase()
        if (!searchValue || title.includes(searchValue)) {
            result.push(object);

            return result;
        }

        if (object.children?.length) {
            const children = object.children.reduce(getChildren, []);
            if (children?.length) { result.push({ ...object, children }); }
        }

        return result;
      };

      const newFilteredData = data.reduce(getChildren, [])

      setFilteredData(newFilteredData)
  }, [searchValue, data])

  return (
      <div className='menu-link-wrapper'>
        <input
            data-test-id='menu-link-search'
            className='search mb-3'
            placeholder='Search page'
            onChange={(e) => setDebouncedSearchValue(e.target.value)} value={searchDebouncedValue} />

          <div className='inner-wrapper'>
              {!filteredData.length ? (<div className='no-results'>No search results</div>) : <MenuLink data={filteredData} />}

          </div>
      </div>
  )
}

export default MenuLinkWrapper;
