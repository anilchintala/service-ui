import PropTypes from 'prop-types';

export const descriptorShape = PropTypes.shape({
  title: PropTypes.string,
  path: PropTypes.string,
  error: PropTypes.bool,
  listView: PropTypes.bool,
  active: PropTypes.bool,
});
