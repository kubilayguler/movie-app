import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from 'antd';
import { FaUser } from 'react-icons/fa';
import SearchBar from '../Searchbar/Searchbar.jsx';
import './Navbar.css';

const Navbar = () => {
  useEffect(() => {
    const header = document.querySelector('header');

    const handleScroll = () => {
      if (window.scrollY > 0) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const userInterection = () => {
    alert('Coming soon..');
  };

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 16px',
      }}
    >
      <Link
        to='/'
        style={{
          color: '#fff',
          textDecoration: 'none',
          fontWeight: '500',
        }}
      >
        <div className='Logo'>Kubi&Movie</div>
      </Link>

      <div
        className='Search'
        style={{
          maxWidth: '600px',
          height: '40px',
          flex: 1,
          marginLeft: '16px',
          marginRight: '16px',
        }}
      >
        <div className='Search'>
          <SearchBar />
        </div>
      </div>

      <Avatar
        onClick={userInterection}
        size='large'
        style={{
          cursor: 'pointer',
          paddingTop: '8px',
          fontSize: '30px',
          color: '#e0e0e0',
        }}
        className='custom-avatar'
        icon={<FaUser />}
      />
    </header>
  );
};

export default Navbar;
