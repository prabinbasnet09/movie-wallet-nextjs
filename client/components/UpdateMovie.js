export default function UpdateMovie({movie}){
    // const {movie} = props;
    console.log(movie);
    return(
    <form>
            <input type = "text">{movie.name}</input>
            <input type = "text">{movie.name}</input>
            <input type = "number">{movie.name}</input>
            <input type = "number">{movie.name}`</input>
            <input type = "submit">Update Movie</input>
    </form>
    );
}