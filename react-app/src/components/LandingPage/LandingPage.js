import {useSelector,useDispatch} from 'react-redux';
import {useState} from 'react';
import SearchComponent from './SearchComponent';
import {Link,useHistory} from 'react-router-dom';
import { useEffect } from 'react';
import { getBookings } from '../../store/booking';
import './LandingPage.css';
import logo from '../../assets/images/landing-page.png';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

function LandingPage ({isLoaded}) {
    const user = useSelector(state=>state.session.user);
    const bookings =  useSelector(state=>state.bookings.bookings);
    const [locationChoices,setLocationChoices] = useState([]);
    const [bookingChoices,setBookingChoices] = useState([]);
    const dispatch = useDispatch();
    const history=useHistory();

    const locations = [{city:'Aspen',state:'CO',image:"https://www.travelandleisure.com/thmb/Yiq3rXHGmHnDrgzBsGmEvqjHxSo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/aspen-colorado-lead-ASPENTG0122-3bd432152d1f4758b1b89fd8a3a231cc.jpg"},
    {city:'Miami',state:'FL',image:'https://www.mayflower.com/wp-content/uploads/2022/05/Miami-City-Guide_Header-scaled.jpg'},
    {city:'Napa',state:'CA',image:"https://falstaff.b-cdn.net/core/5039223/napa-valley_5039223.jpg"},
    {city:'Boston',state:'MA',image:"https://content.r9cdn.net/rimg/dimg/8d/d4/5837febe-city-25588-16b90081d43.jpg"},
    {city:'Jackson',state:'WY',image:"https://assets.vogue.com/photos/61d453c3069d2a61c3d376e1/master/w_2560%2Cc_limit/520395534"},
    {city:'Nashville',state:'TN',image:"https://i.natgeofe.com/n/070fbe2c-a644-4c62-aa76-bddf63dd6f10/broadway-record-shop-nashville-tennessee.jpg"},
    {city:'Washington',state:'DC',image:"https://www.thoughtco.com/thmb/_ZNhs9lhwfoos1WoYBygoL03g6c=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-497322993-598b2ad403f4020010ae0a08.jpg"},
    {city:'Las Vegas',state:'NV',image:"https://media.cnn.com/api/v1/images/stellar/prod/180313182911-01-las-vegas-travel-strip.jpg"},
    ]
    // const unseeded = [
    //     {city:'Savannah',state:'GA',image:"https://ballastone.com/wp-content/uploads/2019/04/best-time-to-travel-to-savannah-ga-1.jpg"},
    // {city:'Charleston',state:'SC',image:"https://www.fodors.com/wp-content/uploads/2022/09/HERO-shutterstock_1577091133.jpg"},
    // {city:'Sedona',state:'AZ',image:"https://visit-sedona.s3.amazonaws.com/CMS/2214/view_from_airport_mesa_at_sunrise__medium.jpg"},
    // {city:'New Orleans',state:'LA',image:"https://media.timeout.com/images/105770969/750/562/image.jpg"},
    // {city:'Chicago',state:'IL',image:"https://cdn.choosechicago.com/uploads/2022/06/wygyk-agnostic-A.Alexander_5cloudgateMay13-scaled.jpg"},
    // {city:'Orlando',state:'FL',image:"https://a.cdn-hotels.com/gdcs/production4/d842/1da7b753-73d3-4f87-9661-13fc8b819242.jpg"},
    // {city:'Oahu',state:'HI',image:"https://i.insider.com/62867ef1577b8a001827a029?width=1136&format=jpeg"},
    // {city:'Maui',state:'HI',image:"https://a.cdn-hotels.com/gdcs/production81/d1269/0cffe15a-7fdf-4e75-9415-92eaf78e2f73.jpg"},
    // {city:'New York City',state:'NY',image:"https://cdn.britannica.com/61/93061-050-99147DCE/Statue-of-Liberty-Island-New-York-Bay.jpg"}
    //{city:'Moab',state:'UT',image:"https://www.visittheusa.com/sites/default/files/styles/hero_l/public/images/hero_media_image/2017-07/92ce662af277a11b73ea3a6d451271fc.jpeg"},
    // ]

    useEffect(()=> {
        dispatch(getBookings())
    },[dispatch])

    //populate 3 random choices of cities to explore
    useEffect(()=> {
        const location_choices = []
        for (let i=0;i<3;i++) {
            let choice_index = Math.floor(Math.random()*7);
            if (location_choices.includes(locations[choice_index])) {
                choice_index= Math.floor(Math.random()*8);
            }
            location_choices.push(locations[choice_index])
        }
        if (!locationChoices.length) {
        setLocationChoices(location_choices);
        }
    },[locationChoices])


    //populate 3 random choices of bookings to look at
    useEffect(()=> {
        const booking_choices =[]
        const already_in = new Set();
        if (Object.values(bookings).length) {
            for (let i=0;i<3;i++) {
                let choice_index = Math.floor(Math.random()*Object.values(bookings).length)+1;
                if (choice_index in already_in) {
                    choice_index= Math.floor(Math.random()*Object.values(bookings).length)+1;
                }
                booking_choices.push(bookings[choice_index])
                already_in.add(choice_index)
            }
        }
        if (!bookingChoices.length) {
            setBookingChoices(booking_choices);
        }
    })

    const renderRightArrow = (onClickHandler, hasNext, label) => hasNext && (
            <button type="button" onClick={onClickHandler} title={label} className='carousel-buttons button-right'>
                <i className="fa-solid fa-arrow-right fa-xl"></i>
            </button>
        )

    const renderLeftArrow = (onClickHandler, hasPrev, label) => hasPrev && (
        <button type="button" onClick={onClickHandler} title={label} className='carousel-buttons button-left'>
            <i className="fa-solid fa-arrow-left fa-xl"></i>
        </button>
    )

    return (
        <div className='landing-page'>
            <div className='landing-top'>
            <div className='headings'>
            <h1>Where to?</h1>
            <h2>
                SplitTrip is here for you from start to finish.

            </h2>
            <p className='slogan'>Embark on Adventures, Share the Costs: </p>
            <p className='slogan bottom'>Transform Your Travels with Seamless Expense Sharing at Every Destination.</p>
            </div>
            {/* <img src={logo} alt='travel'></img> */}
            </div>

            <SearchComponent className='landing-page-search'/>

{isLoaded &&
            <div className='dashboard'>
                    <div className='top-destinations'>
                    <h3>Dream Your Next Trip</h3>
                    <h4>These are the top destinations for your next vacation</h4>
                    <div className='random-places-landing' id='landing-top-images'>
                        {locationChoices.map(location => (
                            <Link to={`/explore/${location.city}`} key={location.city} className='populate-landing-page'>
                                <img src={location.image} alt={location.city}></img>
                                <h4>{location.city}, {location.state}</h4>
                            </Link>
                        ))}
                    </div>
                    {
                        user ?
                        <div className='explore-trips'>
                        { Object.values(user.trips).length ?
                        <>
                            <h3>
                                These places are waiting for you...
                            </h3>
                            <h4>Access your past and upcoming trips here</h4>
                            <Carousel className='landing-user-trips' showThumbs={false} centerMode={true} centerSlidePercentage={33}
                            onClickItem={(index,item)=>history.push(`/trips/${item.key}/expenses`)} renderArrowNext={renderRightArrow} renderArrowPrev={renderLeftArrow} >
                            {
                                Object.values(user.trips).map(trip => (
                                    // <div key={trip.id} >
                                        <div key={trip.trip.id} >
                                        <img src={trip.trip.image ? trip.trip.image : "https://www.travelandleisure.com/thmb/p1Dh0uzZPUk8lQQq2oMhVMUQESk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/lofoten-islands-norway-MOSTBEAUTIFUL0921-cd0b88063a8b4a26871a51764db0fcae.jpg"} alt="trip"
                                        onError={e => { e.currentTarget.src = "https://images.unsplash.com/photo-1522878129833-838a904a0e9e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}}
                                        ></img>
                                        <h4>Your trip to {trip.trip.location[0]}</h4>
                                        </div>
                                    // </div>
                                ))
                            }
                            </Carousel>
                        </>  :
                        <>
                            <h3>Embark on a journey of your own creation!</h3>
                            <h4>Unlock the potential of SplitTrip by <Link to='trips/new' id='create-trip-link'>creating a trip</Link>.</h4>

                        </>
                        }
                        </div>:
                        <div className='explore-all'>
                            <h3><Link to='/login' id="login-link"> Sign In</Link> to unlock the best of SplitTrip</h3>
                            <h4>In the meantime.. Explore all of the things you can do</h4>
                            <div className='explore-choices' id='explore-landing-bottom'>
                            {
                                bookingChoices.map(booking => (
                                    <div className='populate-landing-page' key={booking.name}>
                                         <Link to={`/bookings/${booking.id}`}>
                                            <img src={booking.image1} alt={booking.name}></img>
                                            <h4>{booking.name}</h4>
                                        </Link>
                                    </div>
                                ))
                            }
                            </div>
                        </div>
                    }
                    </div>
            </div>
}
    </div>
    )
}

export default LandingPage
