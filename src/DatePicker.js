import React, {Component} from "react";
import './RangeCalendarMobile.scss';
const PropTypes = require('prop-types');
const moment = require('moment');
const { InputDatePicker } = require('@andes/datepicker');
const Button = require('@andes/button');
const { ButtonText } = Button;

/**
 * Constants
 */
 const FORMAT_FILTER_DATE = 'YYYY-MM-DD';

export default class RangeCalendarMobile extends Component {
  constructor(props) {
    super(props)
    const { dateFrom, dateTo } = props;
    this.state = {
      dateFrom: dateFrom || '',
      dateTo: dateTo || ''
    }

    this.handlerOnRangeChange = this.handlerOnRangeChange.bind(this);
  }

  handlerOnRangeChange(selectedDays, resetSelectDays) {
    const { from, to } = selectedDays;
    console.log(selectedDays)

    this.setState({
      dateFrom: moment(from).format(FORMAT_FILTER_DATE),
      dateTo: moment(to).format(FORMAT_FILTER_DATE),
    });
  }

  getInitialMonth(dateFrom, dateTo) {
    const selectedDays = this.getSelectedDays(dateFrom, dateTo);

    return selectedDays ? selectedDays.from : null;
  }

  getSelectedDays(dateFrom, dateTo) {
    const from = moment(dateFrom, FORMAT_FILTER_DATE);
    const to = moment(dateTo, FORMAT_FILTER_DATE);

    if (!from.isValid() || !to.isValid()) {
      return null;
    }

    return {
      from: from.toDate(),
      to: to.toDate(),
    };
  }

  render() {
    const { dateFrom, dateTo } = this.state
    const today = moment();
    const yearAgo = moment().subtract(1, 'year');
    return (
      <div className="filter-mobile-wrapper">
        <div className="filter-mobile-wrapper__title"></div>
        <div className="filter-mobile-wrapper__content">
      
          <div className="filter-mobile-wrapper__input">
            {/* <span>{this.getInputStatus()}</span> 
            <CalendarIcon width={20} height={21} viewBox="0 0 20 21" />
            */}
          </div>

          <InputDatePicker
            locale="pt"
            displayMode="inline"
            selectionType="range"
            fixedWeeks
            disableSubmitButton
            onSubmit={null}
            onRangeChange={this.handlerOnRangeChange}
            fromMonth={yearAgo.toDate()}
            toMonth={today.toDate()}
            initialMonth={this.getInitialMonth(dateFrom, dateTo)}
            selectedDays={this.getSelectedDays(dateFrom, dateTo)}
          />
        </div>

        <div className="filter-mobile-footer">
        <Button
           onClick={null}
           disabled={null}
           size="medium"
           fullWidth>
             <ButtonText>cancelar</ButtonText>

          </Button>

          <Button
           onClick={null}
           disabled={null}
           size="medium"
           fullWidth>
             <ButtonText>aplicar</ButtonText>

          </Button>
       

        </div>
      </div>
    )
  }
}