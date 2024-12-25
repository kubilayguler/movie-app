// components/MovieDetail.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetails } from '../../redux/slices/movieSlice';
import { useParams } from 'react-router-dom';
import { Layout, Spin, Card, Typography, Row, Col, Divider, Tag } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { FaStar } from 'react-icons/fa';

import './MovieDetail.css';
const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;

const MovieDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedMovie: movie, loading } = useSelector(
    (state) => state.movies
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieDetails(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className='Loading'>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 96 }} spin />} />
      </div>
    );
  }

  if (!movie)
    return <p style={{ color: '#fff', textAlign: 'center' }}>No movie found</p>;

  return (
    <Layout style={{ background: '#1A242F', minHeight: '100vh' }}>
      <Content className='MovieDetail'>
        <Card className='movie-card'>
          <Row gutter={[16, 16]} justify='center'>
            <Col xs={24} sm={23} md={10} lg={8}>
              <div
                className='movie-poster'
                style={{
                  background: `url(https://image.tmdb.org/t/p/w500${movie.poster_path}) center/cover no-repeat`,
                  justifySelf: 'center',
                }}
              />
            </Col>
            <Col xs={24} sm={23} md={22} lg={16}>
              <Title className='movie-title' level={1}>
                {movie.title}
                <FaStar
                  style={{
                    color: 'yellow',
                    marginLeft: '30px',
                    fontSize: '24px',
                  }}
                />
                <span style={{ fontSize: '1.7rem' }}>
                  {movie.vote_average.toFixed(1)}
                </span>
              </Title>
              <Text className='movie-tagline' type='secondary' italic>
                {movie.tagline}
              </Text>
              <Divider />
              <Paragraph>
                <strong>Overview:</strong> {movie.overview}
              </Paragraph>
              <Divider />
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Paragraph>
                    <strong>Release Date:</strong> {movie.release_date}
                  </Paragraph>
                </Col>
                <Col span={12}>
                  <Paragraph>
                    <strong>Runtime:</strong> {movie.runtime} minutes
                  </Paragraph>
                </Col>
              </Row>
              <Divider />
              <Row gutter={[8, 8]}>
                <Col span={24}>
                  <Paragraph>
                    <strong>Genres:</strong>
                    {movie.genres.map((genre) => (
                      <Tag key={genre.id} color='blue'>
                        {genre.name}
                      </Tag>
                    ))}
                  </Paragraph>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </Content>
    </Layout>
  );
};

export default MovieDetail;
