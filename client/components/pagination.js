import ReactPaginate from 'react-paginate';

export default function Page(){
    return (
        <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousLinkCLassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={'paginationDisabled'}
            activeClassName={"paginationActive"}
        />
    )
}