import Link from 'next/link';
import Image from 'next/image';
import {useQuery, useMutation, gql} from "@apollo/client";
import styles from '../styles/Home.module.css';
import pageStyles from '../styles/MoviesList.module.css';
import movieStyles from '../styles/MoviesList.module.css';
import cardStyles from '../styles/cards.module.css';
import { useEffect, useState, useMemo} from 'react';
import ReactPaginate from 'react-paginate';
import MovieSearch from './search';
import movieImg from './Bullet Train.png'
import UpdateMovie from '../components/UpdateMovie'

const GET_MOVIES = gql`
    query GetMovies{
        movies{
            id
            name
            genre
            yearReleased
            rating
        }
    }
`

const ADD_MOVIE = gql`
    mutation AddMovie($input: AddMovieInput!){
        addMovie(input: $input){
            name
            genre
            yearReleased
            rating
        }
    }
`

const UPDATE_MOVIE = gql`
    mutation UpdateMovie($input: UpdateMovieInput!){
        updateMovie(input: $input){
            name 
            genre
            yearReleased
            rating
        }
    }
`
export default function MoviesList(){
    //query
    const {data, loading, error, refetch} = useQuery(GET_MOVIES);

    //mutations
    const [addMovie] = useMutation(ADD_MOVIE);
    const [updateMovie] = useMutation(UPDATE_MOVIE);

    //local state for storing all the retrieved movies and manipulating according to search
    const [allMovies, setAllMovies] = useState([]);

    useMemo(() => {
        if(loading === false && data){
            setAllMovies(data.movies);
        }
    }, [loading, data]);

    //local state for adding and updating movies
    const [addMovieTrigger, setAddMovieTrigger] = useState(false);
    const [updateMovieTrigger, setUpdateMovieTrigger] = useState(false);

    //local state for movie object
    const [movie, setMovie] = useState({});
    const[movieName, setMovieName] = useState("");
    const[genre, setGenre] = useState("");
    const[yearReleased, setYearReleased] = useState(0);
    const[rating, setRating] = useState(0);

    //local state for pagination
    const[pageNumber, setPageNumber] = useState(0);

    const moviesPerPage = 6;
    const pagesVisited = pageNumber * moviesPerPage;

    const pageCount = Math.ceil(14/moviesPerPage);

    const changePage = (({selected}) => {
        setPageNumber(selected);
    })

    //functions
    const updateMovieName = (e) => {
        setMovieName(e.target.value)
    }

    const updateMovieGenre = (e) => {
        setGenre(e.target.value)
    }

    const updateMovieYear = (e) => {
        setYearReleased(e.target.value)
    }

    const updateMovieRating = (e) => {
        setRating(e.target.value)
    }

    if(loading) return 'Loading....';
    if(error) return `Error! ${error.message}`;
    
    return(
        <div>
            <div className={styles.movieSearchAdd}>
                <MovieSearch setAllMovies = {setAllMovies}/>
                <button className={styles.addMovie} onClick = {() => setAddMovieTrigger(true)} >Add Movie</button>
            </div>
            <main className={cardStyles.cardMain}>
                <section className={cardStyles.cards}>
                    {allMovies && 
                        allMovies.slice(pagesVisited, pagesVisited + moviesPerPage).map((movie) => ( 
                            // <Link href={`/${movie.id.toString()}`}>
                                <div key = {movie.id} className = {cardStyles.card}>
                                    <div className = {cardStyles.card_image_container}>
                                    <img
                                        src={`https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSa_XrN4EhTrkQgTNM9vlQbwZ5VqhVLh7rqWAJ6un2GZdhjgR6K`}
                                        fill
                                    />
                                    </div>
                                    <div className={cardStyles.card_content}>
                                        <div className={cardStyles.card_title}>
                                            <p>{movie.name}</p>
                                        </div>
                                        <p className={cardStyles.card_sub_info}>{movie.genre}</p>
                                        <p className={cardStyles.card_sub_info}>{movie.yearReleased}</p>
                                        <div className={cardStyles.card_info}>
                                            <p className={cardStyles.card_rating}>⭐{movie.rating}/5</p>
                                            <button type = "submit" className={cardStyles.card_edit} onClick={(e) => {
                                                setUpdateMovieTrigger(true);
                                                setMovie({
                                                    id: movie.id,
                                                    name: movie.name,
                                                    genre: movie.genre,
                                                    yearReleased: movie.yearReleased,
                                                    rating: movie.rating
                                                });
                                                }}>Edit</button>                
                                        </div>
                                    </div>
                                </div>
                            ))
                        }     
                </section>
            </main>
        {updateMovieTrigger &&
        <form>
            <input type = "text" defaultValue={movie.name} onChange={(e) => updateMovieName(e)} />
            <input type = "text" defaultValue={movie.genre} onChange={(e) => updateMovieGenre(e)} />
            <input type = "text" defaultValue={movie.yearReleased} onChange={(e) => updateMovieYear(e)} />
            <input type = "text" defaultValue={movie.rating} onChange={(e) => updateMovieRating(e)} />

            <button onClick={() => {
                setUpdateMovieTrigger(false);
                    updateMovie({
                        variables: {
                            input: {
                                id: movie.id,
                                name: movieName? movieName : movie.name,
                                genre: genre? genre: movie.genre,
                                yearReleased: yearReleased? Number(yearReleased) : Number(movie.yearReleased),
                                rating: rating? Number(rating) : Number(movie.rating)
                            }
                        }
                    })
                    refetch();
                }}>Update Movie</button>
        </form>
        }

        {/* <button onClick = {() => setAddMovieTrigger(true)} >Add Movie</button> */}
       
       {addMovieTrigger && 
        <form>
            <div><input type = "text" onChange={(e) => updateMovieName(e)}/></div>
            <div><input type = "text" onChange={(e) => updateMovieGenre(e)}/></div>
            <div><input type = "number" onChange={(e) => updateMovieYear(e)}/></div>
            <div><input type = "number" onChange = {(e) => updateMovieRating(e)}/></div>
            <input type = "submit" onClick= {(e) => {
                setAddMovieTrigger(false);
                addMovie({
                    variables: {
                        input: {
                            name: movieName,
                            genre: genre,
                            yearReleased: Number(yearReleased),
                            rating: Number(rating)
                        }
                    }
                })
                refetch();
            }}/>
        </form>
        }
        <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={pageStyles.paginationBttns}
            previousLinkCLassName={pageStyles.previousBttn}
            nextLinkClassName={pageStyles.nextBttn}
            disabledClassName={pageStyles.paginationDisabled}
            activeClassName={pageStyles.paginationActive}
        />
    </div>
    )
}