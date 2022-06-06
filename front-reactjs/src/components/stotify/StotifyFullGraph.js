import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format, isAfter, isBefore, isValid, parse } from 'date-fns';
import {
    DayPicker,
} from 'react-day-picker';
import 'react-day-picker/dist/style.css'

import store from '../../store'
import '../../styles/buttons.css'
import { fetchListeningTracksStats, fetchListeningMinutesStats, selectMetrics } from './stotifySlice'


function StotifyGraph() {
    const [selectedRange, setSelectedRange] = useState();
    const [fromValue, setFromValue] = useState('');
    const [toValue, setToValue] = useState('');

    const handleFromChange = (e) => {
        setFromValue(e.target.value);
        const date = parse(e.target.value, 'y-MM-dd', new Date());
        if (!isValid(date)) {
            return setSelectedRange({ from: undefined, to: undefined });
        }
        if (selectedRange?.to && isAfter(date, selectedRange.to)) {
            setSelectedRange({ from: selectedRange.to, to: date });
        } else {
            setSelectedRange({ from: date, to: selectedRange?.to });
        }
    };

    const handleToChange = (e) => {
        setToValue(e.target.value);
        const date = parse(e.target.value, 'y-MM-dd', new Date());

        if (!isValid(date)) {
            return setSelectedRange({ from: selectedRange?.from, to: undefined });
        }
        if (selectedRange?.from && isBefore(date, selectedRange.from)) {
            setSelectedRange({ from: date, to: selectedRange.from });
        } else {
            setSelectedRange({ from: selectedRange?.from, to: date });
        }
    };

    const handleRangeSelect = (
        range
    ) => {
        setSelectedRange(range);
        if (range?.from) {
            setFromValue(format(range.from, 'y-MM-dd'));
        } else {
            setFromValue('');
        }
        if (range?.to) {
            setToValue(format(range.to, 'y-MM-dd'));
        } else {
            setToValue('');
        }
    };

    useEffect(() => {
        store.dispatch(fetchListeningTracksStats())
        store.dispatch(fetchListeningMinutesStats())
    }, [])

    const listTracksStat = useSelector(selectMetrics).filter(item => item.id.includes("fetch_listening_tracks_stats"))[0]
    const shortListTracksStat = []
    const dud = (listTracksStat === undefined ? undefined : listTracksStat.value.forEach((item) => {
        if (fromValue != '' && new Date(item.date) - new Date(fromValue) < 0) {
        } else if (toValue != '' && new Date(toValue) - new Date(item.date) < 0) {
        } else {
            shortListTracksStat.push({ date: item.date.slice(5), value: item.value })
        }
    }))

    const listMinutesStat = useSelector(selectMetrics).filter(item => item.id.includes("fetch_listening_minutes_stats"))[0]
    const shortListMinutesStat = []
    const dude = (listMinutesStat === undefined ? undefined : listMinutesStat.value.forEach((item) => {
        if (fromValue != '' && new Date(item.date) - new Date(fromValue) < 0) {
        } else if (toValue != '' && new Date(toValue) - new Date(item.date) < 0) {
        } else {
            shortListMinutesStat.push({ date: item.date.slice(5), value: item.value })
        }
    }))

    console.log(shortListMinutesStat)

    const stotifyMainGraph = (text, dataList) => {
        return (
            <div className="home_stotify_graph">
                <ResponsiveContainer debounce={1}>
                    <BarChart
                        data={dataList === undefined ? [{ date: "1999-04-03", value: 0 }] : dataList}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#1D413D" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        )
    }

    return (
        <div className="home_stotify_graph_container">
            <DayPicker
                mode="range"
                selected={selectedRange}
                onSelect={handleRangeSelect}
                footer={
                    <form className="ma2">
                        <input
                            size={10}
                            placeholder="From Date"
                            value={fromValue}
                            onChange={handleFromChange}
                            className="input-reset pa2 ma bg-white black ba"
                        />
                        {' – '}
                        <input
                            size={10}
                            placeholder="To Date"
                            value={toValue}
                            onChange={handleToChange}
                            className="input-reset pa2 bg-white black ba"
                        />
                    </form>
                }
            />
            <div className="home_stotify_main_graph">
                <p>Detailed Tracks Statistics</p>
                {stotifyMainGraph("Tracks", shortListTracksStat)}
            </div>
            <div className="home_stotify_main_graph">
                <p>Detailed Minutes Statistics</p>
                {stotifyMainGraph("Minutes", shortListMinutesStat)}
            </div>

        </div>
    )
}

export default StotifyGraph