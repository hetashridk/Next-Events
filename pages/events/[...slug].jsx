import React, { Fragment } from 'react'
import { useRouter } from 'next/router'

import { getFilteredEvents } from '@/dummy-data';
import EventList from '@/components/events/event-list';
import ResultsTitle from '@/components/results-title/results-title';
import Button from '@/components/ui/button';
import ErrorAlert from '@/components/ui/error-alert';

function FilteredEventPage() {

  const router = useRouter();

  const filterData = router.query.slug;

  // console.log(filterData);

  // when first time it is loading
  if (!filterData) {
    return <p className='center'>Loading</p>
  }

  const extractedYear = filterData[1];
  const extractedMonth = filterData[0];

  const numYear = + extractedYear;
  const numMonth = + extractedMonth;

  if (isNaN(numYear) || isNaN(numMonth) || numYear < 2020 || numYear > 2030 || numMonth < 1 || numMonth > 12) {
    return <Fragment>
      <ErrorAlert>
      <p>Please adjust your filter as according to your filter no events have been found</p>
      </ErrorAlert>
      <div className='center'>
        <Button link='/events'>Show All events</Button>
      </div>
    </Fragment>
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth
  });

  // if filtered events array is empty
  if (!filteredEvents || filteredEvents.length === 0) {
    return <Fragment>
      <ErrorAlert><p>No events found for chosen filter!!</p></ErrorAlert>
      <div className='center'>
        <Button link='/events'>Show All events</Button>
      </div>
    </Fragment>
  }

  const date = new Date(numYear, numMonth)
  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  )
}

export default FilteredEventPage