import React, { Component } from 'react'

import Dialog from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import DateRangeIcon from 'material-ui-icons/DateRange'

import InfiniteCalendar from 'react-infinite-calendar'
import 'react-infinite-calendar/styles.css'

export default class DatePicker extends Component {
    state = { openCalendar: false }

    render () {
        const { label, value, onChange } = this.props
        const { openCalendar } = this.state
        return (
            <div>
                <Button onClick={ () => this.setState({ openCalendar: true }) } raised dense><DateRangeIcon /></Button>
                <TextField disabled label={ label } value={ value.toString() } />
                <Dialog open={ openCalendar } onRequestClose={ () => this.setState({ openCalendar: false }) }>
                    <InfiniteCalendar 
                        selected={ new Date() }
                        onSelect={ date => { onChange(date); this.setState({ openCalendar: false }) } } />
                </Dialog>
            </div>
        )
    }
}