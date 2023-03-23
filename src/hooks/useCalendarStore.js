import { useDispatch, useSelector } from 'react-redux';
import calendarApi from '../api/calendarApi';
import { convertEventsToDateEvents } from '../helpers';
import {
    onAddNewEvent,
    onDeleteEvent,
    onLoadEvents,
    onSetActiveEvent,
    onUpdateEvent,
} from '../store';

export const useCalendarStore = () => {
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector((state) => state.calendar);
    const { user } = useSelector((state) => state.auth);

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
            const { data } = await calendarApi.post('/events', calendarEvent);

            dispatch(
                onAddNewEvent({ ...calendarEvent, id: data.evento.id, user })
            );
        }
    };

    const startDeletingEvent = () => {
        // TODO: delete event in DB
        dispatch(onDeleteEvent());
    };

    const startLoadingEvents = async () => {
        try {
            const { data } = await calendarApi.get('/events');
            const events = convertEventsToDateEvents(data.eventos);
            dispatch(onLoadEvents(events));
        } catch (error) {
            console.log(error);
        }
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
        startLoadingEvents,
    };
};
