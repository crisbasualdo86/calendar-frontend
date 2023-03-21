import { useDispatch, useSelector } from 'react-redux';
import {
    onAddNewEvent,
    onDeleteEvent,
    onSetActiveEvent,
    onUpdateEvent,
} from '../store';

export const useCalendarStore = () => {
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector((state) => state.calendar);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    };

    const startSavingEvent = async (calendarEvent) => {
        // TODO: save event in DB

        if (calendarEvent._id) {
            // update event
            dispatch(onUpdateEvent({ ...calendarEvent }));
        } else {
            // create new event
            dispatch(
                onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() })
            );
        }
    };

    const startDeletingEvent = () => {
        // TODO: delete event in DB
        dispatch(onDeleteEvent());
    };

    return {
        // props
        activeEvent,
        events,
        hasEventSelected: !!activeEvent,

        // methods
        setActiveEvent,
        startDeletingEvent,
        startSavingEvent,
    };
};
