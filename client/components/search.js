import {useState} from 'react';
import styles from '../styles/Home.module.css';

export default function MovieSearch({setAllMovies}){
    //local state for search
    const [search, setSearch] = useState("");

    const filterMovies = () => {
        setAllMovies((allMovies) => {
            allMovies && allMovies.filter(({name}) => {
                if(search != "")
                    name.toLowerCase().includes(search.toLowerCase())
            })
        })
    }

    return (
        <div className={styles.searchBox}>
            <input 
            type = "text"
            placeholder='Search Movie'
            onChange = {(e) => {
                setSearch(e.target.value);
                filterMovies();
            }}
            className = {styles.search}
             />
      </div>
    )
}