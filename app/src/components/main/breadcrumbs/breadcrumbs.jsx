import { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import Parser from 'html-react-parser';
import classNames from 'classnames/bind';
import RightArrowIcon from 'common/img/arrow-right-inline.svg';
import SquarePlusIcon from 'common/img/square-plus-inline.svg';
import SquareMinusIcon from 'common/img/square-minus-inline.svg';
import { descriptorShape } from './propTypes';
import { Breadcrumb } from './breadcrumb';

import styles from './breadcrumbs.scss';

const cx = classNames.bind(styles);

const Toggler = ({ expanded, onToggleExpand }) => (
  <div className={cx('toggler')} onClick={onToggleExpand}>
    {Parser(expanded ? SquareMinusIcon : SquarePlusIcon)}
  </div>
);
Toggler.propTypes = {
  expanded: PropTypes.bool,
  onToggleExpand: PropTypes.func,
};
Toggler.defaultProps = {
  expanded: false,
  onToggleExpand: () => {},
};

export class Breadcrumbs extends Component {
  static propTypes = {
    descriptors: PropTypes.arrayOf(descriptorShape),
  };
  static defaultProps = {
    descriptors: [],
  };

  state = {
    expanded: false,
  };

  toggleExpand = () => this.setState({ expanded: !this.state.expanded });

  render() {
    return (
      <div className={cx('breadcrumbs')}>
        <div className={cx('toggler-container')}>
          <Toggler expanded={this.state.expanded} onToggleExpand={this.toggleExpand} />
        </div>
        {this.props.descriptors.map((descriptor, i) => (
          <Fragment key={descriptor.path}>
            {i > 0 && <div className={cx('separator')}>{Parser(RightArrowIcon)}</div>}
            <Breadcrumb descriptor={descriptor} />
          </Fragment>
        ))}
      </div>
    );
  }
}
