const React = require('react');
const PropTypes = require('prop-types');
const { InputDatePicker } = require('@andes/datepicker');

const buildSelectedDays = (dateFrom, dateTo) => (
  { from: dateFrom, to: dateTo }
);

const getShortLocale = (locale) => (
  locale.includes('-') ? locale.split('-')[0] : locale.split('_')[0]
);

/**
* Components
*/
export default class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.pressEscToClose = this.pressEscToClose.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleDocumentClick);
    document.addEventListener('keydown', this.pressEscToClose, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleDocumentClick);
    document.removeEventListener('keydown', this.pressEscToClose, false);
  }

  pressEscToClose(event) {
    if (this.props.onClose) {
      if (event.keyCode === 27) { // esc key
        this.props.onClose(event);
      }
    }
  }

  handleDocumentClick(event) {
    const { show, onClose } = this.props;
    if (show && onClose) {
      if (this.container && this.container.current &&
        !this.container.current.contains(event.target)) {
        this.props.onClose();
      }
    }
  }

  render() {
    const { show, dateFrom, dateTo, locale, label, onSubmit } = this.props;
    const shortLocale = locale && getShortLocale(locale);
    const today = new Date()
    const yearAgo = new Date()
    yearAgo.setFullYear(today.getFullYear())
    const selectedDays = buildSelectedDays(dateFrom, dateTo);

    return (
      show && (
        <div ref={this.container} className="period-picker">
          <InputDatePicker
            displayMode="inline"
            fromMonth={yearAgo}
            toMonth={today}
            initialMonth={(dateTo && dateTo) || today}
            locale={shortLocale}
            selectionType="range"
            onSubmit={onSubmit}
            label={label}
            selectedDays={selectedDays}
          />
        </div>
      )
    );
  };
}

DatePicker.defaultProps = {
  show: false,
  dateFrom: null,
  dateTo: null,
  label: '',
};

DatePicker.propTypes = {
  show: PropTypes.bool,
  dateFrom: PropTypes.instanceOf(Date),
  dateTo: PropTypes.instanceOf(Date),
  locale: PropTypes.string.isRequired,
  label: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
