import EventList from '@/components/events/event-list';
import ResultsTitle from '@/components/events/results-title';
import Button from '@/components/ui/button';
import ErrorAlert from '@/components/ui/error-alert';
import { getFilteredEvents } from '@/dummy-data';
import { useRouter } from 'next/router';
import { Fragment } from 'react';

function FilteredEventsPage() {
    const router = useRouter();

    const filterData = router.query.slug;

    if(!filterData){
        return (
            <p className="center">Loading...</p>
        );
    }

    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];

    // convert string to numbers
    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    // if someone entered /abc then for that we have to check
    if(isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numYear > 12){
        return (
            <Fragment>
                <ErrorAlert>
                <p>Invalid filter. Please adjust your values.</p>
                </ErrorAlert>
                <div className='center'>
                    <Button link='/events'>Show All Events</Button>
                </div>
            </Fragment>
        );
    }


    // if events exist fot that date ( year and month )
    const filteredEvents = getFilteredEvents({
        // this getFilteredEvents requires object
        year: numYear,
        month: numMonth,
    });

    // there can be empty array too... so we have to check
    if(!filteredEvents || filteredEvents.length === 0){
        return (
            <Fragment>
            <ErrorAlert>
               <p>No events found for the chosen filtered!.</p> 
            </ErrorAlert>
               <div className='center'>
                <Button link='/events'>
                    Show All Events.
                </Button>
               </div>
            </Fragment>
        );
    }

    const date = new Date(numYear, numMonth - 1 );
    return (
        <Fragment>
        <ResultsTitle date={date} />
        <EventList items={filteredEvents} />
        </Fragment>
    );
    
}

export default FilteredEventsPage;