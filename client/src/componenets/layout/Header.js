import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from "../../context/auth";
import toast from 'react-hot-toast';
import SearchInput from "../Forms/SearchInput";
import useCategory from '../../hooks/useCategory';
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import { CiHeart } from "react-icons/ci";
import { MdTrolley } from "react-icons/md";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 0;
      setIsScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const headerStyles = {
    backgroundColor: isScrolled ? 'white' : '#f8be67',
    position: isScrolled ? 'sticky' : 'relative',
    top: 0,
    zIndex: 1,
    transition: 'background-color 0.3s ease-in-out',
  };
  const linkStyles = (isActive) => ({
    color: isScrolled ? 'black' : 'white',
    // textDecoration: isActive ? 'underline' : 'none',
    borderBottom: isActive && `1px solid ${isScrolled ? 'black' : 'white'}`, // Apply conditional border-bottom
    transition: 'color 0.3s ease-in-out',
  });

  const iconColor = isScrolled ? 'black' : 'white';

  const hoverEffect = {
    transition: 'box-shadow 0.3s ease-in-out',
  };

  const hoverGlow = {
    boxShadow: isScrolled ? '0 0 2px black' : '0 0 5px white',
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg" style={headerStyles}>
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" style={{ color: iconColor }} />🛒E-Commerce
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand" style={{ color: isScrolled ? 'black' : 'white' }}>🛒E-Commerce </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput />
              <li className="nav-item">
                <NavLink
                  to="/"
                  className="nav-link"
                  aria-current="page"
                  style={({ isActive }) => ({
                    ...linkStyles(isActive),
                    ...hoverEffect,
                  })}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = hoverGlow.boxShadow;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/categories"
                  data-bs-toggle="dropdown"
                  style={linkStyles(false)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = hoverGlow.boxShadow;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/categories">
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li key={c.slug}>
                      <Link className="dropdown-item" to={`/category/${c.slug}`}>
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {!auth?.user ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      to="/register"
                      className="nav-link"
                      style={({ isActive }) => ({
                        ...linkStyles(isActive),
                        ...hoverEffect,
                      })}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = hoverGlow.boxShadow;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/login"
                      className="nav-link"
                      style={({ isActive }) => ({
                        ...linkStyles(isActive),
                        ...hoverEffect,
                      })}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = hoverGlow.boxShadow;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={({ isActive }) => ({
                        ...linkStyles(isActive),
                        ...hoverEffect,
                      })}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = hoverGlow.boxShadow;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      {auth?.user?.name}
                    </NavLink>

                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <NavLink
                          to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`}
                          className="dropdown-item"
                        >
                          DashBoard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          LogOut
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              {auth?.user?.role === 0 && (
                <li className="nav-item ml-5">
                  <NavLink
                    to="/cart"
                    className="nav-link"
                    style={({ isActive }) => ({
                      ...linkStyles(isActive),
                      ...hoverEffect,
                    })}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = hoverGlow.boxShadow;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <Badge
                      count={cart?.length}
                      style={{
                        fontSize: '8px',
                        backgroundColor: 'white',
                        color: 'black',
                      }}
                      showZero
                      offset={[10, -5]}
                    >
                      <CiHeart
                        style={{
                          fontSize: '26px',
                          marginLeft: '5px',
                          color: iconColor,
                        }}
                      />
                    </Badge>
                  </NavLink>
                </li>
              )}
              {auth?.user?.role === 0 && (
                <li className="nav-item">
                  <NavLink
                    to="/dashboard/user/orders"
                    className="nav-link"
                    style={({ isActive }) => ({
                      ...linkStyles(isActive),
                      ...hoverEffect,
                    })}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = hoverGlow.boxShadow;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <MdTrolley
                      style={{
                        fontSize: '26px',
                        marginLeft: '15px',
                        color: iconColor,
                      }}
                    />
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
