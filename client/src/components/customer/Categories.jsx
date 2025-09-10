import React, { useEffect, useState } from 'react';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '../ui/navigation-menu';
import { Link } from 'react-router-dom';

const Categories = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={`
            ${scrolled ? 'hover:bg-white hover:text-[var(--primary)] active:bg-[var(--light-grey)] active:text-[var(--primary)] text-white hover:bg-white hover:text-[var(--primary)] focus:bg-white focus:text-[var(--primary)] data-[state=open]:hover:bg-white data-[state=open]:text-[var(--primary)] data-[state=open]:focus:bg-white data-[state=open]:bg-white':'hover:bg-[var(--primary)] active:bg-[var(--dark-primary)] active:text-white'} text-white cursor-pointer`}>Categories</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul>
              <li>
                <NavigationMenuLink asChild>
                  <Link to='/products?category=vegetables'>
                  Vegetables
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link to='/products?category=foods'>
                  Foods
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link to='/products?category=flowers'>
                  Flowers
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link to='/products?category=tools'>
                  Tools
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Categories;
