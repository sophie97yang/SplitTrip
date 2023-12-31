import { useSelector } from "react-redux";
import {useState} from 'react';
import './AddToItinerary.css'
import OpenModalButton from "../OpenModalButton";
import CreateTripShortcut from "../CreateTripForm/CreateTripShortcut";
import HotelReservation from "./HotelReservation";
import { useModal } from "../../context/Modal";
import RestaurantThingReservation from "./RestaurantThingReservation";

function AddToItinerary({booking,detail}) {
    //map users current trips where end date hasn't passed
    //once user selects trip, load dates that are still left
    //if category is a hotel,
    const user = useSelector(state=>state.session.user);
    const [TripToAdd,SetTrip] = useState('');
    const {closeModal} = useModal();
    const availableTrips = Object.values(user.trips).filter((trip)=> {
        return (new Date(trip.trip.end_date)>new Date() && trip.trip.location[0]===booking.city)
    })
    const options={}
    options.timeZone = "UTC";
    return (
        <div className='add-to-itinerary-modal'>
             {!detail ?<button onClick={closeModal} className='close-modal' id='update-trip-close'><i className="fa-solid fa-xmark fa-2xl"></i></button>:""}
            {availableTrips.length ?
            <div>
                <h2 id='select-trip-heading'>Select a Trip</h2>
                <select
                value={TripToAdd}
                onChange={(e)=> {
                    SetTrip(e.target.value)
                }}
                >
                    <option value='' disabled>Your Trips...</option>
                {availableTrips.map(trip=> (
                    <option value={trip.id} key={trip.id}>{trip.trip.name}: {new Date(trip.trip.start_date).toLocaleDateString('en-US',options)} - {new Date(trip.trip.end_date).toLocaleDateString('en-US',options)}</option>
                ))}
                </select>

                {
                TripToAdd && (
                <div>
                {/* <p>{new Date(user.trips[TripToAdd].trip.start_date).toLocaleDateString('en-US',options)} - {new Date(user.trips[TripToAdd].trip.end_date).toLocaleDateString('en-US',options)}</p> */}
                {booking.category==='Hotel' ?
                <HotelReservation trip={TripToAdd} booking={booking} closeModal={closeModal} setTrip={SetTrip} detail={detail}/>
                :
                <RestaurantThingReservation trip={TripToAdd} booking={booking} closeModal={closeModal} setTrip={SetTrip} detail={detail}/>
                }
                </div>)}
            </div>
            :
            <div className='no-trips-itinerary'>
                <h2>Looks like you are not able to add {booking.name} to any of your trips.</h2>
                <p>Either your trips have already passed or are not happening in {booking.city}.</p>
                <OpenModalButton
                buttonText={`Plan a trip to ${booking.city} now`}
                modalComponent={<CreateTripShortcut city={booking.city} state={booking.state} closeModal={closeModal}/>}
                />
            </div>
            }


        </div>
    )
}

export default AddToItinerary;
