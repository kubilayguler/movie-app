import { React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLimit, setOffset } from '../redux/slices/movieSlice';
import { Pagination } from 'antd';
const PaginationComponent = () => {
  const dispatch = useDispatch();
  const { limit, offset, totalResults } = useSelector((state) => state.movies);

  const handlePaginationChange = (page, pageSize) => {
    const newOffset = (page - 1) * pageSize;
    dispatch(setOffset(newOffset));
    dispatch(setLimit(pageSize));
  };
  return (
    <Pagination
      style={{ marginTop: '20px', textAlign: 'center' }}
      current={offset / limit + 1}
      pageSize={limit}
      total={totalResults}
      onChange={handlePaginationChange}
      pageSizeOptions={[6, 10, 12, 18, 20]}
      align='center'
      size='large'
    />
  );
};

export default PaginationComponent;
