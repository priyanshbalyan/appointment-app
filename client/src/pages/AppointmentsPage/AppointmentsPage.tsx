import { Card } from 'features/card/Card';
import React, { useEffect } from 'react';
import styles from 'pages/AppointmentsPage/AppointmentsPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useGetSlotsQuery } from 'app/services/slotsApi';
import { useAppDispatch } from 'app/hooks';
import { useNavigate } from 'react-router-dom';
import { logout } from 'features/auth/authSlice';
import { setSlots } from 'features/booking/slotsSlice';
import { groupSlotsByDate } from 'utils';
import { Endpoints } from 'features/router/endpoints';
import { Loader } from 'features/loader/Loader';

export default function AppointmentsPage(): React.ReactElement | null {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: slots, isLoading } = useGetSlotsQuery();

  useEffect(() => {
    if (slots) dispatch(setSlots(slots));
  }, [slots]);

  const handleLogout = (): void => {
    dispatch(logout());
    navigate('/');
  };

  const handleBook = (): void => { navigate(Endpoints.BOOK); };

  const cards = groupSlotsByDate(slots).map(([group, groupedSlots]) => {
    return (
      <div key={group}>
        <div className={styles.greyBox}>{group}</div>
        {groupedSlots.map(slot => <Card key={slot.id} slot={slot} />)}
      </div>
    )
  });

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        Booked Appointments
        <FontAwesomeIcon className={styles.logout} icon={faArrowRightFromBracket} onClick={handleLogout} />
      </div>
      {isLoading 
        ? <Loader /> : 
          <>
            {cards.length > 0 ? cards : <>No appointments booked</>}
            <div className={styles.buttonContainer}>
              <button onClick={handleBook}>+ Book an appointment</button>
            </div>
          </>
      }
    </div>
  );
}
