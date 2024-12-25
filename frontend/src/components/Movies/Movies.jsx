import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMoviesWithOffset } from '../../redux/slices/movieSlice';
import { Spin, Row, Col, Card, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Movies.css';
import { LoadingOutlined } from '@ant-design/icons';

const { Meta } = Card;
const { Title } = Typography;

const Movies = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movies, loading, error, limit, offset } = useSelector(
    (state) => state.movies
  );
  useEffect(() => {
    dispatch(fetchMoviesWithOffset({ offset, limit }));
  }, [dispatch]);

  if (loading) {
    return (
      <div className='Loading'>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 96 }} spin />} />
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className='Error'>
        <p>Error: {error ? error.message : 'Movies not found in search.'}</p>
      </div>
    );
  }
  return (
    <div
      className='Movies'
      style={{ cursor: 'pointer', padding: '16px', paddingTop: '0px' }}
    >
      <Title
        style={{
          color: '#1fa0cf',
          fontWeight: '400',
          paddingBottom: '8px',
          margin: '0',
        }}
        level={2}
      >
        Movies
      </Title>
      <Row gutter={[16, 16]} style={{ marginTop: '10px' }}>
        {movies &&
          movies.map((movie) => (
            <Col key={movie.id} xs={12} sm={8} md={6} lg={4}>
              <Card
                style={{
                  backgroundColor: '#1A242F',
                  border: 'none',
                }}
                cover={
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      paddingTop: '150%',
                    }}
                  >
                    <img
                      alt={movie.title}
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : 'https://ih1.redbubble.net/image.4905811447.8675/flat,750x,075,f-pad,750x1000,f8f8f8.jpg'
                      }
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '8px',
                      }}
                    />
                  </div>
                }
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
                <Meta
                  title={movie.title}
                  description={`Rating: ${movie.vote_average.toFixed(1)}`}
                />
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default Movies;
