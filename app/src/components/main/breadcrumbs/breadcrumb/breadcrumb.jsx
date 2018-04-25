import PropTypes from 'prop-types';
import Parser from 'html-react-parser';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import ErrorIcon from 'common/img/error-inline.svg';
import ListViewIcon from 'common/img/list-view-inline.svg';
import { descriptorShape } from '../propTypes';

import styles from './breadcrumb.scss';

const cx = classNames.bind(styles);

const ErrorItem = () => (
  <div className={cx('error-item')}>
    <span className={cx('error-icon')}>{Parser(ErrorIcon)}</span>
    <span>Error Item</span>
  </div>
);

const LinkItem = ({ path, active, title }) =>
  !active ? (
    <NavLink className={cx('link')} to={path}>
      {title}
    </NavLink>
  ) : (
    <span>{title}</span>
  );
LinkItem.propTypes = {
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  active: PropTypes.bool,
};
LinkItem.defaultProps = {
  active: false,
};

export const Breadcrumb = ({ descriptor: { error, active, path, title, listView } }) => (
  <div className={cx('breadcrumb')}>
    {listView && (
      <div className={cx('list-view-icon')} title={'List view'}>
        {Parser(ListViewIcon)}
      </div>
    )}
    {error ? <ErrorItem /> : <LinkItem active={active} path={path} title={title} />}
  </div>
);
Breadcrumb.propTypes = {
  descriptor: descriptorShape.isRequired,
};
